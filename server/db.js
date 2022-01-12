/**
 * Creates SQLite database (if it does not exist)
 * and exports the database connection
 */
 const Database = require('better-sqlite3');
 const path = require('path');
 const fs = require('fs');

 let db;
 let error = null;
 let dbPath = path.join(__dirname, './data/db/hotelitary.db');
 let sqlPath = path.join(__dirname, './data/db/hotelitary.sql');

 try {

   if (!fs.existsSync(dbPath)) {

     db = new Database(dbPath);

     const createDatabase = fs.readFileSync(sqlPath, 'utf8');
     db.exec(createDatabase);

   } else {
     // the database exists
     db = new Database(dbPath);
   }

 } catch (e) {

   error = e;
   //console.log(e);

 } finally {

   if (!error){

     db.pragma('journal_mode = WAL');
     db.pragma('synchronous = FULL');
     // https://wiki.mozilla.org/Performance/Avoid_SQLite_In_Your_Next_Firefox_Feature
     // < a bit experimental
     db.pragma('wal_autocheckpoint = 16');
     db.pragma('journal_size_limit = 1536');
     // />
     

   }
   
 }

 module.exports = db;