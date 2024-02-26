-- CreateTable
CREATE TABLE "authors" (
    "author_id" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "authors_pkey" PRIMARY KEY ("author_id")
);

-- CreateTable
CREATE TABLE "book" (
    "isbn" VARCHAR NOT NULL,
    "title" VARCHAR NOT NULL,

    CONSTRAINT "book_pkey" PRIMARY KEY ("isbn")
);

-- CreateTable
CREATE TABLE "book_authors" (
    "id" VARCHAR NOT NULL,
    "author_id" VARCHAR NOT NULL,
    "isbn" VARCHAR NOT NULL,

    CONSTRAINT "book_authors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "book_loans" (
    "loan_id" VARCHAR NOT NULL,
    "isbn" VARCHAR NOT NULL,
    "card_id" VARCHAR NOT NULL,
    "date_out" TIMESTAMP(6) NOT NULL,
    "due_date" TIMESTAMP(6) NOT NULL,
    "date_in" TIMESTAMP(6),

    CONSTRAINT "book_loans_pkey" PRIMARY KEY ("loan_id")
);

-- CreateTable
CREATE TABLE "borrower" (
    "card_id" VARCHAR NOT NULL,
    "ssn" INTEGER NOT NULL,
    "bname" VARCHAR NOT NULL,
    "address" VARCHAR NOT NULL,
    "phone" VARCHAR NOT NULL,

    CONSTRAINT "borrower_pkey" PRIMARY KEY ("card_id")
);

-- CreateTable
CREATE TABLE "fines" (
    "loan_id" VARCHAR NOT NULL,
    "fine_amount" DOUBLE PRECISION NOT NULL,
    "paid" BOOLEAN NOT NULL,

    CONSTRAINT "fines_pkey" PRIMARY KEY ("loan_id")
);

-- AddForeignKey
ALTER TABLE "book_authors" ADD CONSTRAINT "book_authors_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"("author_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "book_authors" ADD CONSTRAINT "book_authors_isbn_fkey" FOREIGN KEY ("isbn") REFERENCES "book"("isbn") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "book_loans" ADD CONSTRAINT "book_loans_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "borrower"("card_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "book_loans" ADD CONSTRAINT "book_loans_isbn_fkey" FOREIGN KEY ("isbn") REFERENCES "book"("isbn") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fines" ADD CONSTRAINT "fines_loan_id_fkey" FOREIGN KEY ("loan_id") REFERENCES "book_loans"("loan_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
