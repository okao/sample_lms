-- DROP TABLE BORROWER

CREATE TABLE borrower (
    "card_id" INTEGER PRIMARY KEY,
    "ssn" INTEGER NOT NULL,
    "bname" VARCHAR NOT NULL,
    "address" VARCHAR NOT NULL,
    "phone" VARCHAR NOT NULL
);