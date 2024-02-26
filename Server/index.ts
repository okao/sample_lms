// https://blog.logrocket.com/how-to-set-up-node-typescript-express/
import express from "express"
import cors from "cors"
import bodyParser from "body-parser";

// route imports
import borrowerRouter from "./src/routes/borrower.route"
import bookRouter from "./src/routes/book.route"
import bookAuthorRouter from "./src/routes/bookAuthors.route"
import finesRouter from "./src/routes/bookFines.route"
import bookLoansRouter from "./src/routes/bookLoans.route"
import authorRouter from "./src/routes/authors.route"

const port = 3001
export const server = express();
server.use(cors())
server.use(bodyParser.json({ limit: "30mb" }));
server.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

server.get('/', (req: express.Request, res: express.Response) => {
    res.json({
        "Success": "True",
        "Team": "Beryllium",
        "Team Members": [
            { "Name": "Mert Buyulu", "Role": "Scrum Master" },
            { "Name": "Minh Nguyen", "Role": "Front-End Dev" },
            { "Name": "Srilokh Karuturi", "Role": "Lead" },
            { "Name": "Michelle Gonzales", "Role": "Programmer" },
            { "Name": "Jonathan Abraham", "Role": "Team Member" }
        ]
    })
})

server.use('/books', bookRouter)
server.use('/borrowers', borrowerRouter)
server.use('/bookAuthors', bookAuthorRouter)
server.use('/authors', authorRouter)
server.use('/fines', finesRouter)
server.use('/bookLoans', bookLoansRouter)

server.listen(port, "127.0.0.1", () => {
    console.log(`[server] Server is running at http://127.0.0.1:${port}/`)
})
