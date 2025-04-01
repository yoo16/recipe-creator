// services/saveImageFromDataUri.ts
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { v4 as uuid } from 'uuid';

/**
 * Base64のData URIから画像ファイルを保存
 * @param dataUri Data URI (例: data:image/png;base64,xxxx...)
 * @returns 保存された画像のパス（/uploads/xxxxx.png）
 */
export async function saveImageFromDataUri(dataUri: string): Promise<string> {
    // Data URI の形式をパース
    const matches = dataUri.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/);
    if (!matches) throw new Error('Invalid Data URI format');

    const mimeType = matches[1]; // 例: image/png, image/jpeg
    const base64Data = matches[2];
    const ext = mimeType.split('/')[1]; // 例: png, jpeg

    const buffer = Buffer.from(base64Data, 'base64');

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    const filename = `${uuid()}.${ext}`;
    const filePath = path.join(uploadDir, filename);

    await writeFile(filePath, buffer as Uint8Array);

    return `/uploads/${filename}`;
}
