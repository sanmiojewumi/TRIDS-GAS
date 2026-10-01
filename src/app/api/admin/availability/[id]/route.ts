import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { verifyAdminAuth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await verifyAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    await db.blockedDate.delete({ where: { id } });
    revalidatePath('/book');
    revalidatePath('/quote');
    revalidatePath('/api/availability');
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Could not remove blocked date' }, { status: 404 });
  }
}
