import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET( ) {
  try {
    // Fetch all users from the database
    const users = await sql`SELECT * FROM users;`;
    
    return NextResponse.json(users.rows); 

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ message: "Error retrieving data from database" }, { status: 500 });
  }
}
