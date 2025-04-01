import { NextRequest, NextResponse } from 'next/server';
import { CreateRecipe } from '@/app/services/ai/Recipe';

export async function POST(req: NextRequest) {
    try {
        const order = await req.json();
        const aiRecipe = await CreateRecipe(order);
        console.log("order:", order);
        console.log(aiRecipe);
        if (!aiRecipe) return NextResponse.json({ error: 'Cannot create recipe' });
        return NextResponse.json(aiRecipe);
    } catch (error) {
        return NextResponse.json({ error: 'GoogleGenerativeAI error' });
    }
}