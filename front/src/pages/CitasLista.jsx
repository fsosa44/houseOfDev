import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

function CitasLista() {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    axios
      .get("https://house-api-chi.vercel.app/api/citas/citas-lista")
      .then((response) => {
        setCitas(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener citas:", error);
      });
  }, []);
  const handleDeleteCita = (citaId) => {
    axios.delete(`https://house-api-chi.vercel.app/api/admin/citas/${citaId}`).then(() => {
      const updateCitas = citas.filter((cita) => cita.id !== citaId);
      setCitas(updateCitas);
    });
  };

  return (
    <div className="max-w-md mx-auto mt-8 shadow-md p-6">
      <ul className="max-w-xs flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
        {citas.map((cita) => (
          <li
            key={cita.id}
            className="flex justify-between items-center py-3 px-4 text-sm font-medium text-gray-800 dark:text-black"
          >
            <div>
              <p>Fecha: {cita.fecha}</p>
              <p>Hora: {cita.hora}</p>
              <p>Usuario: {cita.user.name}</p>
              <p>Email: {cita.user.email}</p>
            </div>
            <button
              className="text-red-500 hover:text-red-700 focus:outline-none"
              onClick={() => handleDeleteCita(cita.id)}
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CitasLista;
