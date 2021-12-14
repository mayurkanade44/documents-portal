import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { useDataContext } from "../context/data_context";
import { Alert } from "./Alert";

export const Documents = () => {
  const { id } = useParams();
  const { fetchDocuments, docs, sendEmail, msg } = useDataContext();
  const [alert, setAlert] = useState({
    show: false,
    message: "",
  });

  const showAlert = (show = false, message = " ") => {
    setAlert({ show, message });
  };

  const [emailId, setEmailId] = useState("");
  const [files, setFiles] = useState([]);
  const [fileName, setFileName] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail(emailId, files, fileName);
    showAlert(true, msg);
  };

  const attachingFile = (file, name) => {
    setFiles((files) => [...files, file]);
    setFileName((names) => [...names, name]);
  };

  useEffect(() => {
    fetchDocuments(id);
  }, [id]);

  return (
    <div>
      <table className="table table-bordered border-dark mt-5">
        <thead>
          <tr>
            <th className="text-center">MSDS</th>
            <th className="text-center">TC</th>
          </tr>
        </thead>
        <tbody>
          {docs.length !== 0 &&
            docs.msds.map((docs) => (
              <tr key={docs.id}>
                <td>
                  <div className="row">
                    <div className="col-md-6">{docs.name}</div>
                    <div className="col-md-3">
                      <button className="btn btn-dark">
                        <a
                          style={{ textDecoration: "none", color: "white" }}
                          href={`http://127.0.0.1:8000${docs.file}`}
                          download
                        >
                          Download
                        </a>
                      </button>
                    </div>
                    <div className="col-md-3">
                      <button
                        className="btn btn-primary"
                        onClick={() => attachingFile(docs.file, docs.name)}
                      >
                        Attach
                      </button>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="row">
                    <div className="col col-md-4">{docs.name}</div>
                    <div className="col-2 col-md-4">
                      <button className="btn btn-dark">
                        <a
                          style={{ textDecoration: "none", color: "white" }}
                          href={`http://127.0.0.1:8000${docs.file}`}
                          download
                        >
                          Download
                        </a>
                      </button>
                    </div>
                    <div className="col-2 col-md-4">
                      <button
                        className="btn btn-primary"
                        onClick={() => attachingFile(docs.file, docs.name)}
                      >
                        Attach
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {alert.show && msg && <Alert {...alert} removeAlert={showAlert} />}
          <form onSubmit={handleSubmit} style={{ marginTop: 30 }}>
            <label className="form-label">To Email ID</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={emailId}
              onChange={(e) => setEmailId(e.currentTarget.value)}
              required
            />
            <label className="form-label">Files</label>
            <input
              type="text"
              className="form-control"
              name="files"
              value={fileName}
              disabled
            />
            <button className="btn btn-primary mt-3">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};
