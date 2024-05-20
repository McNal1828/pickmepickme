import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import sqlite3, { Database } from 'sqlite3';
import crypto from 'crypto';
import connectDB from '@/util/connectdb';

function generateRandomString(length) {
	const bytes = Math.ceil(length / 2);
	const randomBytes = crypto.randomBytes(bytes);
	return randomBytes.toString('hex').slice(0, length);
}

export async function PATCH(request, { params }) {
	console.log('api/session/PATCH');
	const body = await request.json();
	const { sessionid } = body;
	console.log(sessionid);
	const db = connectDB();

	/**
	 * @type {NextResponse}
	 */
	let response;

	// function dbquery() {
	// 	return new Promise((resolve, reject) => {
	// 		return db.get(`select * from session where id = ?`, [sessionid], (err, row) => {
	// 			console.log(row);
	// 			if (!!!row) {
	// 				console.log('ddd');
	// 				response_ = NextResponse.json({ process: 'not proper sesionid' }, { status: 403 });
	// 			}
	// 			if (!!row) {
	// 				console.log('ddd');
	// 				response_ = NextResponse.json({ process: 'done' }, { status: 201 });
	// 				response_.cookies.set('session_id', sessionid);
	// 			}
	// 			resolve('성공');
	// 		});
	// 	});
	// }

	const response_ = await new Promise((resolve, reject) =>
		db.get(`select * from session where id = ?`, [sessionid], (err, row) => {
			if (!!!row) {
				console.log('ddd');
				response = NextResponse.json({ process: 'not proper sesionid' }, { status: 403 });
			}
			if (!!row) {
				response = NextResponse.json({ process: 'done' }, { status: 201 });
				response.cookies.set('session_id', sessionid);
			}
			resolve('성공');
		})
	);
	return response;
}

export async function POST(request, { params }) {
	console.log('api/session/POST');
	const db = connectDB();
	let stmt = db.prepare('INSERT INTO session VALUES (?,0,0)');

	const randomString = generateRandomString(20);
	stmt.run(randomString);
	stmt.finalize();

	const response = NextResponse.json({ process: 'done' }, { status: 200 });
	response.cookies.set('session_id', randomString);
	return response;
}
