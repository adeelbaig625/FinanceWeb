export const PaymentKeys = {
  all: () => ["payments"],
  detail: (id) => [...PaymentKeys.all(), id],
};
