

import { Prisma } from "@prisma/client";
import express from "express";
import { prisma } from "../utils/PrismaClient"
import { v4 as uuidv4 } from 'uuid';

// DEFINE TYPES
export interface BookLoan extends Prisma.book_loansUncheckedCreateInput {
}

// DEFINE GET ALL BORROWERS ROUTE
export const getAllBookLoans = async (
    req: express.Request,
    res: express.Response
) => {
    const onlyMeta: Boolean = Boolean(req.query["onlyMeta"])

    if (onlyMeta == true) {
        console.log("[server] Getting Loans Meta")
        return res.json({ "Amount": await prisma.book_loans.count() })
    }

    console.log("[server] Getting all Loans")
    return res.json(await prisma.book_loans.findMany());
};

// DEFINE GET BORROWER
export const getBookLoan = async (
    req: express.Request,
    res: express.Response
) => {
    const { loan_id } = req.params;
    const book_loan = await prisma.book_loans.findUnique({
        where: {
            loan_id: loan_id,
        },
    });

    if (book_loan) {
        console.log("[server] Retrieved Book Loan " + loan_id);
        return res.json(book_loan);
    }
    else {
        console.log("[server] Could not retrieve Book Loan" + loan_id)
        return res.status(400).json({ message: "[server] Could not retrieve Book Loan" + loan_id });
    }
};

// THE RESULT IS NOT FILTERED BASED ON THE DATE_IN FIELD VALUE
export const getSomeBookLoans = async (
    req: express.Request,
    res: express.Response
) => {

    const SelectedIDs: string[] = Array.from(req.body)

    // RETURN ALL BOOK_LOANS TUPLES WHERE THE DATE_IN VALUE IS SET TO NULL/UNDEFINED
    const book_loans = await prisma.book_loans.findMany({
        where: {
            loan_id: { in: SelectedIDs },
            date_in: null
        },
    });

    console.log(book_loans)
    if (book_loans) {
        return res.json(book_loans);
    }
    else if (book_loans === null) {
        return res.json({})
    } else {
        return res.status(400).json({ message: "[server] Could not retrieve selected book loans" });
    }
};

export const getActiveBookLoansCount = async (
    req: express.Request,
    res: express.Response
) => {

    try {
    const {card_id} = req.params
    
    const activeLoanCount =await prisma.book_loans.count({ where: {card_id: card_id, date_in: null}})

    return res.json({active_loans: activeLoanCount});
    
    } catch {
        return res.status(400).json({ "Success": "Failure", "Message": "Couting active loans of borrower couldn't be completed due to some error." })
    }
};


export const getActiveBookLoanByISBN = async (
    req: express.Request,
    res: express.Response
) => {

    try {
    const {isbn} = req.params
    
    const activeLoan =await prisma.book_loans.findFirst({ where: {isbn: isbn, date_in: null}})

    if(activeLoan)
        return res.json({active_loan: activeLoan})
    else 
        return res.json({})
    
    } catch {
        return res.status(400).json({ "Success": "Failure", "Message": "Couting active loans of borrower couldn't be completed due to some error." })
    }
};

// DEFINE CREATE BOOK LOAN FUNCTION
export const createBookLoan = async (
    req: express.Request,
    res: express.Response
) => {

    try {
        // DEFINE DATE BOOK CHECKED OUT
        const date_out = new Date()

        // DEFINE DUE DATE OF BOOK
        var due_date = new Date()
        due_date.setDate(date_out.getDate() + 14)

        // DEFINE BOOK ITSELF
        var bookLoan: Prisma.book_loansUncheckedCreateInput = {
            loan_id: uuidv4(),
            isbn: req.body["isbn"],
            card_id: req.body["card_id"],
            date_out: date_out,
            due_date: due_date,
            date_in: null
        }

        // CREATE IN DATABASE
        const bookLoanCreate = await prisma.book_loans.create({
            data: bookLoan
        });

        // OUTPUT BASED ON SUCCESS
        if (bookLoanCreate) {
            console.log('[server] Created Book Loan ' + bookLoanCreate.loan_id)
            return res.json(bookLoanCreate);
        }
        else {
            console.log(bookLoanCreate)
            return res.status(404).json({ "Success": "Failure", "Message": "Book Loan could not be created." })
        }

    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(409).json({ message: err.message });
        }
    }
};

// DELETE BOOK 
export const deleteBookLoan = async (req: express.Request, res: express.Response) => {

    try {
        // GET fine FROM PARAMS
        const { loan_id } = req.params

        // DELETE fine
        const deletingBookLoan = await prisma.book_loans.delete({ where: { loan_id: loan_id } })

        if (deletingBookLoan) {
            return res.json(deletingBookLoan)
        } else {
            return res.status(400).json({ "Success": "Failure", "Message": "Book Loan could not be deleted." })
        }

    } catch {
        return res.status(400).json({ "Success": "Failure", "Message": "Book Loan could not be deleted." })
    }
}

// UPDATE fine
export const updateBookLoan = async (req: express.Request, res: express.Response) => {
    // GET fine FROM PARAMS

    const { loan_id } = req.params

    // GET DATA FROM ISBN
    const data = req.body

    // UPDATE
    const updatingBookLoan = await prisma.book_loans.update({ where: { loan_id: loan_id }, data: data })

    // ERROR HANDLING
    if (updatingBookLoan) {
        return res.json(updatingBookLoan)
    } else {
        return res.status(400).json({ "Success": "Failure", "Message": "Could not update fine for some reason" })
    }
}

export const updateBookLoans = async (req: express.Request, res: express.Response) => {
    console.log("[server] Updating many book loans")
    type updateLoan = {
        loan_id: string,
        date_in: Date,
    }

    // DEFINE DATA
    const data: updateLoan[] = Array.from(req.body)

    // GET TWO ARRAYS 
    // GET THE ARRAYS OF IDS TO 
    const IDArrays: string[] = []
    data.forEach((item: updateLoan) => { IDArrays.push(item.loan_id) })

    // DEFINE CHECK IN ITEM
    const date_in: Date = data[0].date_in

    // UPDATE
    await prisma.book_loans.updateMany({ data: { "date_in": date_in }, where: { "loan_id": { in: IDArrays } } })

    // FETCH THE UPDATED BOOK LOANS
    const updatedLoans = await prisma.book_loans.findMany()

    // ERROR HANDLING
    if (updatedLoans) {
        return res.json(updatedLoans)
    } else {
        return res.status(400).json({ "Success": "Failure", "Message": "Could not update fine for some reason" })
    }
}





