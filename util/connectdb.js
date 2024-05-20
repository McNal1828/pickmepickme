import sqlite3, { Database } from 'sqlite3';

export default function connectDB() {
	/**
	 * @type {Database}
	 */
	let db;
	if (!db) {
		const sqlite3v = sqlite3.verbose();
		db = new sqlite3v.Database('util/db.sqlite', sqlite3v.OPEN_READWRITE, (err) => {
			if (err) {
				console.error(err.message);
			}
			console.log('Connected to the database.');
		});
	}

	return db;
}
