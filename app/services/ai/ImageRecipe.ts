import { GenerationConfig, GoogleGenerativeAI } from "@google/generative-ai";
import { createPrompt } from "@/app/components/PromptImageRecipe";
import fs from 'fs';
import path from 'path';;

const API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-1.5-flash';

const generationConfig: GenerationConfig = {
    temperature: 1,  //ランダム性
    topP: 0.95,      //累積確率
    topK: 64,        //トップkトークン
    maxOutputTokens: 1024,  //最大出力トークン数
    responseMimeType: "application/json",
};

export async function getTestRecipe() {
    const filePath = path.resolve(process.cwd(), 'app/data/test_recipe1.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(fileContents);
    return json;
}

export async function CreateRecipe(imageFile: File) {
    if (!imageFile) return;
    if (!API_KEY) return;
    try {
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Image = buffer.toString('base64');

        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
        model.generationConfig = generationConfig;

        const prompt = createPrompt();
        console.log(prompt)

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: base64Image,
                    mimeType: imageFile.type
                }
            }]
        );

        var text = await result.response.text();
        var json = JSON.parse(text);
        console.log(prompt)
        console.log(json);
        return json;
    } catch (error) {
        console.log(error)
        return { error: 'Gemini request error.' };
    }
}