import { Configuration, OpenAIApi } from 'openai';
let openai;

const instructions = ``;

if (process.env.OPENAI_API_KEY) {
    const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
    openai = new OpenAIApi(configuration);
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        max_tokens: 2048,
        frequency_penalty: 0,
        presence_penalty: 0,
        top_p: 1,
        messages: body.messages,
    }, { timeout: 60000 });

    const response_text = response.data.choices[0].message.content.trim();

    return {
      message: response_text,
    }
})