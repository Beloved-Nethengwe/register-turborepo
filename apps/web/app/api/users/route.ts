import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET( ) {
  try {
    // Fetch all users from the database
    const users = await sql`SELECT * FROM users;`;
    const response = NextResponse.json(users.rows);
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    return response; 

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ message: "Error retrieving data from database" }, { status: 500 });
  }
}
