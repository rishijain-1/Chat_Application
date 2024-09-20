import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  try {
  
    const authHeader = req.headers.get('Authorization');


    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Authorization token missing or invalid' }, { status: 401 });
    }

    const URL = process.env.API_URL;
    const accessToken = authHeader.split(' ')[1];
     

    const response = await axios.get(`${URL}/api/user/logout`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`, 
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error fetching profile:', error.data);

    return NextResponse.json({
      message: error.response?.data?.message || 'Failed to fetch profile',
    }, { status: error.response?.status || 500 });
  }
}
