import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { useDataContext } from "../context/data_context";

export const Documents = () => {
  const { id } = useParams();
  const { fetchDocuments, docs } = useDataContext();

  useEffect(() => {
    fetchDocuments(id);
  }, [id]);
  console.log(docs);

  return (
    <div>
      <h1>Mayur</h1>
      <table className="table">
        <thead>
          <tr>
            <th>MSDS</th>
            <th>TC</th>
          </tr>
        </thead>
        <tbody>
          {docs.length !== 0 &&
            docs.MSDS.map((docs) => (
              <tr key={docs.id}>
                <td>{docs.name}</td>
              </tr>
            )) }
        </tbody>
      </table>
    </div>
  );
};
