import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSessionCookie } from '@/lib/session';

// ✅ renamed from "middleware" to "proxy"
export async function proxy(request: NextRequest) {
  const session = await getSessionCookie();
  const token = typeof session === 'string' ? session : session?.token;
  const role = typeof session === 'string' ? undefined : session?.role;
  const onboarded =
    typeof session === 'string' ? false : (session?.onboarded ?? false);
  const { pathname } = request.nextUrl;
  const authPages = ['/signin', '/signup'];
  const protectedRoutes = ['/dashboard', '/onboarding'];
  const adminOnlyRoutes = ['/dashboard/admin'];

  if (token && authPages.includes(pathname)) {
    const requestedRedirect =
      request.nextUrl.searchParams.get('redirect') || '';

    // If the user is not onboarded yet, don't bounce them back to `/dashboard`.
    const safeDashboardRedirect =
      !onboarded && requestedRedirect.startsWith('/dashboard')
        ? '/onboarding'
        : requestedRedirect;

    const redirectPath =
      safeDashboardRedirect || (onboarded ? '/dashboard' : '/onboarding');
    const redirectUrl = new URL(redirectPath, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
    const url = request.nextUrl.clone();
    url.pathname = '/signin';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // Block access to dashboard until onboarding is complete.
  if (token && !onboarded && pathname.startsWith('/dashboard')) {
    const url = request.nextUrl.clone();
    url.pathname = '/onboarding';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  if (
    token &&
    adminOnlyRoutes.some((route) => pathname.startsWith(route)) &&
    role !== 'admin'
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// ✅ renamed from "config" to "proxyConfig"
export const proxyConfig = {
  matcher: [
    '/dashboard',
    '/dashboard/:path*',
    '/signin',
    '/signup',
    '/onboarding',
    '/onboarding/:path*',
  ],
};
