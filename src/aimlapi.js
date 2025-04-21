import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY
const baseURL = 'https://api.aimlapi.com/v1';

export const getResult = async (text, prompt) => {
  try {
    const response = await axios.post(
      `${baseURL}/chat/completions`,
      {
        model:'mistralai/Mistral-7B-Instruct-v0.2',
        messages: [
          {
            role: 'system',
            content:'You are a helpful and intelligent assistant designed to analyze educational text.'
          },
          {
            role: 'user',
            content: `${prompt}:\n\n${text}`
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const aiReply = response.data.choices[0].message.content
    console.log(typeof(aiReply))
    console.log('AI:', aiReply )
    return aiReply;
  } catch (error) {
    console.log('Error', error);
    return 'Failed to get summary';
  }
}