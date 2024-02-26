##### REACT UI created with Redux
Instructions for running: 

1. Create a new Terminal
2. Go to Client Directory
3. Install Dependencies
   1. `yarn` 
4. Run Client
   1. `yarn start`


##### Borrowers Page Related

1. card_id of a new borrower needs to be created on the server side
   - should be in the form of IDXXXXXX
   - the current number of borrowers can be sent to the server in the request.
2. checking whether there exists a ssn used in the borrower's table already can be done on the client side. [DONE]

##### Fines Page Related

1. handle the case where there is an active loan for a particular borrower but there is not fine
2. Warning when expanding a row with fines
3. filtering all paid fines and filtering paid fines of a particular borrower [TODO - MERT]

##### Loans Page Related

1. Batch update does return a function instead of the updated items [SERVER PROBLEM]
2. Disable the single check in option for a particular row after the first time [TODO - MERT]

##### Discussion

1. Using some other type for date_in, date_out, date_due fields instead of date type - > why? it is not very precise at showing when a book was either checked out, returned, etc!!

   - like 2014-12-24 23:12:00
   - https://momentjs.com/docs/

2. date_in field of a BOOK_LOAN Tuple shouldn't have a null value constraint
3. filtering book_loans on date_in field being null?
