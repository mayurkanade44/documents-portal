import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./data_reducer";

const DataContext = createContext();

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  user: localStorage.getItem("user"),
  data: [],
  docs: [],
  loading: false,
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (username, password) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        { username: username, password: password },
        config
      );
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "LOGIN_FAIL",
        payload: error.response.data.detail,
      });
    }
  };

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    // };

    try {
      const res = await axios.get("http://127.0.0.1:8000/api/services/");
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
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/services/${id}`,
        config
      );
      dispatch({
        type: "DOCUMENTS_SUCCESS",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const sendEmail = async (email, files, subject) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/email/",
        {
          email: email,
          files: files,
          subject: subject
        },
        config
      );
      dispatch({
        type: "EMAIL",
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
    <DataContext.Provider
      value={{ ...state, fetchData, fetchDocuments, login, sendEmail }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};
