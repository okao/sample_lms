"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// https://blog.logrocket.com/how-to-set-up-node-typescript-express/
const express_1 = __importDefault(require("express"));
const borrower_route_1 = __importDefault(require("./src/routes/borrower.route"));
const book_route_1 = __importDefault(require("./src/routes/book.route"));
const body_parser_1 = __importDefault(require("body-parser"));
const port = 3001;
const server = (0, express_1.default)();
server.use(body_parser_1.default.json({ limit: "30mb" }));
server.use(body_parser_1.default.urlencoded({ limit: "30mb", extended: true }));
server.get('/', (req, res) => {
    res.json({
        "Success": "True",
        "Team": "Beryllium",
        "Team Members": [
            { "Name": "Mert Buyulu" },
            { "Name": "Minh Nguyen", "Role": "Front-End Dev" },
            { "Name": "Srilokh Karuturi", "Role": "Lead" },
            { "Name": "Michelle Gonzales", "Role": "Programmer" },
            { "Name": "Jonathan Abraham", "Role": "Team Member" }
        ]
    });
});
server.use('/borrower', borrower_route_1.default);
server.use('/book', book_route_1.default);
server.listen(port, "127.0.0.1", () => {
    console.log(`[server] Server is running at http://127.0.0.1:${port}/`);
});
function cors() {
    throw new Error("Function not implemented.");
}
