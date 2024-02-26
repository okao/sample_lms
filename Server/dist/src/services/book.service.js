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
exports.createBook = exports.getBook = exports.getAllBooks = void 0;
// DEFINE PRISMA CLIENT
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// DEFINE GET ALL BORROWERS ROUTE
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("[server] Getting all Books");
    return res.json(yield prisma.book.findMany());
});
exports.getAllBooks = getAllBooks;
// DEFINE GET BORROWER
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { isbn } = req.params;
    const borrower = yield prisma.book.findUnique({
        where: {
            isbn: isbn,
        },
    });
    return res.json(borrower);
});
exports.getBook = getBook;
// DEFINE GET BORROWER
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // GET QUERY PARAMS
        const isbn = req.body['isbn'];
        const title = req.body['title'];
        const book = {
            isbn: isbn,
            title: title
        };
        // OUTPUT TO CONSOLE
        console.log('Creating a new book : \n');
        // CREATE IN DATABASE
        const bookCreate = yield prisma.book.create({
            data: book
        });
        return res.json(bookCreate);
    }
    catch (err) {
        if (err instanceof Error) {
            return res.send(409).json({ message: err.message });
        }
    }
});
exports.createBook = createBook;
// 
