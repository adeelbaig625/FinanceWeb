import React from "react";
import Header from "../../Components/Header/Header";
import "./editPayment.css";
import { useNavigate, useParams } from "react-router-dom";
import { GetSinglePayment, UpdatePayment } from "../../DB/FirestoreQueries";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { GetPayment } from "../../query";
function EditPayment() {
  const [title, setTitle] = React.useState("");
  let { paymentid } = useParams();
  const navigate = useNavigate();
  const [description, setDescription] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [duedate, setDueDate] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const { isLoading, data } = GetPayment(paymentid);
  React.useEffect(() => {
    const authref = getAuth();
    const unregisterAuthObserver = onAuthStateChanged(authref, async (user) => {
      if (!user) {
        navigate("/", { replace: true });
      }
    });

    return () => unregisterAuthObserver();
  });
  React.useEffect(() => {
    GetSinglePayment(paymentid).then((res) => {
      setTitle(res.title);
      setAmount(res.amount);
      setDueDate(res.duedate);
      setDescription(res.description);
    });
  }, []);
  const edit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      console.log(amount);
      const UpdatePaymentref = await UpdatePayment(paymentid, {
        title: title,
        description: description,
        amount: amount,
        duedate: duedate,
      }).then((res) => {
        navigate("/home", { replace: true });
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className="EditPayment">
      <Header />
      <h1>Edit Payment</h1>
      <div className="EditPayment-Container">
        {isLoading ? (
          <div></div>
        ) : (
          <form onSubmit={(e) => edit(e)}>
            <input
              placeholder="Title"
              type="text"
              value={data?.title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              placeholder="Description"
              value={data?.title}
              type="text"
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              placeholder="Amount"
              value={data?.amount}
              type="number"
              required
              onChange={(e) => setAmount(e.target.value)}
            />
            <input
              placeholder="Due Date"
              value={data?.duedate}
              type="date"
              required
              onChange={(e) => setDueDate(e.target.value)}
            />
            <button type="submit" disabled={loader}>
              Edit Payment
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default EditPayment;
