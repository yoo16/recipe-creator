// app/api/recipe/[id]/generate-image/route.ts
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { GenerationConfig, GoogleGenerativeAI } from '@google/generative-ai';
import { v4 as uuidv4 } from 'uuid';

const API_KEY = process.env.GEMINI_API_KEY!;
const GEMINI_MODEL = 'gemini-2.0-flash-exp-image-generation';

const generationConfig: GenerationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 1024,
};

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const body = await req.json();
    const recipe = body.recipe;

    if (!recipe || !API_KEY) {
        return NextResponse.json({ error: 'Invalid input or missing API key' }, { status: 400 });
    }

    try {
        const prompt = `
    おしゃれな料理レシピのための画像を作成。
    以下の条件で、画像をBase64形式のData URIで返してください：
    
    - 料理名: ${recipe.title}
    - スタイル: ${recipe.genre}
    - 説明: ${recipe.description}
    - 美しい器に盛り付けられた料理
    - 自然光、柔らかい照明
    - 背景はシンプル
    - 出力形式は以下のようなJSON形式：
    {
        "image": "data:image/png;base64,..."
    }
    `;

        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
        model.generationConfig = generationConfig;

        const result = await model.generateContent(prompt);
        const text = await result.response.text();

        console.log('Raw response:', text);

        const { image } = JSON.parse(text);

        // Data URI の分解
        const matches = image.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/);
        if (!matches) throw new Error('Invalid Data URI format');

        const mimeType = matches[1]; // 例: image/png
        const base64Data = matches[2];
        const ext = mimeType.split('/')[1]; // 例: png

        const buffer = Buffer.from(base64Data, 'base64');

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Image generation or save failed' }, { status: 500 });
    }
}
