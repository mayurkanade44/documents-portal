const data_reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":{
      return {
        ...state,
        loading: true
      }
    }
    case "DATA_SUCCESS":
      return {
        ...state,
        loading: true,
        error: null,
        data: action.payload,
      };
    case "DATA_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "DOCUMENTS_SUCCESS":
      return {
        ...state,
        loading: true,
        error: null,
        docs: action.payload,
      };
    case "EMAIL":
      return {
        ...state,
        loading: false,
        error: null,
        msg: action.payload,
      };
    case "CLEAR MESSAGE":
      return {
        ...state,
        msg: "",
      };
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.access);
      localStorage.setItem("user", action.payload.name);
      return {
        ...state,
        token: localStorage.getItem("token"),
        loading: false,
        isAuthenticated: true,
        error: null,
        user: localStorage.getItem("user"),
      };
    case "LOGIN_FAIL":
    case "LOGOUT":
      return {
        ...state,
        token: localStorage.removeItem("token"),
        isAuthenticated: false,
        loading: false,
        error: action.payload,
        user: localStorage.removeItem("user"),
      };

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default data_reducer;
