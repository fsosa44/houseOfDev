import React from "react";
import "./components/form.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Cambiado de useHistory a useNavigate

export default function Register({ setUser }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate(); // Cambiado de useHistory a useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || password === "" || email === "") {
      setError(true);
      return;
    } else setError(false);
    setUser([name]);
    axios
      .post("http://localhost:3001/api/register", {
        email: email,
        name: name,
        password: password,
      })
      .then((res) => {
        alert("Registro exitoso");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="mx-auto max-w-md mt-8">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="usuario@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-red-500 text-xs italic">Ingrese una contraseña.</p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Registrarse
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="/login"
          >
            Ya tienes una cuenta?
          </a>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs"></p>
    </div>
  );
}
