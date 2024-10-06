import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    // Format today's date to YYYY-MM-DD and add one day
    const todayString = new Date();
    todayString.setDate(todayString.getDate() + 1); // Add one day
    const today: string = todayString.toISOString().split('T')[0] || ""; // Extract only the date part

    // Query the database for users with today's date
    const users = await sql`SELECT * FROM users WHERE currentdate = ${today};`;

    // Return the users with appropriate cache control headers
    const response = NextResponse.json(users.rows);
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}