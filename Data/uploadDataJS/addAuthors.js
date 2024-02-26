/*
This file will load all of the authors into the database with unique id's.

model authors {
  author_id    String        @id @db.VarChar
  name         String        @db.VarChar
  book_authors book_authors?
}

model book_authors {
  author_id String  @id @db.VarChar
  isbn      String  @db.VarChar
  authors   authors @relation(fields: [author_id], references: [author_id], onDelete: NoAction, onUpdate: NoAction)
  book      book    @relation(fields: [isbn], references: [isbn], onDelete: NoAction, onUpdate: NoAction)
}

*/
import { v4 as uuidv4 } from 'uuid';
import {PrismaClient}  from '@prisma/client'
const prisma = new PrismaClient()


// SINGLE AUTHOR
    // ADD A NEW AUTHOR IF THEY DON'T EXIST
    // ADD A NEW ENTRY UNDER BOOK_AUTHORS FOR THIS PARTICULAR BOOK
// MULTIPLE AUTHORS 
    // SAME THING BUT FOR EACH ONE 

// HOW TO DO CREATE MANY BC OF TIME CONSTRAINT?

// RETURN A AUTHOR OBJECT
const getAuthorObject = (authorID, authorName) => {
    // return newAuthorObject
    return {
        author_id: authorID,
        name: authorName,
    }
}
// RETURN A BOOK AUTHOR OBJECT
const getBookAuthorObject = (authorID, isbn) => {
    return {
        id: uuidv4(),
        author_id: authorID,
        isbn: isbn
    }    
}


// FUNCTION WILL RETURN TWO ARRAYS .. 
const getCorrectAuthorList = (rawBookRecords) => {
    // DEFINE THE ARRAYS TO RETURN 
    var authorArray = []
    var bookAuthorArray = []

    // DEFINE THE AUTHORS THAT EXIST 
    var authorsAdded = new Map()

    rawBookRecords.forEach((record) => {
        // GET LIST OF AUTHORS FOR EACH RECORD
        var authorArrayRecord = record.Author.split(',')

        // FOR EACH AUTHOR DO THIS
        authorArrayRecord.forEach((author) => {
            // CHECK IF THE AUTHOR EXISTS
            var authorID = authorsAdded.get(author)
            
            // AUTHOR DOES NOT EXIST .. WE NEED TO CREATE AN AUTHOR OBJECT AND ADD HIM TO AUTHORS
            if(!authorID){
                // GET UNIQUE ID
                authorID = uuidv4();

                // ADD A NEW AUTHOR OBJECT
                authorArray.push(getAuthorObject(authorID, author))

                // ADD TO AUTHORSADDED
                authorsAdded.set(author, authorID)
            }

            // ADD A NEW ENTRY TO BOOKAUTHORARRAY REGARDLESS
            bookAuthorArray.push(getBookAuthorObject(authorID, record["ISBN10"]))
        })

    });

    return [authorArray, bookAuthorArray]
}


// FUNCTION WILL ADD ALL Authors and populate the one-on-one 
export const addAllAuthors = async (rawBookRecords) => {
    // GET ALL 
    let [authorArray, bookAuthorArray] = getCorrectAuthorList(rawBookRecords)

    // CREATE MANY
    var numAuthorsAdded = await prisma.authors.createMany({data: authorArray})
    var numBookAuthorsAdded = await prisma.book_authors.createMany({data: bookAuthorArray, skipDuplicates: false})

    // ADD ALL AUTHORS INTO BOOK_AUTHORS
    console.log("Added " + numAuthorsAdded.count + " Authors")
    console.log("Added " + numBookAuthorsAdded.count + " Book Authors")

}

