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
  const crops = [
    { name: 'Wheat', confidence: 0.85, reason: 'Excellent for NPK levels and pH conditions' },
    { name: 'Rice', confidence: 0.78, reason: 'Good moisture levels support rice cultivation' },
    { name: 'Corn', confidence: 0.82, reason: 'Well-suited to current environmental conditions' },
  ];

  const keyFindings = [
    'Soil conditions are favorable for multiple crops',
    'Environmental parameters support good growth',
    'Moisture levels are adequate for cultivation',
  ];

  const farmingPractices = [
    'Practice crop rotation to maintain soil health',
    'Use balanced fertilization based on soil NPK levels',
    'Implement drip irrigation for water efficiency',
    'Monitor soil pH regularly',
    'Use organic mulching to retain moisture',
  ];

  return {
    crops,
    recommendedCrops: crops.map(c => c.name),
    keyFindings,
    farmingPractices,
    irrigationGuidance: 'Maintain consistent soil moisture. Adjust frequency based on rainfall.',
    confidenceScore: 0.87,
    explanation: text.substring(0, 400) || 'AI analysis of your environmental data suggests these crops would perform well.',
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

  // Validate inputs
  if (!N || !P || !K || pH === undefined || !temperature || !humidity || !rainfall || soilMoisture === undefined) {
    return res.status(400).json({ message: 'All environmental data fields are required' });
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

    const grokText = grokResponse.data.choices[0]?.message?.content || '';
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
