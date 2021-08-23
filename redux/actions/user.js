import axiosApiIntances from "../../utils/axios";

export const getUserbyId = (id) => {
  return {
    type: "GET_USER_BY_ID",
    payload: axiosApiIntances.get(`/user/${id}`),
  };
};

export const getUserbyKeyword = (keyword) => {
  return {
    type: "GET_USER_BY_KEYWORD",
    payload: axiosApiIntances.get(`/user/keyword?keyword=${keyword}`),
  };
};
