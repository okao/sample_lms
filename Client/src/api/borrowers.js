import axios from "axios";

const url = "http://localhost:3001/borrowers";

export const fetchBorrowers = () => axios.get(url);
export const fetchBorrowerById = (id) => axios.get(`${url}/${id}`);
export const fetchBorrowerBySsn = (ssn) => axios.get(`${url}/ssn/${ssn}`);
export const createBorrower = (newBorrower) => axios.post(url, newBorrower);
export const updateBorrower = (id, updatedBorrower) =>
  axios.patch(`${url}/${id}`, updatedBorrower);
export const deleteBorrower = (id) => axios.delete(`${url}/${id}`);
