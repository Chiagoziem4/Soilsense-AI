import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface CropRecommendation {
  crops: Array<{
    name: string;
    confidence: number;
    reason: string;
  }>;
  recommendedCrops: string[];
  keyFindings: string[];
  farmingPractices: string[];
  irrigationGuidance: string;
  confidenceScore: number;
  explanation: string;
}

interface ErrorResponse {
  message: string;
  error?: string;
}

const parseGrokCropResponse = (text: string): CropRecommendation => {
  const candidate = text.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1] ?? text;
  let parsed: Partial<CropRecommendation>;
  try {
    parsed = JSON.parse(candidate);
  } catch {
    throw new Error('The recommendation provider returned an invalid structured response.');
  }

  const crops = Array.isArray(parsed.crops)
    ? parsed.crops
        .filter((crop): crop is { name: string; confidence: number; reason: string } =>
          Boolean(crop && typeof crop.name === 'string' && typeof crop.reason === 'string' && Number.isFinite(Number(crop.confidence)))
        )
        .map(crop => ({
          name: crop.name.trim(),
          confidence: Math.max(0, Math.min(1, Number(crop.confidence))),
          reason: crop.reason.trim(),
        }))
        .filter(crop => crop.name.length > 0 && crop.reason.length > 0)
    : [];

  if (crops.length === 0) {
    throw new Error('The recommendation provider returned no usable crop recommendations.');
  }

  const asStrings = (value: unknown) => Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string').map(item => item.trim()).filter(Boolean)
    : [];

  return {
    crops,
    recommendedCrops: asStrings(parsed.recommendedCrops).length ? asStrings(parsed.recommendedCrops) : crops.map(c => c.name),
    keyFindings: asStrings(parsed.keyFindings),
    farmingPractices: asStrings(parsed.farmingPractices),
    irrigationGuidance: typeof parsed.irrigationGuidance === 'string' ? parsed.irrigationGuidance.trim() : '',
    confidenceScore: Math.max(0, Math.min(1, Number(parsed.confidenceScore ?? 0))),
    explanation: typeof parsed.explanation === 'string' ? parsed.explanation.trim().substring(0, 400) : text.substring(0, 400),
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CropRecommendation | ErrorResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const apiKey = process.env.GROK_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      message: 'API key not configured. Please add GROK_API_KEY to environment variables.',
    });
  }

  const { N, P, K, pH, temperature, humidity, rainfall, soilMoisture } = req.body;

  const values = { N, P, K, pH, temperature, humidity, rainfall, soilMoisture };
  const numericValues = Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, typeof value === 'number' ? value : Number(value)])
  ) as Record<string, number>;
  if (Object.values(numericValues).some(value => !Number.isFinite(value))) {
    return res.status(400).json({ message: 'All environmental data fields must be finite numbers' });
  }
  if (numericValues.pH < 0 || numericValues.pH > 14 || numericValues.humidity < 0 || numericValues.humidity > 100 || numericValues.soilMoisture < 0 || numericValues.soilMoisture > 100) {
    return res.status(400).json({ message: 'Environmental data is outside the supported range' });
  }

  try {
    const prompt = `Based on the following soil and environmental conditions, recommend the most suitable crops:

Soil Parameters (NPK):
- Nitrogen (N): ${N} mg/kg
- Phosphorus (P): ${P} mg/kg
- Potassium (K): ${K} mg/kg
- pH: ${pH}

Environmental Conditions:
- Temperature: ${temperature}°C
- Humidity: ${humidity}%
- Rainfall: ${rainfall}mm
- Soil Moisture: ${soilMoisture}%

Please provide:
1. Top 3-5 crop recommendations with confidence scores
2. Reasons why each crop is suitable
3. Key findings about the conditions
4. Best farming practices for these conditions
5. Irrigation guidance
6. Any warnings or special considerations

Be specific and practical in your recommendations.`;

    const grokResponse = await axios.post(
      'https://api.x.ai/v1/messages',
      {
        model: 'grok-vision-beta',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 1024,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const grokText = grokResponse.data.choices?.[0]?.message?.content || '';
    if (!grokText) {
      throw new Error('The recommendation provider returned an empty response.');
    }
    const analysisResult = parseGrokCropResponse(grokText);

    return res.status(200).json(analysisResult);
  } catch (error) {
    console.error('Grok API error:', error);
    
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.error?.message || 'Failed to get recommendations';
      return res.status(status).json({
        message,
        error: error.message,
      });
    }

    return res.status(500).json({
      message: 'An error occurred during analysis. Please try again.',
    });
  }
}
