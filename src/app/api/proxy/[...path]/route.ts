import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'http://185.200.244.48/api/v1';

async function handler(request: NextRequest) {
  // Extract the path after /api/proxy/
  const path = request.nextUrl.pathname.replace('/api/proxy', '');
  const search = request.nextUrl.search;
  const url = `${API_BASE_URL}${path}${search}`;

  // Forward the request
  const response = await fetch(url, {
    method: request.method,
    headers: {
      'Content-Type': 'application/json',
      // Forward auth token if present
      ...(request.headers.get('Authorization')
        ? { Authorization: request.headers.get('Authorization')! }
        : {}),
    },
    body:
      request.method !== 'GET' && request.method !== 'HEAD'
        ? await request.text()
        : undefined,
  });

  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
