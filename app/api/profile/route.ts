import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

export const dynamic = 'force-dynamic'; 

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Authorization token missing or invalid' },
        { status: 401 }
      );
    }

    const URL = process.env.API_URL;

    if (!URL) {
      return NextResponse.json(
        { message: 'API URL not configured' },
        { status: 500 }
      );
    }

    const accessToken = authHeader.split(' ')[1];

    const response = await axios.get(`${URL}/api/user/profile`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: AxiosError | unknown) {
    console.error('Error during fetching profile:', (error as AxiosError).response?.data || error);

    return NextResponse.json(
      {
        message: (error as AxiosError).response?.data || 'Failed to fetch profile',
      },
      { status: (error as AxiosError).response?.status || 500 }
    );
  }
}
