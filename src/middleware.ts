import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth';

export async function middleware(request: NextRequest) {
    const session = request.cookies.get('admin_session')?.value;
    const isLoginPage = request.nextUrl.pathname.startsWith('/admin/login');

    if (!session && !isLoginPage) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    if (session) {
        try {
            const parsed = await decrypt(session);
            if (isLoginPage && parsed.admin) {
                return NextResponse.redirect(new URL('/admin', request.url));
            }
        } catch (err) {
            // Invalid session
            if (!isLoginPage) {
                return NextResponse.redirect(new URL('/admin/login', request.url));
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
