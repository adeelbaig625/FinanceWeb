import React from "react";
import { MemoizedHeader } from "../../Components/Header/Header";
import "./addpayment.css";
import { useNavigate } from "react-router-dom";
import { useAddPayment } from "../../query";

function AddPayment() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [duedate, setDueDate] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const {
    mutateAsync: createPayment,
    isLoading: isCreating,
    reset,
  } = useAddPayment();
  const navigate = useNavigate();

  const add = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const { status } = await createPayment({
        title: title,
        description: description,
        amount: amount,
        duedate: duedate,
      });
      console.log(isCreating);
      console.log(status);
      setTitle("");
      setDescription("");
      setAmount("");
      setDueDate("");
      if (status == 200) {
        navigate("/home", { replace: true });
      }
    } catch (e) {
      reset();
      console.log(e);
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className="AddPayment">
      <MemoizedHeader />
      <h1>Add Payment</h1>
      <div className="AddPayment-Container">
        <form onSubmit={(e) => add(e)}>
          <input
            placeholder="Title"
            type="text"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            placeholder="Description"
            value={description}
            type="text"
            required
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            placeholder="Amount"
            value={amount}
            type="number"
            required
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            placeholder="Due Date"
            value={duedate}
            type="date"
            required
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button type="submit" disabled={loader}>
            Add Payment
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPayment;
