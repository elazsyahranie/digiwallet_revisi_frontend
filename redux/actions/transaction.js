import axiosApiIntances from "../../utils/axios";

export const makeTransaction = (data) => {
  return {
    type: "MAKE_TRANSACTION",
    payload: axiosApiIntances.post("transaction/insertransaction", data),
  };
};
