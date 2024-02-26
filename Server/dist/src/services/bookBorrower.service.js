"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBorrower = exports.getBorrower = exports.getAllBorrowers = void 0;
// DEFINE PRISMA CLIENT
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// DEFINE GET ALL BORROWERS ROUTE
const getAllBorrowers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("[server] Getting all Borrowers");
    return res.json(yield prisma.borrower.findMany());
});
exports.getAllBorrowers = getAllBorrowers;
// DEFINE GET BORROWER
const getBorrower = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: borrowerID } = req.params;
    const borrower = yield prisma.borrower.findUnique({
        where: {
            card_id: borrowerID,
        },
    });
    return res.json(borrower);
});
exports.getBorrower = getBorrower;
// DEFINE GET 
const createBorrower = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // GET QUERY PARAMS
        console.log(req.body);
        const card_id = req.body['card_id'];
        const ssn = req.body['ssn'];
        const bname = req.body['bname'];
        const address = req.body['address'];
        const phone = req.body['phone'];
        const borrower = {
            card_id: card_id,
            ssn: ssn,
            bname: bname,
            address: address,
            phone: phone,
        };
        // OUTPUT TO CONSOLE
        console.log('Creating a new borrower : \n');
        // CREATE IN DATABASE
        const borrowerCreate = yield prisma.borrower.create({
            data: borrower
        });
        return res.json(borrowerCreate);
    }
    catch (err) {
        if (err instanceof Error) {
            return res.send(409).json({ message: err.message });
        }
    }
});
exports.createBorrower = createBorrower;
// 
