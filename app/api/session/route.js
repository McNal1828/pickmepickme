import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import sqlite3, { Database } from 'sqlite3';

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
				response = NextResponse.json({ process: 'not proper sesionid' }, { status: 404 });
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
	const res = await fetch(`${process.env.SQLITEBACK}/session`, { method: 'POST' });
	const data = await res.json();
	const response = NextResponse.json(data, { status: 200 });
	response.cookies.set('session_id', data.sessionid);
	return response;
}
