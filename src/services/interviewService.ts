import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

const systemPrompts = {
  preparation: `You are an expert interview coach helping candidates prepare for job interviews.
Focus on understanding the role they're applying for and providing tailored advice on:
- Common interview questions for their specific role
- Industry-specific technical questions
- Behavioral question strategies
- Company research tips
- Salary negotiation advice`,
  
  practice: `You are conducting a mock interview. Your role is to:
- Ask relevant technical and behavioral questions
- Provide realistic interview scenarios
- Give immediate feedback on responses
- Suggest improvements
- Maintain a professional but encouraging tone`,
  
  feedback: `You are an interview feedback specialist. Your role is to:
- Analyze responses for content and delivery
- Identify strengths and areas for improvement
- Provide specific examples and suggestions
- Offer actionable tips for improvement
- Help candidates refine their answers`
};

export async function generateInterviewResponse(
  input: string,
  mode: 'preparation' | 'practice' | 'feedback'
): Promise<string> {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: 'system', content: systemPrompts[mode] },
        { role: 'user', content: input }
      ],
      temperature: 0.7,
      max_tokens: 500,
      presence_penalty: 0.6,
      frequency_penalty: 0.5
    });

    return completion.data.choices[0].message?.content || 'I apologize, but I couldn\'t generate a response.';
  } catch (error) {
    console.error('Error generating interview response:', error);
    throw error;
  }
}

export async function generateInterviewQuestions(role: string): Promise<string[]> {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: 'system',
          content: `Generate 5 relevant interview questions for a ${role} position. Include a mix of technical and behavioral questions.`
        }
      ],
      temperature: 0.8,
      max_tokens: 300
    });

    const response = completion.data.choices[0].message?.content || '';
    return response.split('\n').filter(q => q.trim());
  } catch (error) {
    console.error('Error generating interview questions:', error);
    throw error;
  }
}

export async function analyzeFeedback(response: string): Promise<{
  strengths: string[];
  improvements: string[];
  suggestions: string[];
}> {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: 'system',
          content: 'Analyze the interview response and provide feedback in JSON format with strengths, areas for improvement, and specific suggestions.'
        },
        { role: 'user', content: response }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const feedback = JSON.parse(completion.data.choices[0].message?.content || '{}');
    return {
      strengths: feedback.strengths || [],
      improvements: feedback.improvements || [],
      suggestions: feedback.suggestions || []
    };
  } catch (error) {
    console.error('Error analyzing feedback:', error);
    throw error;
  }
}