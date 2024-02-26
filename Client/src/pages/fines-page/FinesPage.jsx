import React, { useState, useEffect } from "react";
import moment from "moment";
// components
import { Table, Tag, message, Input } from "antd";
import CustomButton from "../../components/custom-button/CustomButton.component";
// redux
import { useDispatch, useSelector } from "react-redux";
import { SelectBorrowersWithKeys } from "../../redux/borrowers";
import { SelectFines, filter as FilterFines } from "../../redux/fines";
import { SelectLoans } from "../../redux/loans";
import {
  getFines,
  refreshFines,
  updateFines,
  updateFine,
} from "../../redux/fines/fines.utils";

// validation methods
import { validatePayment, validatMultiplePayments } from "../../utils/utils";

const FinesPage = () => {
  // DISPATCH WILL ALLOW FOR ACTIONS TO CHANGE STORE
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFines());
  }, [dispatch]);

  // SELECTORS WILL GET THE DATA FROM THE STORE
  const fines = useSelector(SelectFines);
  const loans = useSelector(SelectLoans);
  const borrowers = useSelector(SelectBorrowersWithKeys);
  // LOCAL STATES
  const [dayCount, setDayCount] = useState(1);
  const [filtered, setFiltered] = useState(false);
  const [editingKey, setEditingKey] = useState(0);
  const [enteredAmount, setEnteredAmount] = useState(0);
  const [clickedFullPay, setclickedFullPay] = useState(false);
  const [clickedSinglePay, setclickedSingePay] = useState(false);

  const loansCombinedUnderBorrowerID = Object.values(
    loans.reduce((acc, { card_id, loan_id }) => {
      acc[card_id] ??= { card_id: card_id, loans: [] };
      acc[card_id].loans.push(loan_id);

      return acc;
    }, {})
  );

  const loansDict = Object.fromEntries(
    loansCombinedUnderBorrowerID.map((item) => [item.card_id, item.loans])
  );

  const finesDict = Object.fromEntries(
    fines.map(({ loan_id, fine_amount, paid }) => [
      loan_id,
      { loan_id, fine_amount, paid },
    ])
  );

  const outerTableData = borrowers.map((current_borrower) => {
    // FIND THE LOANS ASSOCIATED WITH THE CURRENT BORROWER USING THE LOANS DICTIONARY
    const borrower_loansIDs = loansDict[current_borrower.card_id]
      ? loansDict[current_borrower.card_id]
      : [];

    let borrower_fines = [];

    // FIND THE FINES ASSOCIATED WITH THE CURRENT BORROWER'S LOAN IDs USING THE FINES DICTIONARY
    borrower_loansIDs.forEach((current_loan_id, index) => {
      const fine = finesDict[current_loan_id];
      if (fine) {
        borrower_fines.push({ ...fine, key: index + 1 });
      }
    });

    let total_fine_amount = 0;

    if (borrower_fines.length) {
      total_fine_amount = borrower_fines.reduce(
        (accumulator, { fine_amount }) => accumulator + fine_amount,
        0
      );
    }

    return { ...current_borrower, borrower_fines, total_fine_amount };
  });

  const startSinglePayment = async (fine) => {
    // RESET THE EDITING KEY
    setEditingKey(0);
    if (await validatePayment(fine.loan_id)) {
      setEditingKey(fine.key) && setclickedSingePay(true);
    } else {
      errorSingleFine(fine.loan_id);
    }
  };

  const processSinglePayment = (fine) => {
    const { loan_id, fine_amount, paid } = fine;
    const balance_left = fine_amount - enteredAmount;
    dispatch(
      updateFine({
        loan_id: loan_id,
        fine: { loan_id: loan_id, fine_amount: balance_left, paid: paid },
      })
    );
    setclickedSingePay(false);
    successSingleFine(balance_left);
    setEnteredAmount(0);
  };

  const startBatchPayment = async ({ card_id, borrower_fines, key }) => {
    // RESET THE EDITING KEY
    setEditingKey(0);
    const loan_ids = borrower_fines.map((fine) => {
      return fine.loan_id;
    });
    if (await validatMultiplePayments(loan_ids)) {
      setEditingKey(key) && setclickedFullPay(true);
    } else {
      errorMultipleFines(card_id);
    }
  };

  // TODO FINISH THIS FUNC
  const processBatchPayment = ({ borrower_fines }) => {
    const fines_to_be_updated = borrower_fines
      .filter((fine) => fine.paid !== true)
      .map((fine) => {
        return fine.loan_id;
      });

    dispatch(updateFines(fines_to_be_updated));
    setclickedFullPay(false);
    successMultipleFines();
    setEnteredAmount(0);
  };

  const handleTableRefresh = () => {
    const today = moment().add(dayCount, "day");
    dispatch(refreshFines({ date: today }));
    setDayCount(dayCount + 1);
  };

  const handleFiltering = () => {
    dispatch(FilterFines());
    setFiltered(true);
  };

  const handleReset = () => {
    dispatch(getFines());
    setFiltered(false);
  };

  const onChange = (e) => {
    setEnteredAmount(e.currentTarget.value);
  };

  const isEditing = (rowKey) => {
    return rowKey === editingKey;
  };

  const successSingleFine = (balance_left) =>
    message.info("Action in progress...", 2, () =>
      message.success(
        `Success: Payment went through!! Remaining Balance: $${balance_left}!!`,
        3
      )
    );

  const errorSingleFine = (loan_id) => {
    message.info("Action in progress...", 2, () =>
      message.error(
        `Error: Payment not allowed... Book with loan ID ${loan_id} has been returned yet.`,
        3
      )
    );
  };

  const successMultipleFines = () =>
    message.info("Action in progress...", 2, () =>
      message.success(
        `Success: Payment went through!! Remaining Balance: $0!!`,
        3
      )
    );

  const errorMultipleFines = (card_id) => {
    message.info("Action in progress...", 2, () =>
      message.error(
        `Error: Payment not allowed... One or more books associated with Borrower ID ${card_id} have not been returned yet.`,
        3
      )
    );
  };

  const expandedRowRender = (record) => {
    const columns = [
      {
        title: "Loan ID",
        dataIndex: "loan_id",
        key: 1,
        align: "center",
      },
      {
        title: "Fine Amount",
        dataIndex: "fine_amount",
        key: 2,
        align: "center",
        render: (_, { fine_amount }) => <span>${fine_amount}</span>,
      },
      {
        title: "Status",
        dataIndex: "paid",
        key: 3,
        align: "center",
        render: (_, record) =>
          record.paid ? (
            <Tag color="green">PAID</Tag>
          ) : (
            <Tag color="volcano">NOT PAID</Tag>
          ),
      },
      {
        title: "Action",
        dataIndex: "action",
        key: 4,
        align: "center",
        width: !clickedSinglePay ? 150 : 200,
        render: (_, record) =>
          record.fine_amount ? (
            !isEditing(record.key) && !clickedSinglePay ? (
              <CustomButton onClick={() => startSinglePayment(record)} small>
                Pay Fine
              </CustomButton>
            ) : (
              <Input.Group compact>
                <Input
                  style={{
                    height: 30,
                    width: "55%",
                  }}
                  placeholder={`$${record.fine_amount}`}
                  onChange={onChange}
                />
                <CustomButton
                  extra_small
                  onClick={() => processSinglePayment(record)}
                >
                  Submit
                </CustomButton>
              </Input.Group>
            )
          ) : (
            <Tag style={{ fontSize: 13, padding: 5 }} color="default">
              NO PAYMENT DUE
            </Tag>
          ),
      },
    ];
    return (
      <Table
        rowKey={(record) => record.loan_id}
        dataSource={record.borrower_fines}
        columns={columns}
        pagination={false}
      />
    );
  };

  // TODO STYLE THE SPANS
  const columns = [
    {
      title: "Borrower ID",
      dataIndex: "card_id",
      key: 1,
      align: "center",
      width: 150,
    },
    {
      title: "Name",
      dataIndex: "bname",
      key: 2,
      align: "center",
      width: 200,
    },
    {
      title: "SSN",
      dataIndex: "ssn",
      key: 3,
      align: "center",
    },
    {
      title: "Total Fine Amount",
      dataIndex: "total_fine_amount",
      key: 4,
      align: "center",
      render: (_, { total_fine_amount }) => <span>${total_fine_amount}</span>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: 5,
      align: "center",
      width: !clickedFullPay ? 150 : 200,
      render: (_, record) =>
        record.total_fine_amount ? (
          !isEditing(record.key) & !clickedFullPay ? (
            <CustomButton onClick={() => startBatchPayment(record)} small>
              Pay All Fines
            </CustomButton>
          ) : (
            <Input.Group compact>
              <Input
                style={{
                  height: 30,
                  width: "55%",
                  fontSize: 15,
                }}
                placeholder={`$${record.total_fine_amount}`}
                onChange={onChange}
              />
              <CustomButton
                extra_small
                onClick={() => processBatchPayment(record)}
              >
                Submit
              </CustomButton>
            </Input.Group>
          )
        ) : (
          <Tag style={{ fontSize: 13, padding: 5 }} color="default">
            NO PAYMENT DUE
          </Tag>
        ),
    },
  ];

  return (
    <div className="">
      <div className="flex justify-center pt-4 pb-4">
        {!filtered ? (
          <CustomButton onClick={handleFiltering} wide>
            Filter Paid Fines
          </CustomButton>
        ) : (
          <CustomButton onClick={handleReset}>Reset</CustomButton>
        )}
        <CustomButton onClick={handleTableRefresh} wide>
          Refresh Fines
        </CustomButton>
      </div>
      <Table
        className="container mx-auto"
        pagination={{
          position: ["bottomCenter"],
        }}
        rowKey={(record) => record.card_id}
        expandable={{
          expandedRowRender,
          defaultExpandAllRows: false,
          rowExpandable: (record) => record.borrower_fines.length,
        }}
        columns={columns}
        dataSource={outerTableData}
      />
    </div>
  );
};

export default FinesPage;
