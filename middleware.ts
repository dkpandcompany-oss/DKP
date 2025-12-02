import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // For now, let client-side handle all admin authentication
  // This middleware can be expanded later for additional protection
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};