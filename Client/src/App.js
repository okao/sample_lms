import { Route, Routes } from "react-router-dom";
// pages
import HomePage from "./pages/HomePage";
import LoansPage from "./pages/loans-page/LoansPage";
import FinesPage from "./pages/fines-page/FinesPage";
import ErrorPage from "./pages/ErrorPage";
import BooksPage from "./pages/books-page/BooksPage";
import BorrowersPage from "./pages/borrowers-page/BorrowersPage";
import AuthorsPage from "./pages/authors-page/AuthorsPage";
// components
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Books" element={<BooksPage />} />
        <Route path="/Authors" element={<AuthorsPage />} />
        <Route path="/Borrowers" element={<BorrowersPage />} />
        <Route path="/Loans" element={<LoansPage />} />
        <Route path="/Fines" element={<FinesPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
