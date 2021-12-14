import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { useDataContext } from "../context/data_context";

export const Documents = () => {
  const { id } = useParams();
  const { fetchDocuments, docs, sendEmail } = useDataContext();

  const [emailId, setEmailId] = useState("");
  const [subject, setSubject] = useState("");
  const [files, setFiles] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail(emailId, files, subject);
  };

  const attachingFile = (xy) => {
    setFiles((files) => [...files, xy]);
    console.log(files);
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
                    <div className="col">{docs.name}</div>
                    <div className="col-2">
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
                    <div className="col-2">
                      <button
                        className="btn btn-primary"
                        onClick={() => attachingFile(docs.file)}
                      >
                        Attach
                      </button>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="row">
                    <div className="col">{docs.name}</div>
                    <div className="col-2">
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
                    <div className="col-2">
                      <button
                        className="btn btn-primary"
                        onClick={() => attachingFile(docs.file)}
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
          <form onSubmit={handleSubmit} style={{ marginTop: 50 }}>
            <label className="form-label">To Email ID</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={emailId}
              onChange={(e) => setEmailId(e.currentTarget.value)}
              required
            />
            <label className="form-label">Subject</label>
            <input
              type="text"
              className="form-control"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.currentTarget.value)}
              required
            />
            <label className="form-label">Files</label>
            <input
              type="text"
              className="form-control"
              name="files"
              value={files}
              disabled
            />
            <button className="btn btn-primary mt-3">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};
