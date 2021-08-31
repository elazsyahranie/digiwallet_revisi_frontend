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

export const updateUser = (id, setData) => {
  return {
    type: "UPDATE_USER",
    payload: axiosApiIntances.patch(`/user/${id}`, setData),
  };
};

export const updateUserImage = (id, image) => {
  return {
    type: "UDPATE_USER_IMAGE",
    payload: axiosApiIntances.patch(`user/update-image/${id}`, image),
  };
};

export const updateUserPassword = (id, setData) => {
  return {
    type: "UDPATE_USER_PASSWORD",
    payload: axiosApiIntances.patch(`user/update-password/${id}`, setData),
  };
};

export const insertPin = (id, userPin) => {
  return {
    type: "INSERT_PIN",
    payload: axiosApiIntances.patch(`/user/update-pin/${id}`, userPin),
  };
};
