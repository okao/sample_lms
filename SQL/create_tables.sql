CREATE TABLE book (
    isbn VARCHAR PRIMARY KEY,
    title VARCHAR NOT NULL
);

CREATE TABLE authors
(
    "author_id" VARCHAR PRIMARY KEY,
    "name" VARCHAR NOT NULL
);

CREATE TABLE "book_authors" 
(
    "id" VARCHAR PRIMARY KEY,
    "author_id" VARCHAR NOT NULL,
    isbn VARCHAR NOT NULL,
    FOREIGN KEY (isbn) REFERENCES book(isbn),
    FOREIGN KEY ("author_id") REFERENCES authors("author_id")
);

CREATE TABLE borrower (
    "card_id" INTEGER PRIMARY KEY,
    ssn INTEGER NOT NULL,
    bname VARCHAR NOT NULL,
    "address" VARCHAR NOT NULL,
    phone VARCHAR NOT NULL
);

CREATE TABLE "book_loans" (
    "loan_id" VARCHAR PRIMARY KEY,
    isbn VARCHAR NOT NULL,
    FOREIGN KEY (isbn) REFERENCES book(isbn),
    "card_id" INTEGER NOT NULL,
    FOREIGN KEY ("card_id") REFERENCES borrower("card_id"),
    "date_out" DATE NOT NULL,
    "due_date" DATE NOT NULL,
    "date_in" DATE NOT NULL
);

 CREATE TABLE fines (
    "loan_id" VARCHAR PRIMARY KEY,
    FOREIGN KEY ("loan_id") REFERENCES "book_loans"("loan_id"),
    "fine_amount" FLOAT NOT NULL,
    "paid" BOOLEAN NOT NULL
);
