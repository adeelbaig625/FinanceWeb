import React from "react";
import { MemoizedHeader } from "../../Components/Header/Header";
import "./editPayment.css";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { GetSinglePayment, UpdatePayment } from "../../DB/FirestoreQueries";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { GetPayment } from "../../query";
function EditPayment() {
  let { paymentid } = useParams();
  const navigate = useNavigate();

  const [loader, setLoader] = React.useState(false);
  const { isLoading, data } = GetPayment(paymentid);
  // const RegisterSchema = Yup.object().shape({
  //   title: Yup.string().required("Title is required"),
  //   description: Yup.string().required("description is required"),
  //   amount: Yup.string().required("Amount is required"),
  //   date: Yup.date().required("Date is required"),
  // });

  const defaultValues = {
    title: data?.title,
    description: data?.description,
    amount: data?.amount,
    date: data?.duedate,
  };

  const { register, handleSubmit, reset } = useForm({
    defaultValues,
  });

  React.useEffect(() => {
    reset(defaultValues);
  }, [data?.title]);

  const edit = async (e) => {
    console.log(e);
    setLoader(true);
    try {
      const UpdatePaymentref = await UpdatePayment(paymentid, {
        title: e.title,
        description: e.description,
        amount: e.amount,
        duedate: e.date,
      }).then((res) => {
        navigate("/home", { replace: true });
        console.log(res);
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className="EditPayment">
      <MemoizedHeader />
      <h1>Edit Payment</h1>
      <div className="EditPayment-Container">
        {isLoading ? (
          <div></div>
        ) : (
          <form onSubmit={handleSubmit(edit)}>
            <input placeholder="Title" type="text" {...register("title")} />
            <input
              placeholder="Description"
              type="text"
              {...register("description")}
            />
            <input placeholder="Amount" type="number" {...register("amount")} />
            <input placeholder="Due Date" type="date" {...register("date")} />
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
