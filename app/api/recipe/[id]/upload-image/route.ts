// app/api/recipe/[id]/upload-image/route.ts
import { writeFile } from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';
import { mkdir } from 'fs/promises';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const formData = await req.formData();
    const file = formData.get('image') as File;

    //  ファイルが存在しない場合のエラーハンドリング
    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

    // バッファを取得
    const buffer = new Uint8Array(await file.arrayBuffer());
    // アップロードディレクトリのパスを取得
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    // ディレクトリが存在しない場合は作成
    await mkdir(uploadDir, { recursive: true });

    // ファイル名をUUIDで生成
    const filename = `${uuid()}-${file.name}`;
    // ファイルパスを生成
    const filePath = path.join(uploadDir, filename);
    // ファイルを保存
    await writeFile(filePath, buffer);

    console.log(params);
    // レシピIDを取得
    const recipeId = params.id;
    // レシピの画像URLを更新
    const imageUrl = `/uploads/${filename}`;
    const updatedRecipe = await prisma.recipe.update({
        where: { id: Number(recipeId) },
        data: {
            image: imageUrl,
        },
    });
    if (!updatedRecipe) {
        return NextResponse.json({ error: 'Failed to update recipe image' }, { status: 500 });
    }

    return NextResponse.json({ imageUrl: imageUrl });
}