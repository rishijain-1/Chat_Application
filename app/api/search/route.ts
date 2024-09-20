// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query || typeof query !== 'string') {
    return NextResponse.json({ message: 'Query is required and must be a string' }, { status: 400 });
  }

  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Authorization token missing or invalid' }, { status: 401 });
  }

  try {
    const accessToken = authHeader.split(' ')[1];
    const response = await axios.get(`${process.env.API_URL}/api/user/search/${query}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data?.message || 'Failed to fetch data' },
      { status: error.response?.status || 500 }
    );
  }
}
