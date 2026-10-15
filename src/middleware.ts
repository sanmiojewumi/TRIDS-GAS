import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SERVICE_LANDING_BY_SLUG } from '@/lib/paths';

const STATIC_FILE = /\.(?:ico|png|jpe?g|gif|webp|svg|txt|xml|woff2?|map)$/i;

export function middleware(request: NextRequest) {
  const hostname = (request.headers.get('host') || '').split(':')[0];
  const { pathname } = request.nextUrl;

  if (hostname === 'tridsgas.com') {
    const url = request.nextUrl.clone();
    url.protocol = 'https:';
    url.hostname = 'www.tridsgas.com';
    url.port = '';
    return NextResponse.redirect(url, 308);
  }

  if (STATIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  if (pathname === '/areas/crewe' || pathname === '/areas/crewe/') {
    const url = request.nextUrl.clone();
    url.pathname = '/gas-engineer-crewe';
    return NextResponse.redirect(url, 308);
  }

  const serviceSlug = pathname.match(/^\/services\/([^/]+)\/?$/)?.[1];
  const landing = serviceSlug ? SERVICE_LANDING_BY_SLUG[serviceSlug] : undefined;
  if (landing) {
    const url = request.nextUrl.clone();
    url.pathname = landing;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
