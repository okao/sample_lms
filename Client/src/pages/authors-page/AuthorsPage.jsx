import React from "react";
import "./AuthorsPage.styles.scss";

// components
import { Table } from "antd";
// redux
import { useSelector } from "react-redux";
import { SelectAuthorsWithKeys } from "../../redux/authors/index";

const AuthorsPage = () => {
  const authors = useSelector(SelectAuthorsWithKeys);
  const [authorsDisplayed, setAuthorsDisplayed] = React.useState(authors)
  const [searchContent, setSearchContent] = React.useState("")
  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchContent(e.target.value);
    if (e.target.value.length > 0) {
      let result = authors.filter((author) => {
        if (
          author["author_id"]
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
            author["name"]
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        ) {
          return true;
        } else {
          return false;
        }
      });

      setAuthorsDisplayed(result);
    } else {
      setAuthorsDisplayed(authors);
    }
  };
  
  const columns = [
    {
      title: "Author ID",
      dataIndex: "author_id",
      key: 1,
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: 2,
      align: "center",
    },
  ];
  return (
    <div className="authors-page">
    <input
        onChange={handleSearchChange}
        placeholder={"Search Author ID, Name"}
        className="border border-transparent block mb-4 p-4 pl-4 text-lg text-gray-900 rounded-lg bg-gray-200 dark:text-white"
      />
    <Table
      pagination={{
        position: ["bottomCenter"],
      }}
      dataSource={authorsDisplayed}
      columns={columns}
    />
    </div>
  );
};

export default AuthorsPage;
