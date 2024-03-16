import React, { useEffect, useState } from "react";
import { ApiUrl2 } from "./ApiUrl.jsx";
import axios from "axios";
import EditUsers from "./EditUsers.jsx";
export default function Table({ userRender }) {
  const getApi = async () => {
    const response = await axios.get(ApiUrl2 + "/user");
    setApiData(response.data);
  };
  const handleDelete = async (id) => {
    await axios.delete(ApiUrl2 + "/user/" + id);
    getApi();
  };
  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    getApi();
  }, [userRender]);
  return (
    <div>
      <h3>LIST USER</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Roll</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {apiData.map((user) => (
            <tr key={user.id}>
              <th>{user.id}</th>
              {user.name !== "" || user.roll !== "" ? (
                <>
                  <td>{user.name}</td>
                  <td>{user.roll}</td>
                </>
              ) : (
                <td colSpan={2}>No user</td>
              )}
              <td>
                <EditUsers User={user} id={user.id} getApi={getApi} />
                <button
                  type="button"
                  className=" btn btn-danger"
                  onClick={() => {
                    handleDelete(user.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
