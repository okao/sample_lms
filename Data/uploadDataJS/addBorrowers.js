/*
This file add all borrowers
*/
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

// FUNCTION WILL CREATE PROPER BORROWER OBJECT TO ADD 
const getCorrectBorrower = (borrower) => {
    var borrowerSSN = parseInt((borrower.ssn))
    var newBorrower = {
        "card_id":borrower.card_id,
        "ssn":borrowerSSN,
        "bname":borrower.bname,
        "address":borrower.address,
        "phone":borrower.phone
    }

    return newBorrower
}

// FUNCTION WILL RETURN A NEW LIST OF ALL OF THE RECORDS TO ADD TO THE DATABASE
const getCorrectBorrowerList = (rawBorrowers) => {
    // CREATE NEW ARRAY OF BORROWER RECORDS 
    var borrowerArray = Array.from(rawBorrowers, (borrower) => getCorrectBorrower(borrower))

    return borrowerArray
}

// ADD ALL BORROWERS
export const addAllBorrowers = async (rawBorrowers) => {
    const numAdded = await prisma.borrower.createMany({data: getCorrectBorrowerList(rawBorrowers)})
    console.log("Added " + numAdded.count + " borrowers")
}


// FOR LOOP TO GO THROUGH THE LIST OF BORROWERS AND EACH ONE
// for(var i=0; i<borrowers.length; i++){
//     var borrower = borrowers[i]
//     const addBorrower = async (borrower) => {
//         // DATA PREPROCESSING
//         var borrowerID = Number((borrower.ID0000id).replace("ID", ""))
//         var borrowerSSN = parseInt((borrower.ssn).replaceAll("-",""))
//         var newBorrower = {
//             "card_id":borrowerID,
//             "ssn":borrowerSSN,
//             "bname":borrower.first_name + " " + borrower.last_name,
//             "address":borrower.address,
//             "phone":borrower.phone
//         }
        
//         console.log("Adding " + JSON.stringify(newBorrower) + "\n\n")
//         await prisma.borrower.delete({where: { ssn: newBorrower.ssn}})
        
//     }

//     await addBorrower(borrower)

// }

