import React from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UpdatePayment } from "../../DB/FirestoreQueries";
import { MemoizedHeader } from "../../Components/Header/Header";
import { useAuth } from "../../Context/AuthContext";
function Home() {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const { user } = useAuth();
  React.useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "Users", user.uid, "Payments"),
        where("isDelete", "==", false)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const payments = [];
        querySnapshot.forEach((doc) => {
          payments.push({ id: doc.id, ...doc.data() });
        });
        setData(payments);
      });
      return () => unsubscribe();
    }
  });
  const updateStatus = (id, status) => {
    UpdatePayment(id, { status: status });
  };

  const deletePayment = (id) => {
    UpdatePayment(id, { isDelete: true });
  };
  return (
    <div className="home">
      <MemoizedHeader />
      <div className="home-inner-container">
        <h2>Payments</h2>
        <div className="home-inner-right-container">
          <button onClick={() => navigate("/addpayment")}>Add Payment</button>
        </div>
      </div>
      <div className="payment-table">
        <div className="table-name-div">
          <div className="table-col">S.NO</div>
          <div className="table-col">Title</div>
          <div className="table-col">Description</div>
          <div className="table-col">Amount</div>
          <div className="table-col">Due date</div>
          <div className="table-col">Status</div>
          <div className="table-col"></div>
        </div>
        {data?.map((d, index) => (
          <div className="table-data-div">
            <div className="table-col">{index + 1}</div>
            <div className="table-col">{d.title}</div>
            <div className="table-col">{d.description}</div>
            <div className="table-col">{d.amount}</div>
            <div className="table-col">{d.duedate}</div>

            <div className="table-switch-btn">
              <p
                style={{
                  backgroundColor: d.status ? "transparent" : "#a00b24",
                }}
                onClick={() => updateStatus(d.id, false)}
              >
                Not paid
              </p>
              <p
                style={{
                  backgroundColor: d.status ? "#7be495" : "transparent",
                }}
                onClick={() => updateStatus(d.id, true)}
              >
                Paid
              </p>
            </div>
            <div className="table-col">
              <img
                src="/assets/edit.png"
                onClick={() => navigate(`/editpayment/${d.id}`)}
              />
              <img
                src="/assets/remove.png"
                onClick={() => deletePayment(d.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
