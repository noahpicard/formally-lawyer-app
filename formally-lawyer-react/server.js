const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// db to store messages and rooms
const db = require('any-db');
const conn = db.createConnection('sqlite3://formally-lawyer.db');
conn.query("CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, email varchar(60), first_name varchar(60)," +
  "last_name varchar(60), password varchar(60), Created date DATE)");


conn.end();

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.post('/api/world', (req, res) => {
  console.log(req.body);
res.send(
  `I received your POST request. This is what you sent me: ${req.body.post}`,
);
});

app.listen(port, () => console.log(`Listening on port ${port}`));