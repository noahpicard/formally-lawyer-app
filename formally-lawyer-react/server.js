const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// fake data
const firstNames = ["Bob", "Robert", "Robin", "Gokul", "Mike", "Akhil", "Aaron", "Becket", "Richard", "Drew", "Andrew", "Troy",
  "Juan", "Carlos", "Luis", "Riccardo", "Lizbeth"];
const lastNames = ["Edwards", "Roberts", "Smith", "Treyhill", "Nottingham", "Terrance", "Eddingburg", "Thomas", "Rickett"];
const networks = ["South West Lawyers Association", "Lawyers Against Trump", "International Lawyer Association"];
const emailProv = ["gmail", "aol", "yahoo"];
const imStatus = ["United States Citizen", "Lawful Permanent Resident", "Temporary Visitor", "Undocumented Immigrant"];
const nations = ["Mexican", "Canadian", "Spanish", "South African", "Brazilian"];

const addy = ["23rd W 57th St. Yuma, AZ 85364", "Brown University Providence, RI 02912", "East Town Center Boston, MA 03293"];

// db to store messages and rooms
const db = require('any-db');
create_tables();
// create_fake_data();

function create_fake_data() {
  const conn = db.createConnection('sqlite3://formally-lawyer.db');

  let clientNames = [];
  let userNames = [];
  let users = [];
  let clients = [];
  for (let i = 0; i < 10; i ++) {
      let curUser = createUser(userNames);
      users.push(curUser);
      userNames.push(curUser.first_name+curUser.last_name);
  }
  for (let j = 0; j < 250; j ++) {
    let curClient = createClient(clientNames);
    clients.push(curClient);
    clientNames.push(curClient.first_name+curClient.last_name);
  }
  const insert = "insert into Users(email, first_name, last_name, password) values (?,?,?,?)";
  for (let i = 1; i < 10; i++) {
    let user = users[i];
    conn.query(insert, [user.email, user.first_name, user.last_name, user.password],function (error, data) {
      if(error){
        console.log(error);
      }else{
        let foreign = data.lastInsertId;
        let addClient = "insert into Clients (email, first_name, last_name, password," +
        " immigration_status, address, arn, nationality, user_id) values (?,?,?,?,?,?,?,?,?)";
        for (let j = 0; j < 25; j++) {
            let curClient = clients[i * 25 + j]
          conn.query(addClient, [curClient.email, curClient.first_name,
            curClient.last_name, curClient.password, curClient.immigration_status,
            curClient.address, curClient.arn, curClient.nationality, foreign],function (error, data) {
            if(error){
              console.log(error);
            }else{
              console.log(data);
            }
          });
        }
      }
    });
  }
}


