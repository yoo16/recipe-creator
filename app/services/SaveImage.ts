import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { v4 as uuid } from 'uuid';

/**
 * アップロードされたファイルを保存し、画像URLを返す
 * @param file Next.js の API で受け取った File オブジェクト
 * @returns 公開用画像URL（例: /uploads/uuid-filename.png）
 */
export async function saveImage(file: File): Promise<string> {
    if (!file) throw new Error('No file provided');
    const buffer = new Uint8Array(await file.arrayBuffer());

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    const filename = `${uuid()}-${file.name}`;
    const filePath = path.join(uploadDir, filename);

    await writeFile(filePath, buffer);

    return `/uploads/${filename}`;
}
