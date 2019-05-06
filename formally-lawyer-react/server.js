const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
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
//create_fake_data();
const saltRounds = 10;

function encrypt(password){

    bcrypt
        .hash(password, saltRounds)
        .then(hashedPassword => {
            console.log("hash", hashedPassword);
            return hashedPassword; // notice that all of these methods are asynchronous!
        })
}

const password = "secret";

/*bcrypt
    .hash(password, saltRounds)
    .then(hashedPassword => {
        console.log("hash", hashedPassword);
        return hashedPassword; // notice that all of these methods are asynchronous!
    })
    .then(hash => {
        //console.log()
        return bcrypt.compare(password, hash); // what does this method return?
    })
    .then(res => {
        console.log("match", res);
    });*/

function dict_to_list(dict){
    let form_to_send = {}
    let i = 0
    for (let key in dict) {
        if(dict[key] !== "String"){
            form_to_send[i] = [key, "options", dict[key]];
        }else{
            form_to_send[i] = [key, dict[key]];
        }
        i += 1
    }
    return form_to_send
}

function generateForm(form_type){
    function get_answer(quest_ans){
        let curr_ans = [quest_ans[0]]
        if(quest_ans[1] === "String"){
            curr_ans.push("blop");
        }else if (quest_ans[1] === "options"){
            const random_answer = quest_ans[2][Math.floor(Math.random() * quest_ans[2].length)];
            curr_ans.push(random_answer);
        }
        return curr_ans
    }
    let form_to_send = {}

    for (let key in form_type) {
        const question_ans = form_type[key]
        form_to_send[key] = get_answer(question_ans);

    }
    return form_to_send
}


