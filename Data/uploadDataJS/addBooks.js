/*
This file will load all of the books into the database

type book {
    isbn string,
    title string
}

*/
import {PrismaClient}  from '@prisma/client'
const prisma = new PrismaClient()

// FUNCTION WILL GET THE CORRECT BORROWER FROM THE RAW BORROWER RECORD (CSV)
const getCorrectBook = (rawBook) => {
    // USING ISBN10 FOR CORRECT BOOKS
    var newBook = {
        isbn: rawBook.ISBN10,
        title: rawBook.Title
    }

    return newBook
}

// FUNCTION WILL RETURN A NEW LIST OF ALL OF THE RECORDS TO ADD TO THE DATABASE
const getCorrectBookList = (rawBookRecords) => {
    // CREATE NEW ARRAY OF CORRECT BOOK RECORDS 
    var bookArray = Array.from(rawBookRecords, (rawBookRecord) => getCorrectBook(rawBookRecord))
    return bookArray
}

// FUNCTION WILL ADD ALL BOOKS 
export const addAllBooks = async (rawBookRecords) => {
    const numAdded = await prisma.book.createMany({data: getCorrectBookList(rawBookRecords)})
    console.log("Added " + numAdded.count + " books")
}



