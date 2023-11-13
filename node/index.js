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

const connection = mysql.createConnection(config);

const insertStatement = `INSERT INTO people(name) values('joau')`;
connection.query(insertStatement);

app.get('/', async (req, res) => {
    try {
        const people = await getPeople(connection, 'SELECT * FROM people');
        res.send(`Fullcycle Rocks! \n ${people.map(p => p.name).join('\n')}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});

function getPeople(connection, statement) {
    return new Promise((resolve, reject) => {
        connection.query(statement, function (error, results) {
            if (error) {
                reject(error);
            } else {
                console.log(results);
                resolve(results);
            }
        });
    });
}

