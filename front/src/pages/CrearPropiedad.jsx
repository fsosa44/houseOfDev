import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../state/user";
import { useState } from "react";

export default function CrearPropiedad() {
  const navigate = useNavigate();
  const [cantidadAmbientes, setCantidadAmbientes] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [barrio, setBarrio] = useState("");
  const [precio, setPrecio] = useState("");
  const [baños, setBaños] = useState("");
  const [metrosCuadrados, setMetrosCuadrados] = useState("");
  const [img, setImg] = useState("");
  const [bañosSeleccionados, setBañosSeleccionados] = useState("1");
  const [descripcion, setDescripcion] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://house-api-chi.vercel.app/api/properties/crearPropiedad", {
        cantidadAmbientes: parseInt(cantidadAmbientes),
        ubicacion,
        barrio,
        precio: parseInt(precio),
        baños: parseInt(bañosSeleccionados),
        metrosCuadrados: parseInt(metrosCuadrados),
        ambientes: parseInt(cantidadAmbientes),
        baños: parseInt(bañosSeleccionados),
        descripcion,
        img,
      })
      .then((res) => {
        alert("propiedad creada correctamente");
        navigate("/");
      })
      .catch((err) => console.log("ERROR", err));
  };

  return (
    <div className="w-[100%] min-h-[100vh] flex justify-center items-center">
      <form class="w-full max-w-lg" onSubmit={handleSubmit}>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Direccion y Altura
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Ejemplo: Calle falsa 123"
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
            ></input>
            <p class="text-red-500 text-xs italic">
              Por favor, llene este espacio.
            </p>
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-adress"
            >
              Precio
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-price"
              type="text"
              placeholder="$"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            ></input>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-state"
            >
              Barrio
            </label>
            <div>
              <select
                class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                value={barrio}
                onChange={(e) => setBarrio(e.target.value)}
              >
                <option>Puerto Madero</option>
                <option>Boedo</option>
                <option>Caballito</option>
                <option>San Cristobal</option>
                <option>Parque Patricios</option>
                <option>Devoto</option>
                <option>Once</option>
                <option>Villa Lugano</option>
                <option>Barracas</option>
                <option>Palermo</option>
                <option>Belgrano</option>
                <option>Wilde</option>
              </select>
            </div>

            <p class="text-gray-600 text-xs italic">
              Elegí el barrio de tu propiedad.
            </p>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-2">
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-neighborhood"
            >
              Ambientes
            </label>

            <select
              class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-environments"
              value={cantidadAmbientes}
              onChange={(e) => setCantidadAmbientes(e.target.value)}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
            </select>
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-hood"
            >
              Baños
            </label>
            <div class="relative">
              <select
                class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-bathrooms"
                value={bañosSeleccionados}
                onChange={(e) => setBañosSeleccionados(e.target.value)}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-zip"
            >
              Metros Cuadrados
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-squareMeters"
              type="text"
              placeholder="m2"
              value={metrosCuadrados}
              onChange={(e) => setMetrosCuadrados(e.target.value)}
            ></input>
            <div class="w-full md:w-200/1 px-3 mb-6 md:mb-100">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Descripcion
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Proporcione una descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              ></input>
              <div className="w-full md:w-200/1 px-3 mb-6 md:mb-100">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-image-url"
                >
                  URL de la Imagen
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-image-url"
                  type="text"
                  placeholder="Inserte la URL de la imagen"
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                padding="50px"
              >
                Publicar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
