import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./data_reducer";

const DataContext = createContext();

const initialState = {
  data: [],
  docs: [],
  loading: false,
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/services/");
      dispatch({
        type: "DATA_SUCCESS",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "DATA_FAIL",
        payload: error,
      });
    }
  };

  const fetchDocuments = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/services/${id}`);
      dispatch({
        type: "DOCUMENTS_SUCCESS",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ ...state, fetchData, fetchDocuments }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};
