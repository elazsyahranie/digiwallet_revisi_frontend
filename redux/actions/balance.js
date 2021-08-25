import axiosApiIntances from "../../utils/axios";

export const topUpBalance = (id, balanceTopUp) => {
  return {
    type: "TOP_UP_BALANCE",
    payload: axiosApiIntances.patch(`balance/top-up/${id}`, balanceTopUp),
  };
};
