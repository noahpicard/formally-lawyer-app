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

const type = dict_to_list(ead)


const type_example = generateForm(type)
for (let key in type_example) {
    print(type_example[key]);

}
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

