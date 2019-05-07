const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const app = express()
const port = process.env.PORT || 5000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// fake data
const firstNames = ['Bob', 'Robert', 'Robin', 'Gokul', 'Mike', 'Akhil', 'Aaron', 'Becket', 'Richard', 'Drew', 'Andrew', 'Troy',
  'Juan', 'Carlos', 'Luis', 'Riccardo', 'Lizbeth']
const lastNames = ['Edwards', 'Roberts', 'Smith', 'Treyhill', 'Nottingham', 'Terrance', 'Eddingburg', 'Thomas', 'Rickett']
const networks = ['South West Lawyers Association', 'Lawyers Against Trump', 'International Lawyer Association']
const emailProv = ['gmail', 'aol', 'yahoo']
const imStatus = ['United States Citizen', 'Lawful Permanent Resident', 'Temporary Visitor', 'Undocumented Immigrant']
const nations = ['Mexican', 'Canadian', 'Spanish', 'South African', 'Brazilian']

const addy = ['23rd W 57th St. Yuma, AZ 85364', 'Brown University Providence, RI 02912', 'East Town Center Boston, MA 03293']
const streets = ['South Main 82', 'West 16th St.', 'DownTown', 'Jarls Street']
const cities = ['Yuma', 'Providence', 'Boston', 'Pheonix', 'Tucson', 'El Paso', 'San Diego', 'New York City', 'Austin']
const states = ['AZ', 'RI', 'MA', 'AZ', 'AZ', 'NM', 'CA', 'NY', 'TX']
const zips = ['02912', '84736', '91830', '29382', '92830', '19283']
// db to store messages and rooms
const db = require('any-db')
create_tables()
const saltRounds = 10

create_fake_data()


