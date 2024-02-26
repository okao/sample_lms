import express from "express";
import { prisma } from "../utils/PrismaClient"

// DEFINE TYPES
type Borrower = {
    card_id: string
    ssn: number
    bname: string
    address: string
    phone: string
}

// DEFINE GET ALL BORROWERS ROUTE
export const getAllBorrowers = async (
    req: express.Request,
    res: express.Response
) => {
    const onlyMeta: Boolean = Boolean(req.query["onlyMeta"])

    if (onlyMeta == true) {
        console.log("[server] Getting Borrowers Meta")
        return res.json({ "Amount": await prisma.borrower.count() })
    }
    console.log("[server] Getting all Borrowers")
    return res.json(await prisma.borrower.findMany());
};

// DEFINE GET BORROWER
export const getBorrower = async (
    req: express.Request,
    res: express.Response
) => {

    const { card_id } = req.params;

    const borrower = await prisma.borrower.findUnique({
        where: {
            card_id: card_id,
        },
    });

    if (borrower) {
        return res.json(borrower);
    } else {
        //  RETURN EMPTY JSON OBJECT IF THE BORROWER WITH THE GIVEN CARD_ID DOES NOT EXIST IN THE BORROWER TABLE
        return res.json({});
    }

};


export const getBorrowerBySSN = async (
    req: express.Request,
    res: express.Response
) => {

    // DEFINE BORROWER
    var borrower;

    try {
    const { ssn } = req.params;
    borrower = await prisma.borrower.findFirst({
        where: {
            ssn: Number(ssn),
        },
    });
    } catch (err: unknown) {
        console.log('[server] Could not verify borrower')
        return res.status(404).json({ "Success": "Failure", "Message": "Borrower not found." })
    }

    if (borrower)
        return res.json(borrower);
    else if (borrower === null)
        return res.json({})
    else {
        return res.status(404).json({ "Success": "Failure", "Message": "Borrower not found." })
    }
};

export const createBorrower = async (
    req: express.Request,
    res: express.Response
) => {
    let valid:boolean = false;
    var card_id:string = "";
    var bname:string = "";
    var address:string = "";
    var phone:string = "";
    var ssn:number = 0;

    try {
        // GET VARIABLES FROM BODY
        ssn = Number(req.body['ssn']);
        bname = req.body['bname'];
        address = req.body['address'];
        phone = req.body['phone'];
        card_id = await getNewBorrowerID();
        valid = true;
    }   catch (err: unknown) {
        if (err instanceof Error) {
            console.log('[server] Could not create borrower')
            return res.status(409).json({ message: "Could not create borrower", "error": err.message });
        }
    }
    if(!Number.isNaN(ssn)) {
        const borrower: Borrower = {
            card_id: card_id,
            ssn: ssn,
            bname: bname,
            address: address,
            phone: phone,
        };

        // OUTPUT TO CONSOLE
        console.log('[server] Creating borrower ' + card_id)

        // CREATE IN DATABASE
        const borrowerCreate = await prisma.borrower.create({
            data: borrower
        });

        // RETURN
        return res.json(borrowerCreate);
    }
};


// DEFINE GET 
export const removeBorrower = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        // DEFINE CARD_ID OF BORROWER TO REMOVE
        const { card_id } = req.params

        // CREATE IN DATABASE
        const borrowerRemoving = await prisma.borrower.delete({ where: { card_id: card_id } })

        // OUTPUT TO CONSOLE
        console.log('[server] Removed ' + card_id + ' borrower');

        return res.json(borrowerRemoving);

    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(400).json({ "Message": "Could not delete" })
        }
    }
};


// DEFINE GET 
export const updateBorrower = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        // DEFINE CARD_ID OF BORROWER TO REMOVE
        const { card_id } = req.params

        // DEFINE DATA
        const data = req.body

        // CREATE IN DATABASE
        const borrowerUpdating = await prisma.borrower.update({
            where: {
                card_id: card_id
            },
            data: data
        })

        // OUTPUT TO CONSOLE
        console.log('[server] Updated ' + card_id + ' borrower');

        return res.json(borrowerUpdating);

    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(400).json({ "message": "Could not update borrower", "Error": err.message })
        }
    }
};

// UTILS

// GET NEW BORROWER ID 
export const getNewBorrowerID = async () => {
    // DEFINE NUMBER OF CURRENT BORROWERS
    const currNumBorrowers: number = await prisma.borrower.count()

    return "ID" + String(currNumBorrowers + 1).padStart(6, "0")
}
