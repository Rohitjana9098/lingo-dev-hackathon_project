import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function proxy(request: NextRequest) {
    const auth = request.cookies.get('mock_auth')?.value;

    // Protect /dashboard route
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        if (auth !== 'true') {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    // Redirect authenticated users away from the login page
    if (request.nextUrl.pathname === '/') {
        if (auth === 'true') {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/dashboard/:path*'],
}