function capitlize_first(string)
{
    //console.log("getting" + string + " and returning " + string.charAt(0).toUpperCase() + string.slice(1).toLowerCase())
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function getDate() {
  let year = 2000 - Math.floor(Math.random() * 50)
  let day = Math.floor(Math.random() * 31)
  let month = Math.floor(Math.random() * 12)
  return day.toString() + "/" + month.toString() + "/" + year.toString();
}

function dict_to_list (dict) {
  let form_to_send = {}
  let i = 0
  for (let key in dict) {
    let fixed_key = key
    const words = key.split('_')
    if (words.length > 1) {
      //for(let word in words)
        const new_words = []
        for(let word in words){
          new_words.push(capitlize_first(words[word]))
        }
      fixed_key = new_words.join(' ')

    }else{
        fixed_key = capitlize_first(fixed_key)
    }
    if (dict[key] !== 'String' && key !== 'Other Names') {
      form_to_send[i] = [fixed_key, 'options', dict[key]]
    } else if (key === 'Other Names') {
      form_to_send[i] = [fixed_key, dict[key]]

    } else {
      form_to_send[i] = [fixed_key, dict[key]]
    }
    i += 1
  }
  return form_to_send
}


function generateForm (form_type) {
  function get_answer (quest_ans) {
    let curr_ans = [quest_ans[0]]
    if (quest_ans[0] === 'Other Names Used') {
      curr_ans.push('True')

    } else if (quest_ans[0] === 'Other Names') {
      curr_ans.push([['some first', 'some middle', 'some last name']])

    } else {
      if (quest_ans[1] === 'String') {
        let question = quest_ans[0].toLowerCase()
        if (question.includes("name")) {
          if (question.includes("first")) {
            curr_ans.push(getRandomIndex(firstNames))
          } else if (question.includes("last")) {
            curr_ans.push(getRandomIndex(lastNames))
          } else {
            curr_ans.push(getRandomIndex(firstNames))
          }
        } else if (question.includes("street")) {
          curr_ans.push(getRandomIndex(streets))
        }
        else if (question.includes("city")) {
          curr_ans.push(getRandomIndex(cities))
        }
        else if (question.includes("state")) {
          curr_ans.push(getRandomIndex(states))
        }
        else if (question.includes("date")) {
          curr_ans.push(getDate())
        }
        else if (question.includes("address")) {
          curr_ans.push(getRandomIndex(addy))
        }
        else if (question.includes("zip")) {
          curr_ans.push(getRandomIndex(zips))
        }
        else if (question.includes("phone")) {
          curr_ans.push(getPhone())
        }
        else if (question.includes("email")) {
         let first = getRandomIndex(firstNames)
         let last = getRandomIndex(lastNames)
          let em = first+'.'+last+'@gmail.com'
          curr_ans.push(em)
        }
        else if (question.includes("ssn")) {
          curr_ans.push(makeId())
        }
        else if (question.includes("number")) {
          curr_ans.push((Math.floor(Math.random() * 1029383293829)).toString())
        }
        else {
          curr_ans.push('--------------')
        }
      } else if (quest_ans[1] === 'options') {
        const random_answer = quest_ans[2][Math.floor(Math.random() * quest_ans[2].length)]
        curr_ans.push(random_answer)
      }
    }

    return curr_ans
  }

  let form_to_send = {}

  for (let key in form_type) {
    const question_ans = form_type[key]
    form_to_send[key] = get_answer(question_ans)

  }
  return form_to_send
}

function getPhone() {
  let result1 = ''
  let result2 = ''
  let result3 = ''
  let characters = '0123456789'
  let charactersLength = characters.length
  for (let i = 0; i < 3; i++) {
    result1 += characters.charAt(Math.floor(Math.random() * charactersLength))
    result2 += characters.charAt(Math.floor(Math.random() * charactersLength))
    result3 += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  result3 += characters.charAt(Math.floor(Math.random() * charactersLength))
  return '('+result1+')'+result2+'-'+result3
}

function generateComments (form_type) {
  const comments = {}
  for (let key in form_type) {
    comments[key] = ''
  }
  return comments
}

function get_form (id) {
  const ead_type = {
    'INTRO': 'String',
    'First Name': 'String',
    'Middle Name': 'String',
    'Last Name': 'String',
    'Other Names Used': ['True', 'False'],
    'Birth Date': 'String',
    'GENDER': ['Male', 'Female', 'Other'],
    'Martial Status': ['Single', 'Married', 'Divorced', 'Widowed'],
    'BIRTH_CITY': 'String',
    'Birth State': 'String',
    'Birth Country': 'String',
    'Reason For Applying': ['Initial permission to accept employment.', 'Replacement of lost, stolen, or damaged employment authorization document, or correction of my employment authorization document NOT DUE to U.S. Citizenship and Immigration Services (USCIS) error. NOTE: Replacement (correction) of an employment authorization document due to USCIS error does not require a new Form I-765 and filing fee. Refer to Replacement for Card Error in the What is the Filing Fee section of the Form I-765 Instructions for further details.', 'Renewal of my permission to accept employment. (Attach a copy of your previous employment authorization document.)'],
    'Day Phone': 'String',
    'Mobile Phone': 'String',
    'Email': 'String',
    'Mail Address Street': 'String',
    'Mail Address Type': 'String',
    'Mail Address Apartment number': 'String',
    'Mail Address City': 'String',
    'Mail Address State Abbreviation': 'String',
    'Mail Address Zip': 'String',
    'SAME_MAIL_ADDRESS_EAD': ['True', 'False'],
    'Alien Registration Number': 'String',
    'USCIS Account Number': 'String',
    'I_765 Previous Application': ['True', 'False'],
    'SSA ISSUED': ['True', 'False'],
    'US SSN': 'String',
    'Do you want the SSA to issue you a Social Security card? (You must also answer “Yes” to Item Number 15., Consent for Disclosure, to receive a card.)': ['True', 'False'],
    'NUMBER COUNTRY CITIZEN': 'String',
    'CURRENT COUNTRY NATIONALITY': 'String',
    'SALV GUAT NATIONAL': ['True', 'False'],
    'I_94 NUMBER': 'String',
    'TRAVEL_DOC_OR_PASSPORT': ['Travel Document', 'Passport'],
    'PASSPORT_NUMBER': 'String',
    'TRAVEL_DOC_EXPIRE_DATE': 'String',
    'TRAVEL_DOC_ORIGIN': 'String',
    'FIRST_MOST_RECENT_US_ENTRY_DATE': 'String',
    'FIRST_MOST_RECENT_US_ENTRY_PLACE': 'String',
    'FIRST_MOST_RECENT_US_ENTRY_STATUS': 'String',
    'CURRENT_IMMIGRATION_STATUS': 'String',
    'ELIGIBILITY_CATEGORY': 'String',
    'ELIGIBILITY_CAT_DEPENDENT': ['True', 'False'],
    'SPOUSE_H1_B_RECEIPT_NUMBER': 'String',
    'ENGLISH_UNDERSTAND': ['True', 'False'],
    'USED_PREPARER': ['True', 'False']
  }
  const asylum_type = {
    'INTRO': 'String',
    'FIRST_NAME': 'String',
    'MIDDLE_NAME': 'String',
    'LAST_NAME': 'String',
    'Other Names Used': ['True', 'False'],
    'GENDER': ['Male', 'Female', 'Other'],
    'BIRTH_DATE': 'String',
    'BIRTH_CITY_COUNTRY': 'String',
    'BIRTH_NATIONALITY': 'String',
    'CURRENT_NATIONALITY': 'String',
    'US_SSN': 'String',
    'TRAVEL_DOC_OR_PASSPORT': ['Travel Document', 'Passport'],
    'PASSPORT_NUMBER': 'String',
    'TRAVEL_DOC_EXPIRE_DATE': 'String',
    'TRAVEL_DOC_ORIGIN': 'String',
    'ENGLISH_FLUENCY': ['True', 'False'],
    'IMMIGRATION_COURT_NOW': ['True', 'False'],
    'IMMIGRATION_COURT_EVER': ['True', 'False'],
    'RACE_ETHNIC_TRIBAL_GROUP': 'String',
    'RELIGIOUS_GROUP': 'String',
    'NATIVE_LANGUAGE': 'String',
    'DAY_PHONE': 'String',
    'OTHER_LANGUAGES_LIST': 'String',
    'FORM_FILLING_OTHER': ['True', 'False'],
    'RESIDENCE_US_STREET': 'String',
    'RESIDENCE_US_APT_NUMBER': 'String',
    'RESIDENCE_US_CITY': 'String',
    'RESIDENCE_US_STATE': 'String',
    'RESIDENCE_US_ZIP': 'String',
    'SAME_MAIL_ADDRESS_ASYLUM': ['True', 'False'],
    'ALIEN_REGISTRATION_NUMBER': 'String',
    'USCIS_ACCOUNT_NUMBER': 'String',
    'LAST_LEFT_COUNTRY': 'String',
    'US_ENTRY_NUMBER_OF_TIMES': 'String',
    'FIRST_MOST_RECENT_US_ENTRY_DATE': 'String',
    'FIRST_MOST_RECENT_US_ENTRY_PLACE': 'String',
    'FIRST_MOST_RECENT_US_ENTRY_STATUS': 'String',
    'MOST_RECENT_US_ENTRY_STATUS_EXPIRE': 'String',
    'MARITAL_STATUS': 'String',
    'HAS_CHILDREN': ['True', 'False'],
    'CHILDREN_NUMBER': 'String',
    'FIRST_CHILD_FIRST_NAME': 'String',
    'FIRST_CHILD_LAST_NAME': 'String',
    'FIRST_CHILD_MARITAL_STATUS': 'String',
    'FIRST_CHILD_US_SSN': 'String',
    'FIRST_CHILD_CURRENT_NATIONALITY': 'String',
    'FIRST_CHILD_BIRTH_DATE': 'String',
    'FIRST_CHILD_GENDER': 'String',
    'FIRST_CHILD_RACE_ETHNIC_TRIBAL_GROUP': 'String',
    'FIRST_CHILD_BIRTH_CITY_COUNTRY': 'String',
    'FIRST_CHILD_PASSPORT_ID_NUMBER': 'String',
    'SECOND_CHILD_FIRST_NAME': 'String',
    'SECOND_CHILD_MIDDLE_NAME': 'String',
    'SECOND_CHILD_LAST_NAME': 'String',
    'SECOND_CHILD_MARITAL_STATUS': ['Single', 'Married', 'Divorced', 'Widowed'],
    'SECOND_CHILD_CURRENT_NATIONALITY': 'String',
    'SECOND_CHILD_BIRTH_DATE': 'String',
    'SECOND_CHILD_GENDER': 'String',
    'SECOND_CHILD_RACE_ETHNIC_TRIBAL_GROUP': 'String',
    'SECOND_CHILD_BIRTH_CITY_COUNTRY': 'String',
    'SECOND_CHILD_ALIEN_REGISTRATION_NUMBER': 'String',
    'SECOND_CHILD_PASSPORT_ID_NUMBER': 'String',
    'FIRST_CHILD_IN_US': ['True', 'False'],
    'FIRST_CHILD_LOCATION_OUTSIDE_US': 'String',
    'SECOND_CHILD_IN_US': ['True', 'False'],
    'FIRST_CHILD_MOST_RECENT_US_ENTRY_VISA_STATUS': 'String',
    'FIRST_CHILD_CURRENT_VISA_STATUS': 'String',
    'FIRST_CHILD_VISA_STATUS_EXPIRATION': 'String',
    'FIRST_CHILD_COURT_NOW': ['True', 'False'],
    'FIRST_CHILD_APP_INCLUSION': ['True', 'False'],
    'SECOND_CHILD_MOST_RECENT_US_ENTRY_VISA_STATUS': 'String',
    'SECOND_CHILD_CURRENT_VISA_STATUS': 'String',
    'SECOND_CHILD_COURT_NOW': ['True', 'False'],
    'SECOND_CHILD_APP_INCLUSION': ['True', 'False'],
    'BEFORE_US_RESIDENCE_STREET': 'String',
    'BEFORE_US_RESIDENCE_CITY': 'String',
    'BEFORE_US_RESIDENCE_STATE': 'String',
    'BEFORE_US_RESIDENCE_COUNTRY': 'String',
    'BEFORE_US_RESIDENCE_FROM': 'String',
    'BEFORE_US_RESIDENCE_TO': 'String',
    'RESIDENCE_BEFORE_US_IN_COUNTRY_OF_PERSECUTION': ['True', 'False'],
    'PERSECUTION_BEFORE_US_RESIDENCE_STREET': 'String',
    'PERSECUTION_BEFORE_US_RESIDENCE_CITY': 'String',
    'PERSECUTION_BEFORE_US_RESIDENCE_COUNTRY': 'String',
    'PERSECUTION_BEFORE_US_RESIDENCE_FROM': 'String',
    'PERSECUTION_BEFORE_US_RESIDENCE_TO': 'String',
    'RESIDENCES_OVER_PAST_FIVE_YEARS_NUMBER': 'String',
    'FIRST_RESIDENCE_STREET': 'String',
    'FIRST_RESIDENCE_CITY': 'String',
    'FIRST_RESIDENCE_STATE': 'String',
    'FIRST_RESIDENCE_COUNTRY': 'String',
    'FIRST_RESIDENCE_FROM': 'String',
    'FIRST_RESIDENCE_TO': 'String',
    'SECOND_RESIDENCE_STREET': 'String',
    'SECOND_RESIDENCE_CITY': 'String',
    'SECOND_RESIDENCE_STATE': 'String',
    'SECOND_RESIDENCE_COUNTRY': 'String',
    'SECOND_RESIDENCE_FROM': 'String',
    'SECOND_RESIDENCE_TO': 'String',
    'PRESENT_RESIDENCE_FROM': 'String',
    'EDUCATION_NUMBER_OF_SCHOOLS': 'String',
    'FIRST_EDUCATION_SCHOOL': 'String',
    'FIRST_EDUCATION_TYPE': 'String',
    'FIRST_EDUCATION_ADDRESS': 'String',
    'FIRST_EDUCATION_FROM': 'String',
    'FIRST_EDUCATION_TO': 'String',
    'SECOND_EDUCATION_SCHOOL': 'String',
    'SECOND_EDUCATION_TYPE': 'String',
    'SECOND_EDUCATION_ADDRESS': 'String',
    'SECOND_EDUCATION_FROM': 'String',
    'SECOND_EDUCATION_TO': 'String',
    'EMPLOYMENT_OVER_PAST_FIVE_YEARS_NUMBER': 'String',
    'FIRST_EMPLOYMENT_NAME': 'String',
    'FIRST_EMPLOYMENT_OCC': 'String',
    'FIRST_EMPLOYMENT_FROM': 'String',
    'FIRST_EMPLOYMENT_TO': 'String',
    'MOTHER_FULL_NAME': 'String',
    'MOTHER_BIRTH_CITY_COUNTRY': 'String',
    'MOTHER_DECEASED': ['True', 'False'],
    'FATHER_FULL_NAME': 'String',
    'FATHER_BIRTH_CITY_COUNTRY': 'String',
    'FATHER_DECEASED': ['True', 'False'],
    'FATHER_CURRENT_CITY_COUNTRY': 'String',
    'SIBLING_NUMBER': 'String',
    'FIRST_SIBLING_FULL_NAME': 'String',
    'FIRST_SIBLING_BIRTH_CITY_COUNTRY': 'String',
    'FIRST_SIBLING_DECEASED': ['True', 'False'],
    'SECOND_SIBLING_FULL_NAME': 'String',
    'SECOND_SIBLING_BIRTH_CITY_COUNTRY': 'String',
    'SECOND_SIBLING_DECEASED': ['True', 'False'],
    'SECOND_SIBLING_CURRENT_CITY_COUNTRY': 'String',
    'I_589_REASON_FOR_APP_RACE': ['True', 'False'],
    'I_589_REASON_FOR_APP_RELIGION': ['True', 'False'],
    'I_589_REASON_FOR_APP_SOCIAL_GROUP': ['True', 'False'],
    'I_589_REASON_FOR_APP_TORTURE_CONVENTION': ['True', 'False'],
    'REASON_EXPERIENCED_MISTREATMENT_THREATS': ['True', 'False'],
    'REASON_EXPERIENCED_MISTREATMENT_THREATS_DETAILS': 'String',
    'REASON_FEAR_MISTREATMENT_THREATS': ['True', 'False'],
    'REASON_FEAR_MISTREATMENT_THREATS_DETAILS': 'String',
    'REASON_IMPRISONED_OUTSIDE_US': ['True', 'False'],
    'REASON_HOME_COUNTRY_ORGANIZATIONS': ['True', 'False'],
    'REASON_HOME_COUNTRY_ORGANIZATIONS_CURRENT': ['True', 'False'],
    'REASON_FEAR_TORTURE': ['True', 'False'],
    'PREVIOUS_REFUGEE_ASYLUM_APPS': ['True', 'False'],
    'PREVIOUS_TRAVEL_OUTSIDE_US': ['True', 'False'],
    'OTHER_COUNTRIES_STATUS': ['True', 'False'],
    'PARTICIPATED_IN_HARM': ['True', 'False'],
    'RETURNED_COUNTRY_PERSECUTION_AFTER_EXIT': ['True', 'False'],
    'APP_ONE_YEAR_AFTER_ARRIVAL': ['True', 'False'],
    'FAMILY_ARRESTED_CRIME_IN_US': ['True', 'False'],
    'FAMILY_ARRESTED_CRIME_IN_US_DETAILS': 'String',
    'FAMILY_APP_ASSISTANT': ['True', 'False'],
    'OTHER_PREPARER': ['True', 'False'],
    'I_589_PROVIDED_COUNSEL_LIST': ['True', 'False']
  }

  if (id === 1) {
    return dict_to_list(ead_type)
  } else {
    return dict_to_list(asylum_type)

  }

}

function insert_form_types () {
  const ead_type = {
    'INTRO': 'String',
    'First Name': 'String',
    'Middle Name': 'String',
    'Last Name': 'String',
    'Other Names Used': ['True', 'False'],
    'Birth Date': 'String',
    'GENDER': ['Male', 'Female', 'Other'],
    'Martial Status': ['Single', 'Married', 'Divorced', 'Widowed'],
    'BIRTH_CITY': 'String',
    'Birth State': 'String',
    'Birth Country': 'String',
    'Reason For Applying': ['Initial permission to accept employment.', 'Replacement of lost, stolen, or damaged employment authorization document, or correction of my employment authorization document NOT DUE to U.S. Citizenship and Immigration Services (USCIS) error. NOTE: Replacement (correction) of an employment authorization document due to USCIS error does not require a new Form I-765 and filing fee. Refer to Replacement for Card Error in the What is the Filing Fee section of the Form I-765 Instructions for further details.', 'Renewal of my permission to accept employment. (Attach a copy of your previous employment authorization document.)'],
    'Day Phone': 'String',
    'Mobile Phone': 'String',
    'Email': 'String',
    'Mail Address Street': 'String',
    'Mail Address Type': 'String',
    'Mail Address Apartment number': 'String',
    'Mail Address City': 'String',
    'Mail Address State Abbreviation': 'String',
    'Mail Address Zip': 'String',
    'SAME_MAIL_ADDRESS_EAD': ['True', 'False'],
    'Alien Registration Number': 'String',
    'USCIS Account Number': 'String',
    'I_765 Previous Application': ['True', 'False'],
    'SSA ISSUED': ['True', 'False'],
    'US SSN': 'String',
    'Do you want the SSA to issue you a Social Security card? (You must also answer “Yes” to Item Number 15., Consent for Disclosure, to receive a card.)': ['True', 'False'],
    'NUMBER COUNTRY CITIZEN': 'String',
    'CURRENT COUNTRY NATIONALITY': 'String',
    'SALV GUAT NATIONAL': ['True', 'False'],
    'I_94 NUMBER': 'String',
    'TRAVEL_DOC_OR_PASSPORT': ['Travel Document', 'Passport'],
    'PASSPORT_NUMBER': 'String',
    'TRAVEL_DOC_EXPIRE_DATE': 'String',
    'TRAVEL_DOC_ORIGIN': 'String',
    'FIRST_MOST_RECENT_US_ENTRY_DATE': 'String',
    'FIRST_MOST_RECENT_US_ENTRY_PLACE': 'String',
    'FIRST_MOST_RECENT_US_ENTRY_STATUS': 'String',
    'CURRENT_IMMIGRATION_STATUS': 'String',
    'ELIGIBILITY_CATEGORY': 'String',
    'ELIGIBILITY_CAT_DEPENDENT': ['True', 'False'],
    'SPOUSE_H1_B_RECEIPT_NUMBER': 'String',
    'ENGLISH_UNDERSTAND': ['True', 'False'],
    'USED_PREPARER': ['True', 'False']
  }
  const asylum_type = {
    'INTRO': 'String',
    'FIRST_NAME': 'String',
    'MIDDLE_NAME': 'String',
    'LAST_NAME': 'String',
    'Other Names Used': ['True', 'False'],
    'GENDER': ['Male', 'Female', 'Other'],
    'BIRTH_DATE': 'String',
    'BIRTH_CITY_COUNTRY': 'String',
    'BIRTH_NATIONALITY': 'String',
    'CURRENT_NATIONALITY': 'String',
    'US_SSN': 'String',
    'TRAVEL_DOC_OR_PASSPORT': ['Travel Document', 'Passport'],
    'PASSPORT_NUMBER': 'String',
    'TRAVEL_DOC_EXPIRE_DATE': 'String',
    'TRAVEL_DOC_ORIGIN': 'String',
    'ENGLISH_FLUENCY': ['True', 'False'],
    'IMMIGRATION_COURT_NOW': ['True', 'False'],
    'IMMIGRATION_COURT_EVER': ['True', 'False'],
    'RACE_ETHNIC_TRIBAL_GROUP': 'String',
    'RELIGIOUS_GROUP': 'String',
    'NATIVE_LANGUAGE': 'String',
    'DAY_PHONE': 'String',
    'OTHER_LANGUAGES_LIST': 'String',
    'FORM_FILLING_OTHER': ['True', 'False'],
    'RESIDENCE_US_STREET': 'String',
    'RESIDENCE_US_APT_NUMBER': 'String',
    'RESIDENCE_US_CITY': 'String',
    'RESIDENCE_US_STATE': 'String',
    'RESIDENCE_US_ZIP': 'String',
    'SAME_MAIL_ADDRESS_ASYLUM': ['True', 'False'],
    'ALIEN_REGISTRATION_NUMBER': 'String',
    'USCIS_ACCOUNT_NUMBER': 'String',
    'LAST_LEFT_COUNTRY': 'String',
    'US_ENTRY_NUMBER_OF_TIMES': 'String',
    'FIRST_MOST_RECENT_US_ENTRY_DATE': 'String',
    'FIRST_MOST_RECENT_US_ENTRY_PLACE': 'String',
    'FIRST_MOST_RECENT_US_ENTRY_STATUS': 'String',
    'MOST_RECENT_US_ENTRY_STATUS_EXPIRE': 'String',
    'MARITAL_STATUS': 'String',
    'HAS_CHILDREN': ['True', 'False'],
    'CHILDREN_NUMBER': 'String',
    'FIRST_CHILD_FIRST_NAME': 'String',
    'FIRST_CHILD_LAST_NAME': 'String',
    'FIRST_CHILD_MARITAL_STATUS': 'String',
    'FIRST_CHILD_US_SSN': 'String',
    'FIRST_CHILD_CURRENT_NATIONALITY': 'String',
    'FIRST_CHILD_BIRTH_DATE': 'String',
    'FIRST_CHILD_GENDER': 'String',
    'FIRST_CHILD_RACE_ETHNIC_TRIBAL_GROUP': 'String',
    'FIRST_CHILD_BIRTH_CITY_COUNTRY': 'String',
    'FIRST_CHILD_PASSPORT_ID_NUMBER': 'String',
    'SECOND_CHILD_FIRST_NAME': 'String',
    'SECOND_CHILD_MIDDLE_NAME': 'String',
    'SECOND_CHILD_LAST_NAME': 'String',
    'SECOND_CHILD_MARITAL_STATUS': ['Single', 'Married', 'Divorced', 'Widowed'],
    'SECOND_CHILD_CURRENT_NATIONALITY': 'String',
    'SECOND_CHILD_BIRTH_DATE': 'String',
    'SECOND_CHILD_GENDER': 'String',
    'SECOND_CHILD_RACE_ETHNIC_TRIBAL_GROUP': 'String',
    'SECOND_CHILD_BIRTH_CITY_COUNTRY': 'String',
    'SECOND_CHILD_ALIEN_REGISTRATION_NUMBER': 'String',
    'SECOND_CHILD_PASSPORT_ID_NUMBER': 'String',
    'FIRST_CHILD_IN_US': ['True', 'False'],
    'FIRST_CHILD_LOCATION_OUTSIDE_US': 'String',
    'SECOND_CHILD_IN_US': ['True', 'False'],
    'FIRST_CHILD_MOST_RECENT_US_ENTRY_VISA_STATUS': 'String',
    'FIRST_CHILD_CURRENT_VISA_STATUS': 'String',
    'FIRST_CHILD_VISA_STATUS_EXPIRATION': 'String',
    'FIRST_CHILD_COURT_NOW': ['True', 'False'],
    'FIRST_CHILD_APP_INCLUSION': ['True', 'False'],
    'SECOND_CHILD_MOST_RECENT_US_ENTRY_VISA_STATUS': 'String',
    'SECOND_CHILD_CURRENT_VISA_STATUS': 'String',
    'SECOND_CHILD_COURT_NOW': ['True', 'False'],
    'SECOND_CHILD_APP_INCLUSION': ['True', 'False'],
    'BEFORE_US_RESIDENCE_STREET': 'String',
    'BEFORE_US_RESIDENCE_CITY': 'String',
    'BEFORE_US_RESIDENCE_STATE': 'String',
    'BEFORE_US_RESIDENCE_COUNTRY': 'String',
    'BEFORE_US_RESIDENCE_FROM': 'String',
    'BEFORE_US_RESIDENCE_TO': 'String',
    'RESIDENCE_BEFORE_US_IN_COUNTRY_OF_PERSECUTION': ['True', 'False'],
    'PERSECUTION_BEFORE_US_RESIDENCE_STREET': 'String',
    'PERSECUTION_BEFORE_US_RESIDENCE_CITY': 'String',
    'PERSECUTION_BEFORE_US_RESIDENCE_COUNTRY': 'String',
    'PERSECUTION_BEFORE_US_RESIDENCE_FROM': 'String',
    'PERSECUTION_BEFORE_US_RESIDENCE_TO': 'String',
    'RESIDENCES_OVER_PAST_FIVE_YEARS_NUMBER': 'String',
    'FIRST_RESIDENCE_STREET': 'String',
    'FIRST_RESIDENCE_CITY': 'String',
    'FIRST_RESIDENCE_STATE': 'String',
    'FIRST_RESIDENCE_COUNTRY': 'String',
    'FIRST_RESIDENCE_FROM': 'String',
    'FIRST_RESIDENCE_TO': 'String',
    'SECOND_RESIDENCE_STREET': 'String',
    'SECOND_RESIDENCE_CITY': 'String',
    'SECOND_RESIDENCE_STATE': 'String',
    'SECOND_RESIDENCE_COUNTRY': 'String',
    'SECOND_RESIDENCE_FROM': 'String',
    'SECOND_RESIDENCE_TO': 'String',
    'PRESENT_RESIDENCE_FROM': 'String',
    'EDUCATION_NUMBER_OF_SCHOOLS': 'String',
    'FIRST_EDUCATION_SCHOOL': 'String',
    'FIRST_EDUCATION_TYPE': 'String',
    'FIRST_EDUCATION_ADDRESS': 'String',
    'FIRST_EDUCATION_FROM': 'String',
    'FIRST_EDUCATION_TO': 'String',
    'SECOND_EDUCATION_SCHOOL': 'String',
    'SECOND_EDUCATION_TYPE': 'String',
    'SECOND_EDUCATION_ADDRESS': 'String',
    'SECOND_EDUCATION_FROM': 'String',
    'SECOND_EDUCATION_TO': 'String',
    'EMPLOYMENT_OVER_PAST_FIVE_YEARS_NUMBER': 'String',
    'FIRST_EMPLOYMENT_NAME': 'String',
    'FIRST_EMPLOYMENT_OCC': 'String',
    'FIRST_EMPLOYMENT_FROM': 'String',
    'FIRST_EMPLOYMENT_TO': 'String',
    'MOTHER_FULL_NAME': 'String',
    'MOTHER_BIRTH_CITY_COUNTRY': 'String',
    'MOTHER_DECEASED': ['True', 'False'],
    'FATHER_FULL_NAME': 'String',
    'FATHER_BIRTH_CITY_COUNTRY': 'String',
    'FATHER_DECEASED': ['True', 'False'],
    'FATHER_CURRENT_CITY_COUNTRY': 'String',
    'SIBLING_NUMBER': 'String',
    'FIRST_SIBLING_FULL_NAME': 'String',
    'FIRST_SIBLING_BIRTH_CITY_COUNTRY': 'String',
    'FIRST_SIBLING_DECEASED': ['True', 'False'],
    'SECOND_SIBLING_FULL_NAME': 'String',
    'SECOND_SIBLING_BIRTH_CITY_COUNTRY': 'String',
    'SECOND_SIBLING_DECEASED': ['True', 'False'],
    'SECOND_SIBLING_CURRENT_CITY_COUNTRY': 'String',
    'I_589_REASON_FOR_APP_RACE': ['True', 'False'],
    'I_589_REASON_FOR_APP_RELIGION': ['True', 'False'],
    'I_589_REASON_FOR_APP_SOCIAL_GROUP': ['True', 'False'],
    'I_589_REASON_FOR_APP_TORTURE_CONVENTION': ['True', 'False'],
    'REASON_EXPERIENCED_MISTREATMENT_THREATS': ['True', 'False'],
    'REASON_EXPERIENCED_MISTREATMENT_THREATS_DETAILS': 'String',
    'REASON_FEAR_MISTREATMENT_THREATS': ['True', 'False'],
    'REASON_FEAR_MISTREATMENT_THREATS_DETAILS': 'String',
    'REASON_IMPRISONED_OUTSIDE_US': ['True', 'False'],
    'REASON_HOME_COUNTRY_ORGANIZATIONS': ['True', 'False'],
    'REASON_HOME_COUNTRY_ORGANIZATIONS_CURRENT': ['True', 'False'],
    'REASON_FEAR_TORTURE': ['True', 'False'],
    'PREVIOUS_REFUGEE_ASYLUM_APPS': ['True', 'False'],
    'PREVIOUS_TRAVEL_OUTSIDE_US': ['True', 'False'],
    'OTHER_COUNTRIES_STATUS': ['True', 'False'],
    'PARTICIPATED_IN_HARM': ['True', 'False'],
    'RETURNED_COUNTRY_PERSECUTION_AFTER_EXIT': ['True', 'False'],
    'APP_ONE_YEAR_AFTER_ARRIVAL': ['True', 'False'],
    'FAMILY_ARRESTED_CRIME_IN_US': ['True', 'False'],
    'FAMILY_ARRESTED_CRIME_IN_US_DETAILS': 'String',
    'FAMILY_APP_ASSISTANT': ['True', 'False'],
    'OTHER_PREPARER': ['True', 'False'],
    'I_589_PROVIDED_COUNSEL_LIST': ['True', 'False']
  }
  const ead_type_to_send = JSON.stringify(dict_to_list(ead_type))
  const asylum_type_to_send = JSON.stringify(dict_to_list(asylum_type))

  const conn = db.createConnection('sqlite3://formally-lawyer.db')
  conn.query('insert into Form_types(full_name, name, form_json) values(?,?,?)', ['Employment Authorization Document', 'ead', ead_type_to_send], function (error, data) {
    if (error) {
      console.log('ERROR WITH FORM TTYPE')
      console.log(error)
    }
    conn.query('insert into Form_types(full_name, name, form_json) values(?,?,?)', ['Asylum', 'asy', asylum_type_to_send], function (error, data) {
      conn.end()

      insert_forms()
    })
  })

}

function insert_forms () {

  const conn = db.createConnection('sqlite3://formally-lawyer.db')

  conn.query('select id from Clients', function (error, data) {
    if (error) {
      conn.end()
    } else {
      console.log('IDS')
      for (let key in data.rows) {
        for (let form_type_id = 1; form_type_id < 3; form_type_id++) {
          const form_json = generateForm(get_form(form_type_id))
          const client_id = key
          const comments_json = generateComments(form_json)
          conn.query('insert into Forms(client_id, form_type_id, info_json, comments_json) values(?,?,?,?)', [client_id, form_type_id, JSON.stringify(form_json), JSON.stringify({})], function (error, data) {
            if (error) {
              console.log('EROR2')

              console.log(error)

            } else {
              console.log('SUCCESS' + key + " "  + data.rows.length -1 )
            }


          })
          if(key === data.rows.length -1 && form_type_id === 2){
            conn.end();
            console.log("INSERTING NETWORKS")
            insert_networks();
          }
        }

      }

    }

  })
}

function insert_all_forms () {
  insert_form_types()


}

function create_fake_data () {
  const conn = db.createConnection('sqlite3://formally-lawyer.db')

  let clientNames = []
  let userNames = []
  let users = []
  let clients = []
  for (let i = 0; i < 10; i++) {
    let curUser = createUser(userNames)
    users.push(curUser)
    userNames.push(curUser.first_name + curUser.last_name)
  }
  for (let j = 0; j < 250; j++) {
    let curClient = createClient(clientNames)
    clients.push(curClient)
    clientNames.push(curClient.first_name + curClient.last_name)
  }
  const insert = 'insert into Users(email, first_name, last_name, password) values (?,?,?,?)'
  const number_users = 5
  for (let i = 1; i < number_users; i++) {
    let user = users[i]
    bcrypt.hash(user.password, saltRounds).then(hashedPassword => {
      conn.query(insert, [user.email, user.first_name, user.last_name, hashedPassword], function (error, data) {
        if (error) {
          console.log(error)
        } else {

          let foreign = data.lastInsertId
          let addClient = 'insert into Clients (dob,email, first_name, last_name, password,' +
            ' immigration_status, address, arn, nationality, user_id) values (?,?,?,?,?,?,?,?,?,?)'
          const number_of_clients = 10
          for (let j = 0; j < number_of_clients; j++) {
            let curClient = clients[i * 25 + j]
            conn.query(addClient, [getDate(), curClient.email, curClient.first_name,
              curClient.last_name, curClient.password, curClient.immigration_status,
              curClient.address, curClient.arn, curClient.nationality, foreign], function (error, data) {
              if (error) {
                console.log(error)
              } else {
                console.log(data)
              }
              if (number_of_clients === j + 1 && number_users === i + 1) {
                insert_all_forms();
              }

            })

          }
        }

      })
    })

  }
}

function getRandomIndex (arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function makeId () {
  let result = ''
  let characters = '0123456789'
  let charactersLength = characters.length
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return 'A' + result
}


function createUser (used) {
  let first_name = getRandomIndex(firstNames)
  let last_name = getRandomIndex(lastNames)
  while (first_name + last_name in used) {
    first_name = getRandomIndex(firstNames)
    last_name = getRandomIndex(lastNames)
  }
  let prov = getRandomIndex(emailProv)

  let password = '1'

  let email = first_name + '.' + last_name + '@' + prov + '.com'

  return {email, first_name, last_name, password}
}

function createClient (used) {
  let first_name = getRandomIndex(firstNames)
  let last_name = getRandomIndex(lastNames)
  while (first_name + last_name in used) {
    first_name = getRandomIndex(firstNames)
    last_name = getRandomIndex(lastNames)
  }``
  let prov = getRandomIndex(emailProv)

  let password = '1'

  let email = first_name + '.' + last_name + '@' + prov + '.com'
  let immigration_status = getRandomIndex(imStatus)
  let arn = makeId()
  let nationality = getRandomIndex(nations)
  let address = getRandomIndex(addy)

  return {first_name, last_name, password, email, immigration_status, arn, nationality, address}
}

function save_comment(form_id, comment,reviewed){
    const conn = db.createConnection('sqlite3://formally-lawyer.db')
    console.log("NSETNG")
    console.log(form_id)
    console.log(comment)
    console.log(reviewed)

    conn.query("UPDATE Forms SET comments_json = ? , reviewed = ? WHERE id = ?", [JSON.stringify(comment),reviewed, form_id], function (error){
      if(error){
        console.log("ERROR: something happened when inserting comment");
        console.log(error);

      }
      conn.end()
    });
}


function deassociate_user_network(user_id, network_id){
  const conn = db.createConnection('sqlite3://formally-lawyer.db');
  conn.query("DELETE FROM User_Network WHERE user_id = ? and network_id = ?;", [user_id,network_id]);
}


function associate_user_network(user_id, network_name){
  console.log("ASSOCIATE")
    const conn = db.createConnection('sqlite3://formally-lawyer.db');
    conn.query("select id from Networks where name = ?", [network_name], function(error, data){
      if(error){
        console.log(error);
        conn.end();
      }else{
        const network_id = data.rows[0].id;
        conn.query("select * from User_Network where user_id = ? and network_id = ?", [user_id, network_id], function(error,data){
          if(data.rows.length === 0){
            conn.query("insert into User_Network(user_id, network_id) VALUES(?,?);", [user_id, network_id], function (error){
              if(error){
                console.log("ERROR: something happened when associating user_network");
                console.log(error);
              }
              conn.end();
            });
          }else{
            conn.end();
          }
        })

      }
    })


}

function insert_networks() {
    for(let network_name in networks){
      insert_network(networks[network_name])
    }
}

function delete_netword(netword_name){

}

function insert_network(network_name){
    const conn = db.createConnection('sqlite3://formally-lawyer.db')
    conn.query("insert into Networks(name) VALUES(?);", [network_name], function (error){
        if(error){
            console.log("ERROR: something happened when inserting network name");
            console.log(error);
        }
        conn.end();
    });

}

function create_tables () {
  const conn = db.createConnection('sqlite3://formally-lawyer.db')

  function create_table (sql) {
    conn.query(sql, function (err) {
      if (err) {
        console.log(err)
      }
    })
  }

  create_table('CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, email varchar(60) UNIQUE, first_name varchar(60) not null,\
        last_name varchar(60) not null, password varchar(60) not null, Created TIMESTAMP DEFAULT CURRENT_TIMESTAMP)')

  create_table('CREATE TABLE IF NOT EXISTS Networks (\
    id	INTEGER PRIMARY KEY AUTOINCREMENT,\
    name	TEXT unique NOT NULL)')

  create_table('CREATE TABLE IF NOT EXISTS Clients (\
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
    meta_json TEXT default \'{}\',\
    FOREIGN KEY (user_id) REFERENCES Users(id))')

  create_table('CREATE TABLE IF NOT EXISTS User_Network (\
    user_id	INTEGER,\
    network_id	INTEGER,\
    FOREIGN KEY (user_id) REFERENCES Users(id),\
    FOREIGN KEY (network_id) REFERENCES Networks(id))')

  create_table('CREATE TABLE IF NOT EXISTS Form_types (\
    id	INTEGER PRIMARY KEY AUTOINCREMENT,\
    name TEXT NOT NULL,\
    full_name TEXT unique NOT NULL,\
    form_json	TEXT NOT NULL)')

  create_table('CREATE TABLE IF NOT EXISTS Forms (\
    id	INTEGER PRIMARY KEY AUTOINCREMENT,\
    client_id	INTEGER NOT NULL,\
    form_type_id INTEGER NOT NULL,\
    info_json	TEXT NOT NULL,\
    comments_json\tTEXT NOT NULL,\
    reviewed	BOOLEAN DEFAULT FALSE,\
    FOREIGN KEY (client_id) REFERENCES Clients(id),\
    FOREIGN KEY (form_type_id) REFERENCES Form_types(id))')
  conn.end()
}

app.get('/api/hello', (req, res) => {
  res.send({express: 'Hello From Express'})
})

app.post('/api/get_client', (req, res) => {
  conn.query('select * from Clients where user_id = ?', [req.body.id], function (error, data) {
    if (error) {
      console.log('INNER')
      console.log(er)

    } else {
      const clients = data.rows

      res.send(clients)
    }

    conn.end()

  })
})

app.post('/api/forms/json', (req, res) => {
  const id = req.body.id
  //console.log("encrypted = " + encrypt(req.body.id));
  const conn = db.createConnection('sqlite3://formally-lawyer.db')
  conn.query('select info_json from Forms where client_id = ?', [id], function (error, result) {
    if (error) {
      console.log(error)
    } else {
      const forms = []
      for (let key in result.rows) {
        forms.push(result.rows[key].info_json)

      }
      res.send({forms: forms})

    }
    conn.end()

  })

})

app.post('/api/forms/display', (req, res) => {
  const id = req.body.id
  //console.log("encrypted = " + encrypt(req.body.id));
  const conn = db.createConnection('sqlite3://formally-lawyer.db')

  conn.query('select ft.name,ft.full_name, f.info_json as question_answer, ft.form_json as question_type, f.comments_json as comments from forms as f, Form_types as ft where ft.id = f.form_type_id and f.id = ?', [id], function (error, result) {
    if (error) {
      console.log(error)
    } else {
      if (result.rows.length !== 1) {
        console.log('ERROR: more than once form was returned')
      }
      res.send(result.rows[0])

    }
    conn.end()

  })

})

app.post('/api/signin', (req, res) => {
  const conn = db.createConnection('sqlite3://formally-lawyer.db')

  console.log(req.body)
  const password = 'select * from users where email = ?'
  conn.query(password, [req.body.email], function (error, data) {
    if (error) {
      console.log('SIGN IN ERR should never call')
      console.log(error)
      conn.end()
    } else {
      if (data.rowCount === 0) {
        res.send({error: 'Invalid Login'})
        conn.end()
      } else if (data.rowCount !== 1) {
        console.log('ERROR: sign in returned multiple passwords (one email has multiple passwords)')
        conn.end()

      } else {
        console.log('Found email, checking pass')
        const hashed = data.rows[0].password
        console.log(hashed)
        bcrypt.compare(req.body.password, hashed).then(function (valid_bool) {

          console.log(valid_bool)
          if (valid_bool) {
            //login is valid
            console.log('SUCCESSs')
            delete data.rows[0].password
            const info = data.rows[0]
            const networks = []
            conn.query('select n.name from Networks as n, Users as u, User_Network as un where u.id = un.user_id and un.network_id = n.id and u.id = ?', [info.id], function (err, data2) {
              if (err) {
                console.log(err)
                res.send({error: err})
                conn.end()

              } else {
                console.log('ROWS ARE')
                console.log(data2.rows)
                Object.keys(data2.rows).forEach(function (key) {
                  networks.push(data2.rows[key].name)
                })
                conn.query('select * from Clients where user_id = ?', [info.id], function (er, data3) {
                  if (er) {
                    console.log('INNER')
                    console.log(er)

                  } else {
                    console.log('GETTING CLIENTS')
                    //conn.query("select id, name, reviewed from Forms where client_id = ?", [])
                    info.networks = networks
                    let curr_clients = data3.rows
                    if (curr_clients.length === 0) {
                      conn.end()
                      info.clients = []
                      res.send(info)
                    } else {

                      for (let key = 0; key < curr_clients.length; key++) {

                        conn.query('select f.id, ft.name,ft.full_name, f.reviewed from Forms as f, Form_types as ft where f.form_type_id = ft.id and client_id = ?', [curr_clients[key].id], function (error, data) {
                          if (error) {
                            console.log('ERROR GETTING FORMS')
                            console.log(error)
                          } else {
                            const forms = []
                            for (let k in data.rows) {
                              forms.push(data.rows[k])
                            }
                            curr_clients[key].forms = forms
                            if (key === curr_clients.length - 1) {
                              info.clients = curr_clients
                              console.log('SENDING back')
                              console.log(info)
                              res.send(info)

                            }
                          }

                        })
                        //console.log("CLIENT ",curr_clients[key])
                      }
                    }
                    console.log('FINISHEDCLIENT')

                    //console.log("INFO")
                    //console.log(info)
                  }

                })

              }

            })

          } else {
            res.send({error: 'Invalid Login'})
          }
        })
      }
    }
  })
})

function ValidateEmail (email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return (true)
  }
  return (false)
}


function temp(network_name, user_id){
  const conn = db.createConnection('sqlite3://formally-lawyer.db')

  conn.query("select * from Networks where name = ?", [network_name], function(error, data){
    if(error){
      console.log("ERROR: really should never print, error getting network names");
      console.log(error);
    }else{
      console.log("ELDSE");
      if(data.rows.length === 0){
        conn.query("insert into Networks(name) values(?)", [network_name], function(error, data){
          if(error){
            console.log(error);
          }
          associate_user_network(user_id, network_name);
        });
        conn.end();
      }else{
        associate_user_network(user_id, network_name);
      }
    }
  });
}


app.post('/api/network/save', (req, res) => {
  console.log(req.body);
  const network_name = req.body.name;
  const user_id = req.body.userId;

  const conn = db.createConnection('sqlite3://formally-lawyer.db')

  conn.query("select * from Networks where name = ?", [network_name], function(error, data){
    if(error){
      console.log("ERROR: really should never print, error getting network names");
      console.log(error);
    }else{
      console.log("ELDSE");
      if(data.rows.length === 0){
        conn.query("insert into Networks(name) values(?)", [network_name], function(error, data){
          if(error){
            console.log(error);
          }
          associate_user_network(user_id, network_name);
        });
        conn.end();
      }else{
        associate_user_network(user_id, network_name);
      }
    }
  });


});

app.post('/api/network/remove', (req, res) => {
  console.log("remove ");
  console.log(req.body);
  const network_name = req.body.name;
  const user_id = req.body.userId;

  const conn = db.createConnection('sqlite3://formally-lawyer.db')

  conn.query("select * from Networks where name = ?", [network_name], function(error, data){
    if(error){
      console.log("ERROR: really should never print, error getting network names");
      console.log(error);
    }else{
      console.log("ELDSE");
      if(data.rows.length !== 0){
        deassociate_user_network(user_id, data.rows[0].id);

      }
    }
  });


});

app.post('/api/forms/save', (req, res) => {
    console.log("SAVE1")

    console.log(req.body)
    console.log("SAVE2")
    const formid = req.body.id
    const comments = req.body.comments
    const reviewed = req.body.reviewed
    save_comment(formid, comments, reviewed)
    res.send({message:"Received your request"})

});
app.post('/api/signup', (req, res) => {
  if (!ValidateEmail(req.body.email)) {
    const to_return = {error: 'You have entered an invalid email address!'};
    res.send(to_return)
  } else {
    bcrypt
      .hash(req.body.password, saltRounds)
      .then(hashedPassword => {
        const conn = db.createConnection('sqlite3://formally-lawyer.db')

        const insert = 'insert into Users(email, first_name, last_name, password) values (?,?,?,?)'

        conn.query(insert, [req.body.email, req.body.first_name, req.body.last_name, hashedPassword], function (error, data) {

          if (error) {
            const to_return = {error: error}
            conn.end()

            res.send(to_return)
          } else {
            delete req.body['password']
            req.body['clients'] = []
            console.log('RETURNED')
            console.log(req.body)
            res.send(req.body)

            conn.end()

          }

        })
      })

  }

})

app.listen(port, () => console.log(`Listening on port ${port}`))