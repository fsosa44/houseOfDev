import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../state/user";

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(lastName);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError(true);
      alert("Las contraseñas no coinciden");
      return;
    } else {
      setError(false);
    }

    if (name === "" || password === "" || email === "" || lastName === "") {
      setError(true);
      return;
    } else setError(false);

    axios
      .post("https://house-api-chi.vercel.app/api/user/register", {
        email: email,
        name: name,
        lastName: lastName,
        password: password,
      })

      .then((res) => {
        dispatch(setUser({ id: res.data.id, name: res.data.name }));
        alert("Registro exitoso");
        navigate("/login");
      })
      .catch((err) => console.log(err));
    console.log(lastName);
  };

  return (
    <div className="mx-auto max-w-md mt-8">
      <form
        className="bg-[#F7F3EE] shadow-xl rounded px-8 pt-6 pb-8 mb-4"
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
            className="bg-[#F7F3EE] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            Nombre
          </label>
          <input
            className="bg-[#F7F3EE] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Apellido
          </label>
          <input
            className="bg-[#F7F3EE] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="lastname"
            type="text"
            placeholder="Apellido"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            className="bg-[#F7F3EE] shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-red-500 text-xs italic">Ingrese una contraseña.</p>
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirmar Contraseña
          </label>
          <input
            className="bg-[#F7F3EE] shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            type="password"
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />

          {error && (
            <p className="text-red-500 text-xs italic">
              Las contraseñas no coinciden.
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-[#FE4236] hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Registrarse
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-red-800"
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
