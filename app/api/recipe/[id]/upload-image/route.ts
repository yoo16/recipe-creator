// app/api/recipe/[id]/upload-image/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { saveImage } from '@/app/services/SaveImage';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const formData = await req.formData();
        const file = formData.get('image') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // 画像保存
        const imageUrl = await saveImage(file);

        // レシピに画像パス更新
        const updatedRecipe = await prisma.recipe.update({
            where: { id: Number(params.id) },
            data: { image: imageUrl },
        });

        if (!updatedRecipe) {
            return NextResponse.json({ error: 'Failed to update recipe image' }, { status: 500 });
        }

        return NextResponse.json({ imageUrl });
    } catch (error) {
        console.error('Image upload error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
