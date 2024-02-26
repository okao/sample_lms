-- Boolean
-- Character Types [ such as char, varchar, and text]
-- Numeric Types [ such as integer and floating-point number]
-- Temporal Types [ such as date, time, timestamp, and interval]
-- UUID [ for storing UUID (Universally Unique Identifiers) ]
-- Array [ for storing array strings, numbers, etc.]
-- JSON [ stores JSON data]
-- hstore [ stores key-value pair]
-- Special Types [ such as network address and geometric data]

-- DROP TABLE AUTHOR;

CREATE TABLE authors
(
    "author_id" VARCHAR PRIMARY KEY,
    "name" VARCHAR NOT NULL
);