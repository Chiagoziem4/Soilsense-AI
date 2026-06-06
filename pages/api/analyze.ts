import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface AnalysisResponse {
  soilType: string;
  fertilityLevel: 'low' | 'medium' | 'high';
  moistureLevel: 'low' | 'moderate' | 'high';
  recommendedCrops: string[];
  explanation?: string;
}

interface ErrorResponse {
  message: string;
  error?: string;
}

const parseGrokResponse = (text: string): AnalysisResponse => {
  // Parse the response from Grok and extract structured data
  const lines = text.split('\n').filter(line => line.trim());
  
  let soilType = 'Loam';
  let fertilityLevel: 'low' | 'medium' | 'high' = 'medium';
  let moistureLevel: 'low' | 'moderate' | 'high' = 'moderate';
  let recommendedCrops: string[] = [];
  let explanation = '';

  for (const line of lines) {
    const lowerLine = line.toLowerCase();
    
    // Extract soil type
    if (lowerLine.includes('soil type') || lowerLine.includes('soil:')) {
      const match = line.split(':')[1]?.trim();
      if (match) {
        soilType = match.split(',')[0].trim();
      }
    }
    
    // Extract fertility level
    if (lowerLine.includes('fertility')) {
      const match = line.toLowerCase();
      if (match.includes('low')) fertilityLevel = 'low';
      else if (match.includes('high')) fertilityLevel = 'high';
      else fertilityLevel = 'medium';
    }
    
    // Extract moisture level
    if (lowerLine.includes('moisture')) {
      const match = line.toLowerCase();
      if (match.includes('low')) moistureLevel = 'low';
      else if (match.includes('high')) moistureLevel = 'high';
      else moistureLevel = 'moderate';
    }
    
    // Extract crops
    if (lowerLine.includes('crop')) {
      const parts = line.split(':')[1];
      if (parts) {
        recommendedCrops = parts
          .split(',')
          .map(crop => crop.trim())
          .filter(crop => crop.length > 0);
      }
    }
  }

  // Fallback crops if not extracted
  if (recommendedCrops.length === 0) {
    recommendedCrops = ['Wheat', 'Corn', 'Soybeans'];
  }

  // Use part of the response as explanation
  explanation = text.substring(0, 300);

  return {
    soilType,
    fertilityLevel,
    moistureLevel,
    recommendedCrops,
    explanation,
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AnalysisResponse | ErrorResponse>
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
    // Extract base64 data from data URI
    const base64Data = image.split(',')[1] || image;

    // Call Grok Vision API
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
                  media_type: 'image/jpeg',
                  data: base64Data,
                },
              },
              {
                type: 'text',
                text: `Analyze this soil image and return the following information in a structured format:
                
1. Soil type (sand, clay, loam, silt, or a combination)
2. Fertility level (low, medium, or high)
3. Moisture level (low, moderate, or high)
4. 3 best crops for this soil type

Keep the response short and structured. Format it clearly with labels.`,
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

    // Extract and parse the response
    const grokText = grokResponse.data.choices[0]?.message?.content || '';
    const analysisResult = parseGrokResponse(grokText);

    return res.status(200).json(analysisResult);
  } catch (error) {
    console.error('Grok API error:', error);
    
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.error?.message || 'Failed to analyze image';
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
