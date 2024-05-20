import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import sqlite3, { Database } from 'sqlite3';
import crypto from 'crypto';

function generateRandomString(length) {
	const bytes = Math.ceil(length / 2);
	const randomBytes = crypto.randomBytes(bytes);
	return randomBytes.toString('hex').slice(0, length);
}

export async function PUT(request, { params }) {
	console.log('api/session/PUT');

	const db = new sqlite3.Database('util/db.sqlite', (err) => {
		if (err) {
			console.error(err.message);
		}
		console.log('Connected to the database.');
	});

	let stmt = db.prepare('INSERT INTO session VALUES (?,0,0)');

	const randomString = generateRandomString(16);
	stmt.run(randomString);
	stmt.finalize();
	db.close((err) => {
		if (err) {
			console.error(err.message);
		}
		console.log('Disconnected to the database.');
	});
	return NextResponse.json({ process: 'done', sessionid: randomString }, { status: 200 });
}
