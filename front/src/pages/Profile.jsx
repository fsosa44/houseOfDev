import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../state/user";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaCheck } from "react-icons/fa";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [name, setName] = useState(user.name);
  const [lastName, setLastName] = useState(user.lastName);
  const [isEditing, setIsEditing] = useState(false);

  const handleChangeName = () => {
    axios
      .put(
        "https://house-api-chi.vercel.app/api/user/profile",
        { name, lastName },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.status === 200) {
          console.log(user.name);
          dispatch(setUser(response.data));
          setIsEditing(false);
        } else {
          console.log("Error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-[#FDF6EE] max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5 profile-container">
      <img
        className="w-32 h-32 rounded-full mx-auto"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwaShegt_FPYXgalLHfcw8k7n7srebcXl86rDDv6_K3RljyjHPySoKEoHFZPsmsb66lK0&usqp=CAU"
        alt="Profile picture"
      />
      {!isEditing && (
        <FaEdit
          className="mt-3 text-blue-500 cursor-pointer"
          onClick={() => setIsEditing(true)}
        />
      )}

      {isEditing && (
        <FaCheck
          className="mt-3 text-green-500 cursor-pointer"
          onClick={handleChangeName}
        />
      )}
      <h3 className="text-xl font-semibold">Nombre</h3>

      <input
        className="text-center text-2xl font-semibold mt-3"
        disabled={!isEditing}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <p className="text-center text-gray-600 mt-1">{user.jobTitle}</p>

      <h3 className="text-xl font-semibold">Apellido</h3>
      <input
        className="text-center text-2xl font-semibold mt-3"
        disabled={!isEditing}
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <div className="mt-5">
        <h3 className="text-xl font-semibold">Email</h3>
        <input
          className="text-center text-2xl font-semibold mt-3"
          disabled={!isEditing}
          value={user.email}
        />
      </div>
    </div>
  );
}
