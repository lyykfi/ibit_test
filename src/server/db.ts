import * as lowdb from 'lowdb';

/**
 * get data base
 * @function getDB
 */
export function getDB() {
    const FileSync = require('lowdb/adapters/FileSync');
    const adapter = new FileSync('db.json');
    const db = lowdb(adapter);

    // Set some defaults
    db.defaults({ deals: [] }).write();

    return db;
}
