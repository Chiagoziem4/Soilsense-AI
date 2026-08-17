import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface PlantAnalysisResponse {
  plantHealth: string;
  healthScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  plantDiseases: string[];
  nutrientDeficiencies: string[];
  keyFindings: string[];
  treatmentRecommendations: string[];
  preventionTips: string[];
  irrigationGuidance: string;
  confidenceScore: number;
  explanation: string;
}

interface ErrorResponse {
  message: string;
  error?: string;
}

const parseGrokPlantResponse = (text: string): PlantAnalysisResponse => {
  const lines = text.split('\n').filter(line => line.trim());
  
  let plantHealth = '';
  let healthScore: number | undefined;
  let riskLevel: 'low' | 'medium' | 'high' | undefined;
  let plantDiseases: string[] = [];
  let nutrientDeficiencies: string[] = [];
  let keyFindings: string[] = [];
  let treatmentRecommendations: string[] = [];
  let preventionTips: string[] = [];
  let irrigationGuidance = '';
  let confidenceScore: number | undefined;

  // Parse response
  for (const line of lines) {
    const lowerLine = line.toLowerCase();
    
    if (lowerLine.includes('health') && !lowerLine.includes('score')) {
      plantHealth = line.split(':')[1]?.trim() || plantHealth;
    }
    
    if (lowerLine.includes('score')) {
      const match = line.match(/\d+/);
      if (match) healthScore = Math.max(0, Math.min(100, parseInt(match[0], 10)));
    }
    
    if (lowerLine.includes('risk')) {
      if (lowerLine.includes('high')) riskLevel = 'high';
      else if (lowerLine.includes('low')) riskLevel = 'low';
      else if (lowerLine.includes('medium')) riskLevel = 'medium';
    }
    
    if (lowerLine.includes('disease')) {
      const value = line.split(':')[1]?.trim();
      if (value) plantDiseases.push(value);
    }
    
    if (lowerLine.includes('deficien')) {
      const value = line.split(':')[1]?.trim();
      if (value) nutrientDeficiencies.push(value);
    }

    if (lowerLine.includes('irrigation') || lowerLine.includes('watering')) {
      const value = line.split(':')[1]?.trim();
      if (value) irrigationGuidance = value;
    }

    if (lowerLine.includes('confidence')) {
      const match = line.match(/(?:confidence[^0-9]*)(0?\.\d+|\d+(?:\.\d+)?)/i);
      if (match) {
        const value = Number(match[1]);
        confidenceScore = Math.max(0, Math.min(1, value > 1 ? value / 100 : value));
      }
    }
  }

  if (!plantHealth || healthScore === undefined || !riskLevel || !irrigationGuidance || confidenceScore === undefined) {
    throw new Error('The plant-analysis provider returned an incomplete structured response.');
  }

  return {
    plantHealth,
    healthScore,
    riskLevel,
    plantDiseases,
    nutrientDeficiencies,
    keyFindings,
    treatmentRecommendations,
    preventionTips,
    irrigationGuidance,
    confidenceScore,
    explanation: text.substring(0, 400),
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PlantAnalysisResponse | ErrorResponse>
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

  const { image, fileName } = req.body;

  if (!image) {
    return res.status(400).json({ message: 'Image data is required' });
  }

  try {
    const dataUriMatch = /^data:(image\/(?:jpeg|png|webp));base64,(.+)$/i.exec(image);
    if (!dataUriMatch) {
      return res.status(400).json({ message: 'Image must be a base64 JPEG, PNG, or WebP data URI' });
    }
    const [, mediaType, base64Data] = dataUriMatch;

    const grokResponse = await axios.post(
      'https://api.x.ai/v1/messages',
      {
        model: 'grok-vision-beta',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: mediaType.toLowerCase(),
                  data: base64Data,
                },
              },
              {
                type: 'text',
                text: `Analyze this plant/crop image and provide a detailed health assessment:

1. Overall plant health status
2. Health score (0-100)
3. Risk level (low, medium, high)
4. Diseases or infections detected
5. Nutrient deficiencies
6. Key findings
7. Treatment recommendations
8. Disease prevention tips
9. Irrigation guidance
10. Confidence score for your analysis

Be specific and practical in your recommendations.`,
              },
            ],
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
    const analysisResult = parseGrokPlantResponse(grokText);

    return res.status(200).json(analysisResult);
  } catch (error) {
    console.error('Grok API error:', error);
    
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.error?.message || 'Failed to analyze plant';
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
