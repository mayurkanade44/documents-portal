import React, {useState} from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { useDataContext } from "../context/data_context";

export const Documents = () => {
  const { id } = useParams();
  const { fetchDocuments, docs, sendEmail } = useDataContext();

  const [emailId, setEmailId] = useState("");
  const [subject, setSubject] = useState("");
  const [files, setFiles] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail(emailId, files, subject);
  };

  const attachingFile = (xy) => {
    setFiles(files => [...files, xy])
    console.log(files)
  }

  useEffect(() => {
    fetchDocuments(id);
  }, [id]);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>MSDS</th>
            <th>TC</th>
          </tr>
        </thead>
        <tbody>
          {docs.length !== 0 &&
            docs.msds.map((docs) => (
              <tr key={docs.id}>
                <td>{docs.name}</td>
                <td>
                  <a href={`http://127.0.0.1:8000${docs.file}`} download>
                    Download
                  </a>
                </td>
                <button onClick={() => attachingFile(docs.file)}>Attach</button>
              </tr>
            ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit} style={{ marginTop: 10 }}>
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
        />
        <button className="btn btn-primary">Send</button>
      </form>
    </div>
  );
};
