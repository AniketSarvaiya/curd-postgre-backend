const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

// const connectionString = {
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
// }
const db = new Client(connectionString);

db.connect().then((res) => {
    console.log(`DB-connected...!`);
}).catch((err) => {
    console.log(`${err}`);
})
const createTableQuery = `
CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL)
`;
db.query(createTableQuery, (err, result) => {
    if (err) console.log(`table creation error - ${err}`);
    else console.log(`table is UpToDate...!`);
})

module.exports = { db };
