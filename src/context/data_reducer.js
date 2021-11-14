const data_reducer = (state, action) => {
  switch (action.type) {
    case "DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case "DATA_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default data_reducer;
