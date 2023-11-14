const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const createDbStatement = `CREATE DATABASE IF NOT EXISTS nodedb;`;
const useDbStatement = 'USE nodedb;'
const createTableStatement = `CREATE TABLE IF NOT EXISTS people(id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, PRIMARY KEY(id))`;
const insertStatement = `INSERT INTO people(name) values('joau')`;

const connection = mysql.createConnection(config);


runQuery(connection, createDbStatement);  
runQuery(connection, createTableStatement);
runQuery(connection, insertStatement);
runQuery(connection, useDbStatement);

app.get('/', async (req, res) => {
    try {
        const people = await runQuery(connection, 'SELECT * FROM people');
        res.send(`<h1>Full Cycle Rocks!</h1> \n ${people.map(p => p.name).join('\n')}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});

function runQuery(connection, statement) {
    return new Promise((resolve, reject) => {
        connection.query(statement, function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}
