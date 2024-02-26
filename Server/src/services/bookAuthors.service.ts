

import { Prisma } from "@prisma/client";
import express from "express";
import { prisma } from "../utils/PrismaClient"

// DEFINE TYPES
interface bookAuthor extends Prisma.book_authorsUncheckedCreateInput {

}

// DEFINE GET ALL BORROWERS ROUTE
export const getAllBookAuthors = async (
    req: express.Request,
    res: express.Response
) => {
    const onlyMeta: Boolean = Boolean(req.query["onlyMeta"])

    if (onlyMeta == true) {
        console.log("[server] Getting Books Authors Meta")
        return res.json({ "Amount": await prisma.book_authors.count() })
    }
    console.log("[server] Getting all Book Authors")
    return res.json(await prisma.book_authors.findMany());
};

// DEFINE GET BORROWER
export const getBookAuthor = async (
    req: express.Request,
    res: express.Response
) => {
    const { id } = req.params;
    const bookAuthor = await prisma.book_authors.findUnique({
        where: {
            id: id,
        },
    });

    if (bookAuthor) {
        console.log("[server] Retrieved Book Author Entity " + id);
        return res.json(bookAuthor);
    }
    else {
        console.log("[server] Could not retrieve Book Author Entity" + id)
        return res.status(400).json(id);
    }
};

// DEFINE GET BORROWER
export const createBookAuthor = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        // GET QUERY PARAMS
        const id: string = req.body['id'];
        const author_id = req.body['author_id'];
        const isbn = req.body['isbn'];

        console.log("[server] Creating a new bookAuthor (authorid: " + author_id + ")" + "(isbn: " + isbn + ")")

        const bookAuthor: bookAuthor = {
            id: id,
            author_id: author_id,
            isbn: isbn
        };

        // CREATE IN DATABASE
        const bookAuthorCreate = await prisma.book_authors.create({
            data: bookAuthor
        });


        if (bookAuthorCreate) {
            console.log('[server] Created a new Book Author ' + bookAuthorCreate)
            return res.json(bookAuthorCreate);
        } else {
            return res.status(404).json({ "Success": "Failure", "Message": "Book Author could not be created." })
        }

    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(409).json({ message: err.message });
        }
    }
};


// DELETE BOOK 
export const deleteBookAuthor = async (req: express.Request, res: express.Response) => {
    // GET fine FROM PARAMS
    const { id } = req.params

    // DELETE fine
    const deletingBookAuthor = await prisma.book_authors.delete({ where: { id: id } })

    if (deletingBookAuthor) {
        return res.json(deletingBookAuthor)
    } else {
        return res.status(400).json({ "Success": "Failure", "Message": "Book Author could not be deleted due to non existent resource." })
    }
}

// UPDATE fine
export const updateBookAuthor = async (req: express.Request, res: express.Response) => {
    // GET fine FROM PARAMS
    const { id } = req.params

    // GET DATA FROM ISBN
    const data = req.body

    // UPDATE
    const updatingBookAuthor = await prisma.book_authors.update({ where: { id: id }, data: data })

    // ERROR HANDLING
    if (updatingBookAuthor) {
        return res.json(updatingBookAuthor)
    } else {
        return res.status(400).json({ "Success": "Failure", "Message": "Could not update Book Author for some reason" })
    }
}



