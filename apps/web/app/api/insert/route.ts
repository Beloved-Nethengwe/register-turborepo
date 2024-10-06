import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  const body = await request.json();  // Parse the request body
  const { username, surname, idnumber, currentdate } = body;

  if (!username || !surname || !idnumber || !currentdate) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    
    await sql`
      INSERT INTO users (username, surname, idNumber, currentDate)
      VALUES (${username}, ${surname}, ${idnumber}, ${currentdate});
    `;

    
    return NextResponse.json({ message: 'User added successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error adding user:', error);
    return NextResponse.json({ error: '' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}