const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// db to store messages and rooms
const db = require('any-db');
const conn = db.createConnection('sqlite3://formally-lawyer.db');
conn.query("CREATE TABLE IF NOT EXISTS Users (email varchar(60) PRIMARY key, first_name varchar(60) not null," +
  "last_name varchar(60) not null, password varchar(60) not null, Created TIMESTAMP DEFAULT CURRENT_TIMESTAMP)");


conn.query("CREATE TABLE IF NOT EXISTS Clients (email varchar(60) PRIMARY key," +
    "    firstName TEXT NOT NULL," +
    "    middleName TEXT DEFAULT NULL," +
    "    lastName TEXT NOT NULL," +
    "    groupID INTEGER DEFAULT NULL," +
    "    userClientID INTEGER DEFAULT NULL UNIQUE," +
    "Created TIMESTAMP DEFAULT CURRENT_TIMESTAMP"+
    ");");

conn.end();

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});


app.post('/api/signin', (req, res) => {
  console.log(req.body)
  const check = "select * from Users where email = ? and password = ?"
    const conn = db.createConnection('sqlite3://formally-lawyer.db');
    conn.query(check,[req.body.email, req.body.password], function (error,data) {
        if (error){
          console.log("SIGN IN ERR should never call")
          console.log(error)
        } else{
            if(data.rowCount == 0){
              res.send({error:"invalid login"})
            }else{
                delete data.rows[0].password
                res.send(data.rows[0])
            }


        }
    })


});



app.post('/api/signup', (req, res) => {
  const conn = db.createConnection('sqlite3://formally-lawyer.db');


    const insert = "insert into Users(email, first_name, last_name, password) values (?,?,?,?)";

  conn.query(insert, [req.body.email, req.body.firstName, req.body.lastName, req.body.password],function (error, data) {

    if(error){
      const to_return = {error:error}
      res.send(to_return)
    }else{
        delete req.body["password"];
        //console.log(req.body)
        res.send(req.body);

    }
      
  });
  conn.end()
  console.log(req.body);

});

app.listen(port, () => console.log(`Listening on port ${port}`));