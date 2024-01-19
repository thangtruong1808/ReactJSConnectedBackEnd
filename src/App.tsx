import { useEffect, useRef, useState } from "react";

import { CanceledError } from "./services/api-client";
import User, { UserProps } from "./services/user-service";
import userService from "./services/user-service";
import useUsers from "./hooks/useUsers";

function App() {
  const { users, error, isLoading, setError, setUsers } = useUsers();

  // Add User
  const AddUser = () => {
    const newUser = { id: 0, name: "thang-truong" };
    setUsers([...users, newUser]);

    userService
      .create(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
      });
  };
  // Delete User
  const DeleteUser = (user: UserProps) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));
    userService.delete(user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  // UpdateUser
  const UpdateUser = (user: UserProps) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + " - has been updated" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    userService.update(updatedUser).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  return (
    <>
      <div className="container mt-5">
        {error && <h5 className="text-danger"> {error}</h5>}
        {isLoading && <div className="spinner-border"></div>}
        <button className="btn btn-primary btn-sm mb-3" onClick={AddUser}>
          Add User
        </button>
        <ul className="list-group">
          {users.map((user) => (
            <li
              className="list-group-item d-flex justify-content-between"
              key={user.id}
            >
              {user.name}
              <div className="">
                <button
                  className="btn btn-outline-primary btn-sm mx-2"
                  onClick={() => UpdateUser(user)}
                >
                  Update
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => DeleteUser(user)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