function getRandomIndex(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeId() {
  let result           = "";
  let characters       = '0123456789';
  let charactersLength = characters.length;
  for ( let i = 0; i < 8; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return "A" + result;
}


function createUser(used) {
  let first_name = getRandomIndex(firstNames);
  let last_name = getRandomIndex(lastNames);
  while (first_name + last_name in used) {
    first_name = getRandomIndex(firstNames);
    last_name = getRandomIndex(lastNames);
  }
  let prov = getRandomIndex(emailProv);

  let password = "1";

  let email = first_name + "." + last_name + "@" + prov + ".com";

  return {email, first_name, last_name, password};
}

function createClient(used) {
  let first_name = getRandomIndex(firstNames);
  let last_name = getRandomIndex(lastNames);
  while (first_name + last_name in used) {
    first_name = getRandomIndex(firstNames);
    last_name = getRandomIndex(lastNames);
  }
  let prov = getRandomIndex(emailProv);

  let password = "1";

  let email = first_name + "." + last_name + "@" + prov + ".com";
  let immigration_status = getRandomIndex(imStatus);
  let arn = makeId();
  let nationality = getRandomIndex(nations);
  let address = getRandomIndex(addy);

  return {first_name, last_name, password, email, immigration_status, arn, nationality, address}
}

function create_tables(){
    const conn = db.createConnection('sqlite3://formally-lawyer.db');

    function create_table(sql) {
        conn.query(sql, function(err){
            if(err){
                console.log(err);
            }
        });
    }
    create_table("CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, email varchar(60) UNIQUE, first_name varchar(60) not null,\
        last_name varchar(60) not null, password varchar(60) not null, Created TIMESTAMP DEFAULT CURRENT_TIMESTAMP)")

    create_table("CREATE TABLE IF NOT EXISTS Networks (\
    id	INTEGER PRIMARY KEY AUTOINCREMENT,\
    name	TEXT NOT NULL)")

    create_table("CREATE TABLE IF NOT EXISTS Clients (\
    id	INTEGER PRIMARY KEY AUTOINCREMENT,\
    email	varchar(60) UNIQUE,\
    first_name	varchar(60) NOT NULL,\
    last_name	INTEGER NOT NULL,\
    password	varchar(60) NOT NULL,\
    created	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\
    immigration_status TEXT, \
    address TEXT, \
    arn INTEGER, \
    nationality TEXT, \
    user_id	INTEGER,\
    meta_json TEXT default '{}',\
    FOREIGN KEY (user_id) REFERENCES Users(id))")

    create_table("CREATE TABLE IF NOT EXISTS User_Network (\
    user_id	INTEGER,\
    network_id	INTEGER,\
    FOREIGN KEY (user_id) REFERENCES Users(id),\
    FOREIGN KEY (network_id) REFERENCES Networks(id))")

    create_table("CREATE TABLE IF NOT EXISTS Form_types (\
    id	INTEGER PRIMARY KEY AUTOINCREMENT,\
    form_json	TEXT NOT NULL)")

    create_table("CREATE TABLE IF NOT EXISTS Forms (\
    id	INTEGER PRIMARY KEY AUTOINCREMENT,\
    client_id	INTEGER NOT NULL,\
    form_type_id INTEGER NOT NULL,\
    info_json	TEXT NOT NULL,\
    FOREIGN KEY (client_id) REFERENCES Clients(id),\
    FOREIGN KEY (form_type_id) REFERENCES Form_types(id))")
    conn.end();
}


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
          conn.end();
        } else{
            if(data.rowCount == 0){
              res.send({error:"invalid login"})
            }else{
                delete data.rows[0].password
                const info = data.rows[0]
                const networks = []
                conn.query("select n.name from Networks as n, Users as u, User_Network as un where u.id = un.user_id and un.network_id = n.id and u.id = ?", [info.id], function(err, data2){
                    if(err){
                        console.log(err);
                        res.send({error:err})
                    }else{
                        console.log("ROWS ARE")
                        console.log(data2.rows)
                        Object.keys(data2.rows).forEach(function(key) {
                            /*var row = data[key];
                            networks.push(row.name)*/
                            console.log("key " + data2.rows[key].name)
                            networks.push(data2.rows[key].name)
                        })
                        info.networds = networks
                        console.log("INFO")
                        console.log(info)
                        res.send(info)
                    }

                })
              conn.end();


            }


        }
    })


});


function ValidateEmail(email)
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
        return (true)
    }
    return (false)
}

app.post('/api/signup', (req, res) => {
    if(!ValidateEmail(req.body.email)){
        const to_return = {error:"You have entered an invalid email address!"}
        res.send(to_return)
    }else{
        const conn = db.createConnection('sqlite3://formally-lawyer.db');


        const insert = "insert into Users(email, first_name, last_name, password) values (?,?,?,?)";

        conn.query(insert, [req.body.email, req.body.first_name, req.body.last_name, req.body.password],function (error, data) {

            if(error){
                const to_return = {error:error}
                res.send(to_return)
            }else{
                delete req.body["password"];
                res.send(req.body);

            }

        });
        conn.end()
    }



});

app.listen(port, () => console.log(`Listening on port ${port}`));