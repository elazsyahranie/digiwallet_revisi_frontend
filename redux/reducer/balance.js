const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  msg: "",
};

const balance = (state = initialState, action) => {
  switch (action.type) {
    case "TOP_UP_BALANCE_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "TOP_UP_BALANCE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "TOP_UP_BALANCE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: {},
        msg: action.payload.response.data.msg,
      };
    default:
      return state;
  }
};

export default balance;
