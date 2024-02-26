import { useEffect } from "react";

// styles
import "./HomePage.styles.scss";

// components
import StatCard from "../components/StatCard";

// redux imports
import { getBooks } from "../redux/books/books.utils";
import { getBorrowers } from "../redux/borrowers/borrowers.utils";
import { getLoans } from "../redux/loans/loans.utils";
import { getAuthors } from "../redux/authors/authors.utils";
import { getFines } from "../redux/fines/fines.utils";
import { SelectBookCount } from "../redux/books";
import { SelectAuthorCount } from "../redux/authors";
import { SelectBorrowerCount } from "../redux/borrowers";
import { SelectLoanCount } from "../redux/loans";
import { useDispatch, useSelector } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();
  const bookCount = useSelector(SelectBookCount);
  const borrowerCount = useSelector(SelectBorrowerCount);
  const authorCount = useSelector(SelectAuthorCount);
  const loanCount = useSelector(SelectLoanCount);

  useEffect(() => {
    dispatch(getBooks());
    dispatch(getBorrowers());
    dispatch(getAuthors());
    dispatch(getLoans());
    dispatch(getFines());
  }, [dispatch]);

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="flex space-x-10 m-20 py-20">
          <StatCard Name={"Books"} Amount={bookCount} />
          <StatCard Name={"Authors"} Amount={authorCount} />
          <StatCard Name={"Borrowers"} Amount={borrowerCount} />
          <StatCard Name={"Loans"} Amount={loanCount} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
