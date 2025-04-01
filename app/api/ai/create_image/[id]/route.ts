import { NextRequest, NextResponse } from 'next/server';
import { CreateImage } from '@/app/services/ai/CreateImage';
import prisma from '@/lib/prisma';
import { saveImageFromDataUri } from '@/app/services/SaveImageFromDataUri';

export async function POST(request: Request, { params }: { params: { id: string } }) {
    try {
        console.log(params);
        const recipe = await prisma.recipe.findUnique({
            where: { id: Number(params.id) },
        });
        if (!recipe) {
            return NextResponse.json({ error: 'Recipe not found' });
        }
        const image = await CreateImage(recipe);
        console.log(image);
        await saveImageFromDataUri(image.base64);

        return NextResponse.json(image);
    } catch (error) {
        console.error('Error processing image:', error);
        return NextResponse.json({ error: 'GoogleGenerativeAI error' });
    }
}
