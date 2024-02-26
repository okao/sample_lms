import express from "express";
import { prisma } from "../utils/PrismaClient"

// DEFINE TYPES
type Book = {
    isbn: string
    title: string
}

// DEFINE GET ALL BORROWERS ROUTE
export const getAllBooks = async (
    req: express.Request,
    res: express.Response
) => {
    const onlyMeta: Boolean = Boolean(req.query["onlyMeta"])

    if (onlyMeta == true) {
        console.log("[server] Getting Books Meta")
        return res.json({ "Amount": await prisma.book.count() })
    }

    console.log("[server] Getting all Books")
   return res.json(await prisma.book.findMany())
};

// DEFINE GET BORROWER
export const getBook = async (
    req: express.Request,
    res: express.Response
) => {
    const { isbn } = req.params;
    const book = await prisma.book.findUnique({
        where: {
            isbn: isbn,
        },
    });

    if (book) {
        console.log("[server] Retrieved book " + isbn);
        return res.json(book);
    }
    else {
        console.log("[server] Could not retrieve book " + isbn)
        return res.status(400).json(book);
    }
};

// DEFINE GET BORROWER
export const createBook = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        // GET QUERY PARAMS
        const isbn = req.body['isbn'];
        const title = req.body['title'];

        const book: Book = {
            isbn: isbn,
            title: title
        };
        // OUTPUT TO CONSOLE

        // CREATE IN DATABASE
        const bookCreate = await prisma.book.create({
            data: book
        });

        if (bookCreate) {
            console.log('[server] Created a new book ' + isbn)
            return res.json(bookCreate);
        } else {
            return res.status(404).json({ "Success": "Failure", "Message": "Book could not be created." })
        }

    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(409).json({ message: err.message });
        }
    }
};

// DELETE BOOK 
export const deleteBook = async (req: express.Request, res: express.Response) => {

    try {
        // GET BOOK FROM PARAMS
        const { isbn } = req.params

        // DELETE BOOK
        const deletingBook = await prisma.book.delete({ where: { isbn: isbn } })

        if (deletingBook) {
            return res.json(deletingBook)
        } else {
            return res.status(400).json({ "Success": "Failure", "Message": "Book could not be deleted due to non existent resource." })
        }
    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(409).json({ message: err.message });
        }
    }
}

// UPDATE BOOK
export const updateBook = async (req: express.Request, res: express.Response) => {
    // GET BOOK FROM PARAMS
    const { isbn } = req.params

    // GET DATA FROM ISBN
    const data = req.body

    // UPDATE
    try {

        const updatingBook = await prisma.book.update({ where: { isbn: isbn }, data: data })

        if (updatingBook) {
            return res.json(updatingBook)
        } else {
            return res.status(400).json({ "Success": "Failure", "Message": "Could not update book for some reason" })
        }
    } catch {
        return res.status(400).json({ "Success": "Failure", "Message": "Could not update book for some reason" })
    }

    // ERROR HANDLING
}



