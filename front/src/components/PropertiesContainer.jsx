import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaDollarSign } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

function PropertiesContainer() {
  const [properties, setProperties] = useState([]);
  const [buscar, setBuscar] = useState("");

  const user = useSelector((state) => state.user);

  const handleDeleteProperty = (propertyId) => {
    axios
      .delete(`http://localhost:3001/api/properties/propiedades/${propertyId}`)
      .then(() => {
        const updatedProperties = properties.filter(
          (property) => property.id !== propertyId
        );
        setProperties(updatedProperties);
      })
      .catch((error) => {
        console.error("Error al eliminar propiedad:", error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/properties/propiedades")
      .then((res) => {
        setProperties(res.data);
      });
  }, []);

  const handleSearch = (e) => {
    setBuscar(e.target.value);
  };

  const propertiesContainerStyle = {
    backgroundColor: "#F7F3EE",
  };

  return (
    <div className="min-h-[100vh] w-[100%]">
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <div className="mb-3 xl:w-96">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
              <input
                type="search"
                className="relative m-0 block flex-auto rounded border border-solid border-[#dccebe] bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary shadow-md"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon2"
                value={buscar}
                onChange={handleSearch}
              />

              <span
                className={`input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal ${
                  user.isAdmin ? "text-blue-800" : "text-red-500"
                }`}
              >
                <FaSearch />
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {properties
            .filter(
              (property) =>
                property.barrio.toLowerCase().includes(buscar.toLowerCase()) ||
                property.ubicacion.toLowerCase().includes(buscar.toLowerCase())
            )
            .map((property, index) => (
              <div
                key={index}
                className="bg-[#fdf6ee] rounded-lg border p-4 transition-transform transform hover:shadow-md duration-300"
              >
                <Link to={`/propiedades/${property.id}`}>
                  <img
                    src={property.img}
                    alt={`Property ${index + 1}`}
                    className="w-full h-48 rounded-md object-cover"
                  />
                </Link>
                <div className="px-1 py-4">
                  <div className="font-bold text-xl mb-2">
                    {property.ubicacion}
                  </div>
                  <p className="text-gray-700 text-base">
                    {property.descripcion}
                  </p>
                </div>
                <div
                  className={`flex items-center justify-between px-1 py-4 ${
                    user.isAdmin ? "text-blue-800" : "text-red-500"
                  }`}
                >
                  <div className="flex items-center">
                    <FaDollarSign className="mr-2" />
                    <p className="font-bold">{property.precio}</p>
                  </div>
                  <div className="flex items-center">
                    <FaBed className="mr-2" />
                    <p>{property.cantidadAmbientes}</p>
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2" />
                    <p>{property.barrio}</p>
                  </div>
                  {user.isAdmin && (
                    <button
                      className={`text-${
                        user.isAdmin ? "blue-800" : "red-500"
                      } hover:text-${
                        user.isAdmin ? "blue-900" : "red-700"
                      } focus:outline-none`}
                      onClick={() => handleDeleteProperty(property.id)}
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default PropertiesContainer;
