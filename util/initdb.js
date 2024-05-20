import sqlite3, { Database } from 'sqlite3';

export default function init() {
	const db = new sqlite3.Database('util/db.sqlite', (err) => {
		if (err) {
			console.error(err.message);
		}
		console.log('Connected to the test database.');
	});
	db;
	initTable(db);
}

/**
 *
 * @param {Database} db
 */
function initTable(db) {
	db.get('select * from session', [], (err, row) => {
		if (err) {
			console.error('util/initdb.js | initTable | select session table :', err);
		}
		if (!!!row) {
			db.serialize(() => {
				db.run(
					`CREATE TABLE IF NOT EXISTS session(
                    id text,
                    teamcount integer,
                    teammax integer,
                    PRIMARY KEY (id)
                    )
                `,
					[],
					(err) => {
						if (err) {
							console.error('util/initdb.js | initTable | create session table :', err);
						}
						console.log('Table created or already exists.');
					}
				);
				db.run(
					`CREATE TABLE IF NOT EXISTS item(
                    id text,
                    idx integer,
                    name text,
                    picture_url text,
                    intruduce text,
                    detail text,
                    primary key (id, idx),
                    FOREIGN KEY (id) REFERENCES session(id)
                )`,
					[],
					(err) => {
						if (err) {
							console.error('util/initdb.js | initTable | create item table :', err);
						}
						console.log('Table created or already exists.');
					}
				);
				db.run(
					`CREATE TABLE IF NOT EXISTS team(
                    id text,
                    teamidx number,
                    items text,
                    primary key (id, teamidx),
                    FOREIGN KEY (id) REFERENCES session(id)
                )`,
					[],
					(err) => {
						if (err) {
							console.error('util/initdb.js | initTable | create team table :', err);
						}
						console.log('Table created or already exists.');
					}
				);
			});
		}
	});
}
