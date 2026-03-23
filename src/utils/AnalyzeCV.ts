// Send CV text to OpenAI-compatible chat completions API and return structured JSON with:
// - ats_score: number out of 100
// - weak_bullets: array of { original: string, rewritten: string }
// - missing_keywords: string[]
// - sections_feedback: { summary: string, experience: string, skills: string, education: string }
// - top_3_fixes: string[]
// Use VITE_OPENAI_API_KEY from env variables
// System prompt should be a brutally honest senior recruiter and ATS expert

import OpenAI from 'openai';

// Response must be strict JSON only, no markdown, no extra text    
export const analyzeCV = async (cvText: string): Promise<{
    ats_score: number;
    weak_bullets: { original: string; rewritten: string }[];
    missing_keywords: string[];
    sections_feedback: {
        summary: string;
        experience: string;
        skills: string;
        education: string;
        projects: string;
    };
    top_3_fixes: string[];
}> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY as string | undefined;
  const baseURL = (import.meta.env.VITE_OPENAI_BASE_URL as string | undefined) ?? 'https://router.huggingface.co/v1';
  const model = (import.meta.env.VITE_OPENAI_MODEL as string | undefined) ?? 'openai/gpt-oss-120b';

  if (!apiKey) {
    throw new Error('OpenAI API key is not set in environment variables');
  }

    const openai = new OpenAI({
    apiKey,
    baseURL,
    dangerouslyAllowBrowser: true,
  });

    const systemPrompt = `You are a brutally honest senior recruiter and ATS expert. 
Analyze the CV text and respond ONLY with valid JSON in this exact shape, no markdown, no extra text:
{
  "ats_score": <number 0-100>,
  "weak_bullets": [{ "original": "...", "rewritten": "..." }],
  "missing_keywords": ["..."],
  "sections_feedback": {
    "summary": "...",
    "experience": "...",
    "skills": "...",
    "education": "...",
    "projects": "..."
  },
  "top_3_fixes": ["...", "...", "..."]
}`;

      const response = await openai.chat.completions.create({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: cvText },
        ],
      });


    // const response = await fetch('https://api.anthropic.com/v1/messages', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'x-api-key': openai.apiKey,
    //         'anthropic-version': '2023-06-01',
    //         'anthropic-dangerous-direct-browser-access': 'true',
    //     },
    //     body: JSON.stringify({
    //         model: 'claude-sonnet-4-20250514',
    //         max_tokens: 1500,
    //         system: systemPrompt,
    //         messages: [
    //             { role: 'user', content: cvText },
    //         ],
    //     }),
    // });

    const content = response.choices[0]?.message?.content;
    if (!content || typeof content !== 'string') {
      throw new Error('OpenAI API returned an empty response');
    }

    const normalized = content
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/, '')
      .trim();

    try {
      return JSON.parse(normalized);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error('Failed to parse JSON response from OpenAI API');
    }
};