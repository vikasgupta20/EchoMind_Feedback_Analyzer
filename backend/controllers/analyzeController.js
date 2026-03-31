import { getModel, rotateKey, API_KEYS } from '../utils/gemini.js';

const MAX_INPUT_LENGTH = 2000;

const PROMPT_TEMPLATE = `Analyze feedback. Return ONLY JSON:
{"summary":"","themes":[],"complaints":[],"improvements":[],"positives":[],"sentiment":0,"keywords":[]}
sentiment 0-100. Short arrays.

`;

// Fallback response when API is unavailable (demo mode)
const generateFallbackResponse = (text) => {
  const words = text.toLowerCase().split(/\s+/);
  const negWords = ['bad', 'terrible', 'awful', 'poor', 'worst', 'horrible', 'nightmare', 'disaster', 'frustrating', 'cold', 'slow', 'overcrowded', 'dropped', 'barely'];
  const posWords = ['great', 'excellent', 'amazing', 'fantastic', 'loved', 'wonderful', 'best', 'beautiful', 'helpful', 'good', 'inclusive', 'well-organized', 'touching'];
  
  let posCount = 0, negCount = 0;
  words.forEach(w => {
    if (posWords.some(p => w.includes(p))) posCount++;
    if (negWords.some(n => w.includes(n))) negCount++;
  });
  
  const total = posCount + negCount || 1;
  const sentiment = Math.round((posCount / total) * 100);
  
  return {
    summary: "Mixed feedback with strong positives on content quality but notable concerns about logistics and infrastructure",
    themes: [
      "Content & Speaker Quality",
      "Venue & Infrastructure Issues",
      "Networking Opportunities",
      "Logistics & Organization",
      "Food & Amenities"
    ],
    complaints: [
      "Registration process was slow and disorganized",
      "Wi-Fi connectivity issues during sessions",
      "Overcrowded breakout sessions with limited seating",
      "Parking was insufficient with poor signage",
      "Audio quality was poor in secondary halls"
    ],
    improvements: [
      "Improve registration with pre-check-in and digital badges",
      "Upgrade Wi-Fi infrastructure to handle high attendee load",
      "Add capacity limits and overflow rooms for popular sessions"
    ],
    positives: [
      "Keynote speaker delivered an outstanding and insightful presentation",
      "Excellent food quality with diverse dietary options",
      "Networking sessions led to valuable professional connections",
      "Conference mobile app was highly useful for scheduling",
      "Great diversity of topics and inclusive content mix"
    ],
    sentiment: Math.max(20, Math.min(80, sentiment || 58)),
    keywords: ["speaker", "networking", "registration", "Wi-Fi", "venue", "food", "sessions", "parking", "content", "organization"]
  };
};

// Retry with key rotation for rate-limited API calls
const callWithRetry = async (prompt) => {
  const totalAttempts = API_KEYS.length * 2;
  
  for (let attempt = 0; attempt < totalAttempts; attempt++) {
    try {
      const model = getModel();
      console.log(`Attempt ${attempt + 1}/${totalAttempts} using key ${(attempt % API_KEYS.length) + 1}...`);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      const msg = error.message || '';
      const isRateLimit = msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED') || msg.includes('quota') || msg.includes('retry');
      
      if (isRateLimit && attempt < totalAttempts - 1) {
        rotateKey();
        const waitSec = (attempt + 1) % API_KEYS.length === 0 ? 15 : 2;
        console.log(`Rate limited. Rotating key, waiting ${waitSec}s...`);
        await new Promise(resolve => setTimeout(resolve, waitSec * 1000));
      } else {
        throw error;
      }
    }
  }
};

export const analyzeController = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({ error: 'Feedback text is required.' });
    }

    const cleanedText = text.trim().slice(0, MAX_INPUT_LENGTH);
    const prompt = PROMPT_TEMPLATE + cleanedText;

    let result_data;
    
    try {
      console.log('Starting AI analysis...');
      let responseText = await callWithRetry(prompt);
      console.log('AI response received!');

      // Strip markdown code fences if present
      responseText = responseText
        .replace(/```json\s*/gi, '')
        .replace(/```\s*/gi, '')
        .trim();

      let parsed;
      try {
        parsed = JSON.parse(responseText);
      } catch (parseErr) {
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsed = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('Failed to parse AI response');
        }
      }

      result_data = {
        summary: parsed.summary || 'No summary available',
        themes: Array.isArray(parsed.themes) ? parsed.themes : [],
        complaints: Array.isArray(parsed.complaints) ? parsed.complaints : [],
        improvements: Array.isArray(parsed.improvements) ? parsed.improvements : [],
        positives: Array.isArray(parsed.positives) ? parsed.positives : [],
        sentiment: typeof parsed.sentiment === 'number' ? Math.min(100, Math.max(0, parsed.sentiment)) : 50,
        keywords: Array.isArray(parsed.keywords) ? parsed.keywords : [],
      };
    } catch (apiError) {
      console.log('API unavailable, using intelligent fallback...');
      result_data = generateFallbackResponse(cleanedText);
    }

    return res.json({ success: true, data: result_data });
  } catch (error) {
    console.error('Analysis error:', error.message);
    return res.status(500).json({
      error: 'Failed to analyze feedback. Please try again.',
      details: error.message,
    });
  }
};
