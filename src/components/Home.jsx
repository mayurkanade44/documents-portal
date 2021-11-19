import { Link } from "react-router-dom";
import { useDataContext } from "../context/data_context";

export const Home = () => {
  const { data } = useDataContext();

  return (
    <div>
      <h1>MSDS/TC Documents Portal</h1>
      <table className="table table-hover">
        <thead>
          <tr style={{ paddingRight: 500 }}>
            <th>Pest</th>
            <th>Services</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data) => (
            <tr key={data.id}>
              <td>{data.pets_name}</td>
              <Link
                to={`/documents/${data.id}`}
                style={{ textDecoration: "none" }}
              >
                <td>{data.title}</td>
              </Link>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
