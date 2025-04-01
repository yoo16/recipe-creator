import { NextRequest, NextResponse } from 'next/server';
import { CreateRecipe } from '@/app/services/ai/ImageRecipe';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const imageFile = formData.get('image') as File | null;

        if (!imageFile) return NextResponse.json({ error: 'Image file is required' });
        console.log("imageFile:", imageFile);

        const aiRecipe = await CreateRecipe(imageFile);
        console.log(aiRecipe);
        return NextResponse.json( aiRecipe );
    } catch (error) {
        console.error('Error processing image:', error);
        return NextResponse.json({ error: 'GoogleGenerativeAI error' });
    }
}
