import { NextResponse } from 'next/server'

export function middleware(request) {
  // Development: full access to everything
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next()
  }

  // Production: everything redirects to coming soon home page
  const { pathname } = request.nextUrl
  if (pathname === '/') return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = '/'
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpe?g|gif|webp|ico|svg|woff2?|xml|txt)$).*)'],
}
