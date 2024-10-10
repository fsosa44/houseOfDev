import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://house-api-chi.vercel.app/api/admin/users")
      .then((response) => {
        console.log("Datos de usuarios:", response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`https://house-api-chi.vercel.app/api/admin/users/${userId}`);
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-8 shadow-md p-6">
      <ul className="max-w-xs flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex justify-between items-center py-3 px-4 text-sm font-medium text-gray-800 dark:text-black"
          >
            <div>
              {user.name} - {user.email}
            </div>
            <button
              className="text-red-500 hover:text-red-700 focus:outline-none"
              onClick={() => handleDeleteUser(user.id)}
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
