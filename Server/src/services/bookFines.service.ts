import { Prisma } from "@prisma/client";
import express from "express";
import finesRouter from "../routes/bookFines.route";
import { prisma } from "../utils/PrismaClient"
import { BookLoan } from "./bookLoans.service"


// DEFINE TYPES
interface Fine extends Prisma.finesUncheckedCreateInput {

}

// DEFINE GET ALL BORROWERS ROUTE
export const getAllFines = async (
    req: express.Request,
    res: express.Response
) => {
    const onlyMeta: Boolean = Boolean(req.query["onlyMeta"])

    if (onlyMeta == true) {
        console.log("[server] Getting Fines Meta")
        return res.json({ "Amount": await prisma.fines.count() })
    }
    console.log("[server] Getting all Fines")
    return res.json(await prisma.fines.findMany());
};

// DEFINE GET BORROWER
export const getFine = async (
    req: express.Request,
    res: express.Response
) => {
    const { loan_id } = req.params;
    const fine = await prisma.fines.findUnique({
        where: {
            loan_id: loan_id,
        },
    });

    if (fine) {
        console.log("[server] Retrieved fine " + loan_id);
        return res.json(fine);
    }
    else {
        console.log("[server] Could not retrieve fine" + loan_id)
        return res.status(400).json(loan_id);
    }
};

// DEFINE GET BORROWER
export const createFine = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        // GET QUERY PARAMS
        const loan_id: string = req.body['loan_id'];
        const fine_amount = Number(req.body['fine_amount']);
        const paid = Boolean(req.body['paid']);

        const fine: Fine = {
            loan_id: loan_id,
            fine_amount: fine_amount,
            paid: paid
        };

        // CREATE IN DATABASE
        const fineCreate = await prisma.fines.create({
            data: fine
        });


        if (fineCreate) {
            console.log('[server] Created a new fine ' + loan_id)
            return res.json(fineCreate);
        } else {
            return res.status(404).json({ "Success": "Failure", "Message": "Fine could not be created." })
        }

    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(409).json({ message: err.message });
        }
    }
};


// DELETE BOOK 
export const deleteFine = async (req: express.Request, res: express.Response) => {
    // GET fine FROM PARAMS
    const { loan_id } = req.params

    // DELETE fine
    const deletingfine = await prisma.fines.delete({ where: { loan_id: loan_id } })

    if (deletingfine) {
        return res.json(deletingfine)
    } else {
        return res.status(400).json({ "Success": "Failure", "Message": "Fine could not be deleted due to non existent resource." })
    }
}

export const updateFine = async (req: express.Request, res: express.Response) => {
    // GET fine FROM PARAMS
    const { loan_id } = req.params

    // GET DATA FROM ISBN
    const data = req.body

    // IF THE REMAINING BALANCE IS NOT ZERO, THEN SET PAID FIELD TO FALSE
    data.paid = data.fine_amount ? false : true

    //UPDATE
    const updatedFine = await prisma.fines.update({ where: { loan_id: loan_id }, data: data })

    // ERROR HANDLING
    if (updatedFine) {
        return res.json(updatedFine)
    } else {
        return res.status(400).json({ "Success": "Failure", "Message": "Could not update fine for some reason" })
    }
}

export const updateFines = async (req: express.Request, res: express.Response) => {

    const SelectedIDs: string[] = Array.from(req.body)

    // UPDATE FINES
    await prisma.fines.updateMany({ where: { "loan_id": { in: SelectedIDs } }, data: { fine_amount: 0, paid: true } })

    // FETCH THE UPDATED FINES
    const updatedFines = await prisma.fines.findMany()

    if (updatedFines) {
        return res.json(updatedFines);
    } else {
        return res.status(400).json({ message: "[server] Could not retrieve selected book loans" });
    }
}


export const refreshFines = async (req: express.Request, res: express.Response) => {
    const { date } = req.body

    const refresh_time = new Date(date);

    // STEP 1: FIND ALL BOOK LOANS THAT HAVEN'T BEEN RETURNED AS OF TODAY
    const loans_not_returned = await prisma.book_loans.findMany({
        where: { date_in: null },
    })

    // STEP 2: FIND ALL "LATE" BOOK LOANS THAT HAVEN'T BEEN RETURNED AS OF TODAY
    const late_loans_not_returned = loans_not_returned.filter((loan) =>
        (loan.due_date.toISOString().localeCompare(date) === -1)
    )

    // STEP 3: EITHER CREATE A NEW FINE OR UPDATE AN EXISTING FINE'S FINE AMOUNT
    late_loans_not_returned.forEach(async (late_loan) => {
        // CALCULATE THE DIFFERENCE BETWEEN TODAY'S DATE AND THE DUE DATE OF THE GIVEN LOAN
        let diff_in_time = refresh_time.getTime() - late_loan.due_date.getTime();
        let diff_in_days = Math.floor(diff_in_time / 86400000)

        await prisma.fines.upsert({
            where: { loan_id: late_loan.loan_id }, update: {
                fine_amount: (.25 * diff_in_days)
            }, create: {
                loan_id: late_loan.loan_id, fine_amount: (.25 * diff_in_days), paid: false
            }
        })
    })

    // STEP 4: RETURN ALL FINES [UPDATED/NEW/NOT_UPDATED] AS JSON TO THE CLIENT
    return res.json(await prisma.fines.findMany())
}


