import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import sqlite3, { Database } from 'sqlite3';

export async function GET(request, { params }) {
	console.log('api/session/POST');
	const db = connectDB();
	let stmt = db.prepare('INSERT INTO session VALUES (?,0,0)');

	const randomString = generateRandomString(20);
	stmt.run(randomString);
	stmt.finalize();

	const response = NextResponse.json({ process: 'done', sessionid: randomString }, { status: 200 });
	response.cookies.set('session_id', randomString);
	return response;
}