function insert_forms(){
    console.log("INSERT FORMS")
    const ead = {"INTRO":"String","First Name":"String","Middle Name":"String",
        "Last Name":"String","Other Names":["True", "False"],"NUM_OTHER_NAME":"String",
        "Other Names":[["fname1","mname1","lname1"],["fname2","mname2","lname2"]],"Birth Date":"String",
        "GENDER":["Male", "Female","Other"],"Martial Status":["Single", "Married", "Divorced","Widowed"],"BIRTH_CITY":"String",
        "Birth State":"String","Birth Country":"String","Reason For Applying":["Initial permission to accept employment.", "Replacement of lost, stolen, or damaged employment authorization document, or correction of my employment authorization document NOT DUE to U.S. Citizenship and Immigration Services (USCIS) error. NOTE: Replacement (correction) of an employment authorization document due to USCIS error does not require a new Form I-765 and filing fee. Refer to Replacement for Card Error in the What is the Filing Fee section of the Form I-765 Instructions for further details.", "Renewal of my permission to accept employment. (Attach a copy of your previous employment authorization document.)"],
        "Day Phone":"String","Mobile Phone":"String","Email":"String",
        "Mail Address Street":"String","Mail Address Type":"String",
        "Mail Address Apartment number":"String","Mail Address City":"String","Mail Address State Abbreviation":"String",
        "Mail Address Zip":"String","SAME_MAIL_ADDRESS_EAD":["True", "False"],"Alien Registration Number":"String",
        "USCIS Account Number":"String","I_765 Previous Application":["True", "False"],"SSA ISSUED":["True", "False"],"US SSN":"String",
        "Do you want the SSA to issue you a Social Security card? (You must also answer “Yes” to Item Number 15., Consent for Disclosure, to receive a card.)":["True", "False"],"NUMBER COUNTRY CITIZEN":"String","CURRENT COUNTRY NATIONALITY":"String","SALV GUAT NATIONAL":["True", "False"],
        "I_94 NUMBER":"String","TRAVEL_DOC_OR_PASSPORT":["Travel Document", "Passport"],"PASSPORT_NUMBER":"String","TRAVEL_DOC_EXPIRE_DATE":"String",
        "TRAVEL_DOC_ORIGIN":"String","FIRST_MOST_RECENT_US_ENTRY_DATE":"String","FIRST_MOST_RECENT_US_ENTRY_PLACE":"String",
        "FIRST_MOST_RECENT_US_ENTRY_STATUS":"String","CURRENT_IMMIGRATION_STATUS":"String","ELIGIBILITY_CATEGORY":"String",
        "ELIGIBILITY_CAT_DEPENDENT":["True", "False"],"SPOUSE_H1_B_RECEIPT_NUMBER":"String",
        "ENGLISH_UNDERSTAND":["True", "False"],"USED_PREPARER":["True", "False"]};


    ead_to_send = JSON.stringify(dict_to_list(ead));
    const conn = db.createConnection('sqlite3://formally-lawyer.db');
    conn.query("insert into Form_types(form_json) values(?)", [ead_to_send], function(error, data){
        if(error){
            console.log(error);
            conn.end()

        }else{
            const type_example = generateForm(dict_to_list(ead))
            conn.query("select id from Clients", function(error, data){
                if(error){
                    conn.end()
                }else{
                    console.log("IDS")
                    for (let key in data.rows) {
                        conn.query("insert into Forms(client_id, form_type_id,name, info_json) values(?,?,?,?)", [key, 1,"EAD",JSON.stringify(type_example)], function(error, data){
                            if(error){
                                console.log("EROR2")

                                console.log(error);

                            }else{
                                console.log("SUCCESS")
                            }

                        });
                    }

                    }

            });

        }





    });



}


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
  const number_users = 5;
  for (let i = 1; i < number_users; i++) {
    let user = users[i];
    conn.query(insert, [user.email, user.first_name, user.last_name, user.password],function (error, data) {
      if(error){
        console.log(error);
      }else{

        let foreign = data.lastInsertId;
        let addClient = "insert into Clients (dob,email, first_name, last_name, password," +
        " immigration_status, address, arn, nationality, user_id) values (?,?,?,?,?,?,?,?,?,?)";
        const number_of_clients = 10;
        for (let j = 0; j < number_of_clients; j++) {
            let curClient = clients[i * 25 + j]
          conn.query(addClient, ["2000/01/01",curClient.email, curClient.first_name,
            curClient.last_name, curClient.password, curClient.immigration_status,
            curClient.address, curClient.arn, curClient.nationality, foreign],function (error, data) {
            if(error){
              console.log(error);
            }else{
              console.log(data);
            }
              if (number_of_clients === j+1 && number_users === i+1){
                  insert_forms();
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
    dob	DATE NOT NULL,\
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
    name TEXT NOT NULL,\
    client_id	INTEGER NOT NULL,\
    form_type_id INTEGER NOT NULL,\
    info_json	TEXT NOT NULL,\
    reviewed	BOOLEAN DEFAULT FALSE,\
    FOREIGN KEY (client_id) REFERENCES Clients(id),\
    FOREIGN KEY (form_type_id) REFERENCES Form_types(id))")
    conn.end();
}


app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});


app.post('/api/get_client', (req, res) => {
    conn.query("select * from Clients where user_id = ?", [req.body.id], function(error, data){
        if(error){
            console.log("INNER")
            console.log(er)

        }else{
            const clients = data.rows


            res.send(clients)
        }

        conn.end();

    })
});



app.post('/api/forms/json', (req, res) => {
    const id = req.body.id
    //console.log("encrypted = " + encrypt(req.body.id));
    const conn = db.createConnection('sqlite3://formally-lawyer.db');
    conn.query("select info_json from Forms where client_id = ?", [id], function(error, result){
        if(error){
            console.log(error)
        }else{
            const forms = []
            for (let key in result.rows) {
                forms.push(result.rows[key].info_json)

            }
            res.send({forms: forms})

        }
        conn.end()

    });

});

app.post('/api/forms/display', (req, res) => {
    console.log("CALLED")
    const id = req.body.id
    //console.log("encrypted = " + encrypt(req.body.id));
    const conn = db.createConnection('sqlite3://formally-lawyer.db');
    conn.query("select f.name, f.info_json as question_answer, ft.form_json as question_type from forms as f, Form_types as ft where ft.id = f.form_type_id and f.id = ?", [id], function(error, result){
        if(error){
            console.log(error)
        }else{
            console.log("AYO")
            if(result.rows.length !== 1){
                console.log("ERROR: more than once form was returned")
            }
            res.send(result.rows[0])

        }
        conn.end()

    });

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
                        conn.end();

                    }else{
                        console.log("ROWS ARE")
                        console.log(data2.rows)
                        Object.keys(data2.rows).forEach(function(key) {
                            networks.push(data2.rows[key].name)
                        })
                        conn.query("select * from Clients where user_id = ?", [info.id], function(er, data3){
                            if(er){
                                console.log("INNER")
                                console.log(er)

                            }else{
                                //conn.query("select id, name, reviewed from Forms where client_id = ?", [])
                                info.networks = networks
                                let curr_clients = data3.rows
                                for (let key = 0; key < curr_clients.length; key++) {

                                    conn.query("select id, name, reviewed from Forms where client_id = ?", [curr_clients[key].id],function(error,data){
                                        if(error){
                                            console.log("ERROR GETTING FORMS");
                                            console.log(error);
                                        }else{
                                            const forms = []
                                            for(let k in data.rows){
                                                forms.push(data.rows[k]);
                                            }
                                            curr_clients[key].forms = forms
                                            if (key === curr_clients.length-1){
                                                info.clients = curr_clients
                                                res.send(info)


                                            }
                                        }

                                    });
                                    //console.log("CLIENT ",curr_clients[key])
                                }

                                //console.log("INFO")
                                //console.log(info)
                            }

                            conn.end();

                        })

                    }

                })


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