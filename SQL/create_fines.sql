-- DROP TABLE FINES;

CREATE TABLE fines (
    "loan_id" VARCHAR PRIMARY KEY,
    FOREIGN KEY ("loan_id") REFERENCES book_loans("loan_id"),
    "fine_amount" FLOAT NOT NULL,
    "paid" BOOLEAN NOT NULL
);

