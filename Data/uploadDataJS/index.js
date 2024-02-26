/*
This file will load all data and add to database with helper scripts.
*/

import csvtojson from 'csvtojson'
import {addAllBorrowers} from './addBorrowers.js'
import {addAllBooks} from './addBooks.js'
import { addAllAuthors } from './addAuthors.js';

// CREATE CSV OJECT
const {csv} = csvtojson;

// LOAD BOOKS AND BORROWERS OBJECT
var borrowers = await csv().fromFile("borrowers.csv")
var books = await csv().fromFile("books.csv")

// // ADD ALL BORROWERS
// await addAllBorrowers(borrowers)

// // ADD ALL BOOKS
// await addAllBooks(books)

// ADD ALL AUTHORS (AUTHOR INFORMATION IS STORED INSIDE BOOKS.CSV)
await addAllAuthors(books)