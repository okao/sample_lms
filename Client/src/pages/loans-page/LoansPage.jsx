import React, { useState, useRef } from "react";
import moment from "moment";
// styles
import "./LoansPage.styles.scss";
// componenents
import { SearchOutlined } from "@ant-design/icons";
import { Table, Input, Space, Tag } from "antd";
import Highlighter from "react-highlight-words";
import CustomButton from "../../components/custom-button/CustomButton.component";
// redux
import { useSelector, useDispatch } from "react-redux";
import { SelectLoansWithKeys } from "../../redux/loans";
import { SelectBorrowers } from "../../redux/borrowers";
import { updateLoan, updateLoans } from "../../redux/loans/loans.utils";

const LoansPage = () => {
  const dispatch = useDispatch();
  const borrowers = useSelector(SelectBorrowers);
  const loans = useSelector(SelectLoansWithKeys);

  const searchInput = useRef(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const data = loans.map((loan) => {
    const { bname } = borrowers.find(
      (borrower) => borrower.card_id === loan.card_id
    );
    return {
      ...loan,
      bname: bname,
    };
  });

  const handleSingleCheckIn = (record) => {
    // UTC IS THE DEFAULT TIME ZONE
    const today = moment();
    const { loan_id, card_id, isbn, date_out, date_in, due_date } = record;
    const updatedLoan = {
      ...{ loan_id, isbn, card_id, date_out, due_date, date_in },
      date_in: today,
    };

    dispatch(updateLoan({ loan_id: record.loan_id, loan: updatedLoan }));
    // CLEAR THE SELECTION OF THE ROWS WITH THE KEY SAME AS THIS.RECORD'S KEY
    setSelectedRowKeys(selectedRowKeys.filter((key) => key !== record.key));
  };

  const handleMultipleCheckIn = () => {
    // TO MADE A BATCH UPDATE TO THE SERVER
    const selectedLoans = selectedRowKeys.map((key) =>
      loans.find((loan) => loan.key === key)
    );

    const today = moment();
    const updatedLoans = selectedLoans.map((loan) => {
      return { loan_id: loan.loan_id, date_in: today };
    });

    dispatch(updateLoans(updatedLoans));

    // CLEAR THE SELECTION
    setSelectedRowKeys([]);
  };

  // TO KEEP TRACK OF THE SELECTED ROWS
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    // "2022-11-24T00:00:00.000Z" IS BEING USED FOR TESTING PURPOSES ONLY
    getCheckboxProps: (record) => {
      if (record.date_in !== null)
        return {
          disabled: true,
        };
    },
  };

  // TO ENABLE SEARCH FUNCTIONALITY
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  // TO ENABLE SEARCH FUNCTIONALITY
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  // SEARCH LOGIC
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 10,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
            height: 30,
          }}
        />
        <Space>
          <CustomButton
            extra_small
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
          >
            Search
          </CustomButton>
          <CustomButton
            extra_small
            onClick={() =>
              clearFilters && handleReset(clearFilters, selectedKeys, dataIndex)
            }
          >
            Reset
          </CustomButton>
          <CustomButton
            extra_small
            onClick={() => {
              close();
            }}
          >
            Cancel
          </CustomButton>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : "#006A4E",
          fontWeight: "bold",
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Loan ID",
      dataIndex: "loan_id",
      key: 1,
      align: "center",
      width: 150,
      ...getColumnSearchProps("loan_id"),
    },
    { title: "ISBN", dataIndex: "isbn", key: 2, align: "center", width: 150 },
    {
      title: "Borrower Name",
      dataIndex: "bname",
      key: 3,
      align: "center",
      width: 150,
      ...getColumnSearchProps("bname"),
    },
    {
      title: "Borrower ID",
      dataIndex: "card_id",
      key: 4,
      align: "center",
      width: 150,
      ...getColumnSearchProps("card_id"),
    },
    {
      title: "Check-out Date",
      dataIndex: "date_out",
      key: 5,
      align: "center",
      width: 150,
    },
    {
      title: "Due Date",
      dataIndex: "due_date",
      key: 6,
      align: "center",
      width: 150,
    },
    {
      title: "Check-in Date",
      dataIndex: "date_in",
      key: 7,
      align: "center",
      width: 150,
      sorter: (a, b) => {
        a = a.date_in || "";
        b = b.date_in || "";
        return a.localeCompare(b);
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: 8,
      align: "center",
      width: 150,
      // CONDITIONALLY RENDER BUTTON
      render: (_, record) =>
        !record.date_in ? (
          <CustomButton onClick={() => handleSingleCheckIn(record)} small>
            Check in now
          </CustomButton>
        ) : (
          <Tag style={{ fontSize: 13, padding: 5 }} color="default">
            ALREADY CHECKED IN
          </Tag>
        ),
    },
  ];

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      <div className="flex justify-center w-full pt-4 pb-4">
        <CustomButton onClick={handleMultipleCheckIn} wide>
          Check in all
        </CustomButton>
        <span>
          {hasSelected ? `Selected ${selectedRowKeys.length} loans` : ""}
        </span>
      </div>
      <div className="container mx-auto">
      <Table
        pagination={{
          position: ["bottomCenter"],
        }}
        rowSelection={rowSelection}
        dataSource={data}
        columns={columns}
      />
      </div>
    </div>
  );
};

export default LoansPage;
