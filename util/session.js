import sqlite3, { Database } from 'sqlite3';

export function create() {
	const db = new sqlite3.Database('util/db.sqlite', (err) => {
		if (err) {
			console.error(err.message);
		}
		console.log('Connected to the test database.');
	});
	let stmt = db.prepare('INSERT INTO session (name, email) VALUES (?, ?)');
	stmt.run('John Doe', 'john.doe@example.com');
	stmt.run('Jane Doe', 'jane.doe@example.com');
	stmt.finalize();
}
