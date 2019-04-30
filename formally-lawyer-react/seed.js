
const firstNames = ["Bob", "Robert", "Robin", "Gokul", "Mike", "Akhil", "Aaron", "Becket", "Richard", "Drew", "Andrew", "Troy",
"Juan", "Carlos", "Luis", "Riccardo", "Lizbeth"];
const lastNames = ["Edwards", "Roberts", "Smith", "Treyhill", "Nottingham", "Terrance", "Eddingburg", "Thomas", "Rickett"];
const networks = ["South West Lawyers Association", "Lawyers Against Trump", "International Lawyer Association"];
const emailProv = ["gmail", "aol", "yahoo"];
const imStatus = ["United States Citizen", "Lawful Permanent Resident", "Temporary Visitor", "Undocumented Immigrant"];
const nations = ["Mexican", "Canadian", "Spanish", "South African", "Brazilian"];

const addy = ["23rd W 57th St. Yuma, AZ 85364", "Brown University Providence, RI 02912", "East Town Center Boston, MA 03293"];

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


function createUser() {
  let first_name = getRandomIndex(firstNames);
  let last_name = getRandomIndex(lastNames);
  let prov = getRandomIndex(emailProv);

  let password = "1";

  let email = first + "." + last + "@" + prov + ".com";

  return {first_name, last_name, email, password};
}

function createClient() {
  let first_name = getRandomIndex(firstNames);
  let last_name = getRandomIndex(lastNames);
  let prov = getRandomIndex(emailProv);

  let password = "1";

  let email = first + "." + last + "@" + prov + ".com";
  let immigration_status = getRandomIndex(imStatus);
  let arn = makeId();
  let nationality = getRandomIndex(nations);
  let address = getRandomIndex(addy);

}