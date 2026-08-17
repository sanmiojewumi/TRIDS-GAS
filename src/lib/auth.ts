import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { db } from './db';

const SESSION_COOKIE_NAME = 'trids_admin_session';

export async function verifyAdminAuth(): Promise<boolean> {
  try {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!sessionToken) return false;

    // Simple verification check: check token exists and corresponds to active admin user
    const [userId, timestamp] = sessionToken.split(':');
    if (!userId) return false;

    const user = await db.adminUser.findUnique({
      where: { id: userId },
    });

    return !!user;
  } catch (err) {
    return false;
  }
}

export async function loginAdmin(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await db.adminUser.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: false, error: 'Invalid email or password' };
    }

    const passwordValid = await bcrypt.compare(password, user.passwordHash);
    if (!passwordValid) {
      return { success: false, error: 'Invalid email or password' };
    }

    const sessionToken = `${user.id}:${Date.now()}`;
    const cookieStore = cookies();
    cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Login failed' };
  }
}

export async function logoutAdmin() {
  const cookieStore = cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
