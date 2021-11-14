import React, { useEffect, useState } from "react";
import { useDataContext } from "../context/data_context";

export const Home = () => {
  const { data } = useDataContext();
  console.log(data);

  return (
    <div>
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
              <td>{data.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
