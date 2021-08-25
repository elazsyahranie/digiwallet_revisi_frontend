import axiosApiIntances from "../../utils/axios";

export const topUpBalance = (id, data) => {
  return {
    type: "TOP_UP_BALANCE",
    payload: axiosApiIntances.post(`balance/top-up/${id}`, data),
  };
};
