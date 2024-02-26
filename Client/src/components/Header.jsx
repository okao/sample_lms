import Logo from "./Logo";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="grid border-8 border-transparent bg-gray-200">
      <div className="">
      <Logo />
        <header>
          <div className="space-x-3 pr-4 flex justify-end">
            <button
              className="block bg-green-700 hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded"
              onClick={() => navigate("/Books")}
            >
              {" "}
              Books{" "}
            </button>
            <button
              className="bg-green-700 hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded"
              onClick={() => navigate("/Authors")}
            >
              {" "}
              Authors{" "}
            </button>
            <button
              className="bg-green-700 hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded"
              onClick={() => navigate("/Borrowers")}
            >
              {" "}
              Borrowers{" "}
            </button>
            <button
              className="bg-green-700 hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded"
              onClick={() => navigate("/Loans")}
            >
              {" "}
              Loans{" "}
            </button>
            <button
              className="bg-green-700 hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded"
              onClick={() => navigate("/Fines")}
            >
              {" "}
              Fines{" "}
            </button>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
