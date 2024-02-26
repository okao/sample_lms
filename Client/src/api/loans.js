import axios from "axios";

const url = "http://localhost:3001/bookLoans";

export const fetchLoans = () => axios.get(url);
export const fetchLoanById = (loan_id) => axios.get(`${url}/${loan_id}`);
export const fetchLoansById = (loan_ids) =>
  axios.post(`${url}/loans`, loan_ids);
export const fetchActiveLoanWithISBN = (isbn) =>
  axios.get(`${url}/loan/${isbn}`);
export const fetchActiveLoansByBorrowerId = (borrower_id) =>
  axios.get(`${url}/loans/${borrower_id}`);
export const createLoan = (newLoan) => axios.post(url, newLoan);
export const updateLoan = (loan_id, updatedLoan) =>
  axios.put(`${url}/${loan_id}`, updatedLoan);
export const updateLoans = (updatedLoans) => axios.put(`${url}`, updatedLoans);
export const deleteLoan = (loan_id) => axios.delete(`${url}/${loan_id}`);
