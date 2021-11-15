import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDataContext } from "../context/data_context";

export const Home = () => {
  const { data } = useDataContext();

  return (
    <div>
      <h1>MSDS/TC Documents Portal</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Pest</th>
            <th>Services</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data) => (
            <tr key={data.id}>
              <td>{data.pest}</td>
              <Link
                to={`/documents/${data.id}`}
                style={{ textDecoration: "none" }}
              >
                <td>{data.name}</td>
              </Link>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
