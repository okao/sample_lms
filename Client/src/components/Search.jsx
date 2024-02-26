import { useState } from "react";

const Search = () => {
  // SET STATE FOR SHOW SEARCH ICON
  const [showSearchIcon, setShowSearchIcon] = useState(true);

  const handleChange = (event) => {
    if (event.target.value.length > 0) {
      console.log(event.target.value.length);
      setShowSearchIcon(false);
    } else {
      setShowSearchIcon(true);
    }
  };

  return (
    <form>
      <div className="relative">
        <input
          onChange={handleChange}
          type="search"
          id="default-search"
          className="border border-transparent block w-96  p-4 pl-4 text-sm text-gray-900 rounded-lg bg-gray-50 dark:text-white"
          placeholder="Search..."
          required
        ></input>

        {showSearchIcon ? (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400 "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        ) : null}
      </div>
    </form>
  );
};

export default Search;
