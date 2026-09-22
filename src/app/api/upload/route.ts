import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { verifyAdminAuth } from '@/lib/auth';

const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;

const allowedTypes: Record<string, { extension: string; kind: 'IMAGE' | 'VIDEO' }> = {
  'image/jpeg': { extension: 'jpg', kind: 'IMAGE' },
  'image/png': { extension: 'png', kind: 'IMAGE' },
  'image/webp': { extension: 'webp', kind: 'IMAGE' },
  'image/gif': { extension: 'gif', kind: 'IMAGE' },
  'video/mp4': { extension: 'mp4', kind: 'VIDEO' },
  'video/webm': { extension: 'webm', kind: 'VIDEO' },
};

function hasValidSignature(buffer: Buffer, mime: string): boolean {
  if (mime === 'image/jpeg') return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  if (mime === 'image/png') return buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  if (mime === 'image/gif') return buffer.subarray(0, 4).toString('ascii') === 'GIF8';
  if (mime === 'image/webp') return buffer.subarray(0, 4).toString('ascii') === 'RIFF' && buffer.subarray(8, 12).toString('ascii') === 'WEBP';
  if (mime === 'video/mp4') return buffer.subarray(4, 8).toString('ascii') === 'ftyp';
  if (mime === 'video/webm') return buffer.subarray(0, 4).equals(Buffer.from([0x1a, 0x45, 0xdf, 0xa3]));
  return false;
}

export async function POST(req: Request) {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const contentLength = Number(req.headers.get('content-length') || 0);
    if (contentLength > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ error: 'File is too large' }, { status: 413 });
    }

    const formData = await req.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }
    const allowed = allowedTypes[file.type];
    if (!allowed || file.size <= 0 || file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json(
        { error: 'Only JPG, PNG, WebP, GIF, MP4 and WebM files up to 25 MB are allowed' },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    if (!hasValidSignature(buffer, file.type)) {
      return NextResponse.json({ error: 'File content does not match its declared type' }, { status: 400 });
    }

    const fileName = `${randomUUID()}.${allowed.extension}`;

    // Target upload directory: public/uploads
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Ensure directory exists
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName,
      type: allowed.kind,
    });
  } catch (error: any) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
