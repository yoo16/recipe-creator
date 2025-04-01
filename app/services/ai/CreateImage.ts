import { GenerationConfig, GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-2.0-flash-exp-image-generation';

const generationConfig: GenerationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 1024,
    // responseMimeType: "image/jpeg",
};

export async function CreateImage(recipe: any) {
    if (!recipe || !API_KEY) return { error: 'Invalid input or missing API key' };

    try {
        const prompt = `
            おしゃれな料理レシピのための画像を作成。
            以下の条件で、画像をBase64形式で返してください：

            - 料理名: ${recipe.title}
            - スタイル: ${recipe.genre}
            - 説明: ${recipe.description}
            - 美しい器に盛り付けられた料理
            - 照明は柔らかめ、自然光風
            - 背景はシンプル

            出力は以下の形式：
            data:image/jpeg;base64,/9j/4AAQSk...
            `;

        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
        model.generationConfig = generationConfig;

        const result = await model.generateContent(prompt);
        const text = await result.response.text();
        return { base64: text };

    } catch (error: any) {
        console.error('Gemini error:', error);
        return { error: 'Gemini request error.' };
    }
}
