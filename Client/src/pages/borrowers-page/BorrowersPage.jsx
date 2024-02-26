import React, { useState } from "react";
// styles
import "./BorrowersPage.styles.scss";
// components
import CustomButton from "../../components/custom-button/CustomButton.component";
import FormInput from "../../components/form-input/FormInput.component";
import { message, Table, Drawer } from "antd";
// redux
import { useDispatch, useSelector } from "react-redux";
import { createBorrower } from "../../redux/borrowers/borrowers.utils";
import { SelectBorrowersWithKeys } from "../../redux/borrowers/index";
// validation
import { validateSsn } from "../../utils/utils";

const initialState = {
  ssn: "",
  bname: "",
  address: "",
  phone: "",
};

const BorrowersPage = () => {
  const dispatch = useDispatch();
  const borrowers = useSelector(SelectBorrowersWithKeys);
  const [borrowersDisplayed, setBorrowersDisplayed] = useState(borrowers)
  const [searchContent, setSearchContent] = useState("")

  const [state, setState] = useState(initialState);
  const [modal, setModal] = useState(false);

  const { ssn, bname, address, phone } = state;

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchContent(e.target.value);
    if (e.target.value.length > 0) {
      let result = borrowers.filter((borrower) => {
        console.log(borrower)
        if (
          String(borrower["ssn"])
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          borrower["phone"]
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          borrower["bname"]
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          borrower["card_id"]
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          borrower["address"]
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        ) {
          return true;
        } else {
          return false;
        }
      });

      setBorrowersDisplayed(result);
    } else {
      setBorrowersDisplayed(borrowers);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const onCancel = (e) => {
    toggleModal();
    setState({ ...initialState });
  };

  const onChange = (e) => {
    setState({ ...state, [e.currentTarget.name]: e.currentTarget.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if(ssn.length != 9){
      message.error( `Error: Please enter an SSN of 9 digits long`, 3)
      return
    }

    if(Number.isNaN(Number(ssn))){
      message.error( `Error: Please enter an SSN with digits only`, 3)
      return
    }

    if(!await validateSsn(ssn)){
      message.error( `Error: Please enter an unique SSN`, 3)
      return
    }
    success();
    dispatch(createBorrower({ ssn, bname, address, phone }));


    // close the modal pop up page
    toggleModal();
    // reset the state
    setState({ ...initialState });
  };

  const success = () => {
    message.info("Request in progress...", 2, () => {
      message.success('Success: New Borrower is added to the system!', 3)
    }
    );
  }


  const columns = [
    { title: "Borrower ID", dataIndex: "card_id", key: 1 },
    { title: "Ssn", dataIndex: "ssn", key: 2 },
    { title: "Full Name", dataIndex: "bname", key: 3 },
    { title: "Home Address", dataIndex: "address", key: 4 },
    { title: "Phone", dataIndex: "phone", key: 5 },
  ];

  return (
    <div className="borrowers-page w-auto">
      {/* <div className="pb-4 pt-4 "> */}
      <input
        onChange={handleSearchChange}
        placeholder={"Search Borrower ID, SSN, Full Name, Address, Phone"}
        className="border border-transparent block mb-4 p-4 pl-4 text-lg text-gray-900 rounded-lg bg-gray-200 dark:text-white"
      />
        <CustomButton onClick={toggleModal}>
          ADD BORROWER
        </CustomButton>
        <Drawer
          title="Add Borrower"
          placement="right"
          onClose={toggleModal}
          open={modal}
        >
          <form onSubmit={onSubmit}>
            <FormInput
              name="ssn"
              type="text"
              label="SSN"
              value={ssn}
              onChange={onChange}
              required
            />
            <FormInput
              name="bname"
              type="text"
              label="Full Name"
              value={bname}
              onChange={onChange}
              required
            />
            <FormInput
              name="address"
              type="text"
              label="Billing Address"
              value={address}
              onChange={onChange}
              required
            />
            <FormInput
              name="phone"
              type="text"
              label="Phone Number"
              value={phone}
              onChange={onChange}
              required
            />
            <div className="flex justify-between">
              <CustomButton>Submit</CustomButton>
              <CustomButton onClick={onCancel}>CANCEL</CustomButton>
            </div>
          </form>
        </Drawer>
      {/* </div> */}
      <div className="container">
        <Table dataSource={borrowersDisplayed} columns={columns} />
      </div>
    </div>
  );
};

export default BorrowersPage;
