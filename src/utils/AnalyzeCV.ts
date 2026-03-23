import OpenAI from 'openai';
  
export const AnalyzeCV = async (cvText: string): Promise<{
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
  const baseURL = 'https://router.huggingface.co/v1';
  const model = 'openai/gpt-oss-120b';

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