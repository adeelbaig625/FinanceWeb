import { useMutation, useQuery, useQueryClient } from "react-query";
import { PaymentKeys } from "../Keys";
import { AddPaymentDB, GetSinglePayment } from "./service";
export const useAddPayment = () => {
  return useMutation(({ ...payload }) => {
    return AddPaymentDB(payload);
  });
};

export const GetPayment = (id) =>
  useQuery(PaymentKeys.detail(id), () => GetSinglePayment(id), {
    refetchOnWindowFocus: false,
  });
