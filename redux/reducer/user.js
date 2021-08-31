const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  msg: "",
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_BY_ID_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_USER_BY_ID_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "GET_USER_BY_ID_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        msg: action.payload.response.data.msg,
      };
    case "GET_USER_BY_KEYWORD_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_USER_BY_KEYWORD_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "GET_USER_BY_KEYWORD_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        msg: action.payload.response.data.msg,
      };
    case "UPDATE_USER_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "UPDATE_USER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "UPDATE_USER_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        msg: action.payload.response.data.msg,
      };
    case "UPDATE_USER_IMAGE_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "UPDATE_USER_IMAGE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "UPDATE_USER_IMAGE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        msg: action.payload.response.data.msg,
      };
    case "UPDATE_USER_PASSWORD_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "UPDATE_USER_PASSWORD_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "UPDATE_USER_PASSWORD_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        msg: action.payload.response.data.msg,
      };
    case "INSERT_PIN_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "INSERT_PIN_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "INSERT_PIN_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        msg: action.payload.response.data.msg,
      };
    default:
      return state;
  }
};

export default user;
