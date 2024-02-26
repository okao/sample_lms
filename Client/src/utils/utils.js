import { fetchBorrowerById, fetchBorrowerBySsn } from "../api/borrowers";
import {
  fetchLoanById,
  fetchActiveLoansByBorrowerId,
  fetchLoansById,
  fetchActiveLoanWithISBN,
} from "../api/loans";

export const validateSsn = async (ssn) => {
  try {
    const response = await fetchBorrowerBySsn(ssn);
    const { data } = response;
    return Object.keys(data).length === 0;
  } catch (error) {
    return error.message;
  }
};

export const validatePayment = async (loan_id) => {
  try {
    const response = await fetchLoanById(loan_id);
    const {
      data: { date_in },
    } = response;
    return date_in;
  } catch (error) {
    return error.message;
  }
};

// PRISMA CLI RETURNS NULL IF THE RECORD IS NOT FOUND.
export const validatMultiplePayments = async (loan_ids) => {
  try {
    const response = await fetchLoansById(loan_ids);
    const { data } = response;
    return !Object.keys(data).length;
  } catch (error) {
    return error.message;
  }
};

export const validateBorrowerID = async (card_id) => {
  try {
    const response = await fetchBorrowerById(card_id);
    const { data } = response;
    return Object.keys(data).length !== 0;
  } catch (error) {
    return error.message;
  }
};

export const isBorrowerEligible = async (card_id) => {
  try {
    const response = await fetchActiveLoansByBorrowerId(card_id);
    const {
      data: { active_loans },
    } = response;
    return active_loans < 3;
  } catch (error) {
    return error.message;
  }
};

// IDEA: BOOK IS NOT AVAIABLE IF THERE EXIST A LOAN TUPLE WHOSE DATE_IN FIELD IS NULL
// OTHERWISE THE BOOK IS AVAILABLE EVEN IF THERE EXIST A LOAN TUPLE(S) WITH THE PROVIDED ISBN NUMBER AS LONG AS THEY ARE RETURNED SINCE THE SYSTEM CAN HAVE SINGLE ACTIVE LOAN FOR ANY GIVEN BOOK IN THE SYSTEM
export const isBookAvailable = async (isbn) => {
  try {
    const response = await fetchActiveLoanWithISBN(isbn);
    const { data } = response;
    return Object.keys(data).length === 0;
  } catch (error) {
    return error.message;
  }
};
