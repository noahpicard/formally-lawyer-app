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
//create_fake_data();
insert_forms()


function dict_to_list(dict){
    let ead_to_send = {}
    let i = 0
    for (let key in dict) {
        ead_to_send[i] = [key, dict[key]];
        i += 1
    }
    return ead_to_send
}

function insert_forms(){
    const ead = {"INTRO":"String","First Name":"String","Middle Name":"String",
        "Last Name":"String","Other Names":["True", "False"],"NUM_OTHER_NAME":"Integer",
        "Other Names":[["fname1","mname1","lname1"],["fname2","mname2","lname2"]],"Birth Date":"Date",
        "GENDER":["Male", "Female","Other"],"Martial Status":["Single", "Married", "Divorced","Widowed"],"BIRTH_CITY":"String",
        "Birth State":"String","Birth Country":"String","Reason For Applying":["Initial permission to accept employment.", "Replacement of lost, stolen, or damaged employment authorization document, or correction of my employment authorization document NOT DUE to U.S. Citizenship and Immigration Services (USCIS) error. NOTE: Replacement (correction) of an employment authorization document due to USCIS error does not require a new Form I-765 and filing fee. Refer to Replacement for Card Error in the What is the Filing Fee section of the Form I-765 Instructions for further details.", "Renewal of my permission to accept employment. (Attach a copy of your previous employment authorization document.)"],
        "Day Phone":"String","Mobile Phone":"String","Email":"String",
        "Mail Address Street":"String","Mail Address Type":"String",
        "Mail Address Apartment number":"Integer","Mail Address City":"String","Mail Address State Abbreviation":"String",
        "Mail Address Zip":"String","SAME_MAIL_ADDRESS_EAD":["True", "False"],"Alien Registration Number":"String",
        "USCIS Account Number":"Integer","I_765 Previous Application":["True", "False"],"SSA ISSUED":["True", "False"],"US SSN":"Integer",
        "Do you want the SSA to issue you a Social Security card? (You must also answer “Yes” to Item Number 15., Consent for Disclosure, to receive a card.)":["True", "False"],"NUMBER COUNTRY CITIZEN":"Integer","CURRENT COUNTRY NATIONALITY":"String","SALV GUAT NATIONAL":["True", "False"],
        "I_94 NUMBER":"Integer","TRAVEL_DOC_OR_PASSPORT":["Travel Document", "Passport"],"PASSPORT_NUMBER":"Integer","TRAVEL_DOC_EXPIRE_DATE":"Date",
        "TRAVEL_DOC_ORIGIN":"String","FIRST_MOST_RECENT_US_ENTRY_DATE":"Date","FIRST_MOST_RECENT_US_ENTRY_PLACE":"String",
        "FIRST_MOST_RECENT_US_ENTRY_STATUS":"String","CURRENT_IMMIGRATION_STATUS":"String","ELIGIBILITY_CATEGORY":"String",
        "ELIGIBILITY_CAT_DEPENDENT":["True", "False"],"SPOUSE_H1_B_RECEIPT_NUMBER":"String",
        "ENGLISH_UNDERSTAND":["True", "False"],"USED_PREPARER":["True", "False"]};
    const client_example = {"INTRO":"","FIRST_NAME":"Noah","MIDDLE_NAME":"Alexander","LAST_NAME":"Picard","NUM_OTHER_NAME":"2","Other Names":[["fname1","mname1","lname1"],["fname2","mname2","lname2"]],"BIRTH_DATE":"12/32/3423","GENDER":"Male","MARITAL_STATUS":"Widowed","BIRTH_CITY":"San Francisco","BIRTH_STATE":"California","BIRTH_COUNTRY":"USA","REASON_FOR_APP":"Initial Permission","DAY_PHONE":"2116238673","MOBILE_PHONE":"2727838673","EMAIL":"noah@formally.us","MAIL_ADDRESS_STREET":"12 Persimmon Street","MAIL_ADDRESS_TYPE":"Apartment","MAIL_ADDRESS_APT_NUMBER":"4","MAIL_ADDRESS_CITY":"Chicago","MAIL_ADDRESS_STATE_ABBV":"IL","MAIL_ADDRESS_ZIP":"60415","SAME_MAIL_ADDRESS_EAD":true,"ALIEN_REGISTRATION_NUMBER":"213-323-121","USCIS_ACCOUNT_NUMBER":"123456789","I_765_PREVIOUS_APP":true,"SSA_ISSUED":true,"US_SSN":"123-23-2131","WANT_US_SSN":false,"NUMBER_COUNTRY_CITIZEN":"1","CURRENT_COUNTRY_NATIONALITY":"USA","SALV_GUAT_NATIONAL":false,"I_94_NUMBER":"0123456789","TRAVEL_DOC_OR_PASSPORT":"Passport","PASSPORT_NUMBER":"0123456789","TRAVEL_DOC_EXPIRE_DATE":"12/32/2312","TRAVEL_DOC_ORIGIN":"America","FIRST_MOST_RECENT_US_ENTRY_DATE":"12/23/2231","FIRST_MOST_RECENT_US_ENTRY_PLACE":"Chicago, Illinois","FIRST_MOST_RECENT_US_ENTRY_STATUS":"Refugee","CURRENT_IMMIGRATION_STATUS":"F-1 student","ELIGIBILITY_CAT":"Spouse or Child of someone else","ELIGIBILITY_CAT_DEPENDENT":"Are you the spouse of an H-1B visa holder:  (c)(26)","SPOUSE_H1_B_RECEIPT_NUMBER":"EAC-19-231-51244","ENGLISH_UNDERSTAND":true,"USED_PREPARER":false}

    ead_to_send = JSON.stringify(dict_to_list(ead));

    const conn = db.createConnection('sqlite3://formally-lawyer.db');
    conn.query("insert into Form_types(form_json) values(?)", [ead_to_send], function(error, data){
        if(error){
            console.log(error);
        }
    });

    conn.end()


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
<<<<<<< HEAD

=======
>>>>>>> 6daa8f69f32de97705ef968bf82ebdccd0d54b92
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
                                info.networks = networks
                                info.clients = data3.rows

                                console.log("INFO")
                                console.log(info)
                                res.send(info)
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