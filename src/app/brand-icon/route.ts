import { NextResponse } from 'next/server';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const dynamic = 'force-static';

async function readIcon() {
  const paths = [
    join(process.cwd(), 'public/images/icon-512.png'),
    join(process.cwd(), 'public/icon-512.png'),
    join(process.cwd(), 'public/images/trids-logo.png'),
  ];
  for (const filePath of paths) {
    try {
      return await readFile(filePath);
    } catch {
      continue;
    }
  }
  throw new Error('Brand icon file is missing');
}

export async function GET() {
  const file = await readIcon();
  return new NextResponse(file, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=86400, immutable',
    },
  });
}
