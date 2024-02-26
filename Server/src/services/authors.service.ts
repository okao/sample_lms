

import { Prisma } from "@prisma/client";
import express from "express";
import { prisma } from "../utils/PrismaClient"

// DEFINE TYPES
interface author extends Prisma.authorsCreateWithoutBook_authorsInput {

}

// DEFINE GET ALL BORROWERS ROUTE
export const getAllAuthors = async (
    req: express.Request,
    res: express.Response
) => {
    const onlyMeta: Boolean = Boolean(req.query["onlyMeta"])

    if (onlyMeta == true) {
        console.log("[server] Getting Authors Meta")
        return res.json({ "Amount": await prisma.authors.count() })
    }

    console.log("[server] Getting all Authors")
    return res.json(await prisma.authors.findMany());
};

// DEFINE GET BORROWER
export const getAuthor = async (
    req: express.Request,
    res: express.Response
) => {
    const { author_id } = req.params;

    const author = await prisma.authors.findUnique({
        where: {
            author_id: author_id,
        },
    });

    if (author) {
        console.log("[server] Retrieved Author " + author_id);
        return res.json(author);
    }
    else {
        console.log("[server] Could not retrieve Author Entity" + author_id)
        return res.status(400).json(author_id);
    }
};

// DEFINE GET BORROWER
export const createAuthor = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        // GET QUERY PARAMS
        const author_id: string = req.body['author_id'];
        const name: string = req.body['name'];

        console.log("[server] Creating a new Author " + author_id + "(" + name + ")")
        const author: author = {
            author_id: author_id,
            name: name
        };

        // CREATE IN DATABASE
        const authorCreate = await prisma.authors.create({
            data: author
        });


        if (authorCreate) {
            console.log('[server] Created a new Author ' + authorCreate)
            return res.json(authorCreate);
        } else {
            return res.status(404).json({ "Success": "Failure", "Message": "Author could not be created." })
        }

    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(409).json({ "Message": "Could not create author", message: err.message });
        }
    }
};


// DELETE AUTHOR
export const deleteAuthor = async (req: express.Request, res: express.Response) => {
    // GET author_id FROM PARAMS
    const { author_id } = req.params

    // DELETE Author
    try {
        const deletingAuthor = await prisma.authors.delete({ where: { author_id: author_id } })

        if (deletingAuthor) {
            return res.json(deletingAuthor)
        } else {
            return res.status(400).json({ "Success": "Failure", "Message": "Book Author could not be deleted due to non existent resource." })
        }
    } catch {
        return res.status(400).json({ "Success": "Failure", "Message": "Book Author could not be deleted" })
    }
}

// UPDATE Author
export const updateAuthor = async (req: express.Request, res: express.Response) => {
    // GET fine FROM PARAMS
    const { author_id } = req.params

    // GET DATA FROM ISBN
    const data = req.body

    // ERROR HANDLING
    try {

        // UPDATE
        const updatingAuthor = await prisma.authors.update({ where: { author_id: author_id }, data: data })
        if (updatingAuthor) {
            return res.json(updatingAuthor)
        } else {
            return res.status(400).json({ "Success": "Failure", "Message": "Could not update Book Author" })
        }
    } catch {
        return res.status(400).json({ "Success": "Failure", "Message": "Could not update Book Author" })

    }
}



