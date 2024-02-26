-- create table book authors
-- Boolean
-- Character Types [ such as char, varchar, and text]
-- Numeric Types [ such as integer and floating-point number]
-- Temporal Types [ such as date, time, timestamp, and interval]
-- UUID [ for storing UUID (Universally Unique Identifiers) ]
-- Array [ for storing array strings, numbers, etc.]
-- JSON [ stores JSON data]
-- hstore [ stores key-value pair]
-- Special Types [ such as network address and geometric data]



-- SELECT * FROM "book_authors";
-- -- remove everything from table
-- DELETE FROM book_authors;
-- -- remove the table
-- DROP TABLE "book_authors";

CREATE TABLE "book_authors" 
(
    "author_id" VARCHAR PRIMARY KEY,
    isbn VARCHAR NOT NULL,
    FOREIGN KEY (isbn) REFERENCES book("isbn"),
    FOREIGN KEY ("author_id") REFERENCES authors("author_id")
);

-- SELECT * FROM "book_authors";