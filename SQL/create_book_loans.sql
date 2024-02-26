-- DROP TABLE BOOK_LOANS;

CREATE TABLE book_loans (
    "loan_id" VARCHAR PRIMARY KEY,
    "isbn" VARCHAR NOT NULL,
    FOREIGN KEY ("isbn") REFERENCES book("isbn"),
    "card_id" INTEGER NOT NULL,
    FOREIGN KEY ("card_id") REFERENCES borrower("card_id"),
    "date_out" DATE NOT NULL,
    "due_date" DATE NOT NULL,
    "date_in" DATE NOT NULL
);