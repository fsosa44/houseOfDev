import "./App.css";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./state/user";
import Profile from "./pages/Profile";
import CrearPropiedad from "./pages/CrearPropiedad";
import SingleView from "./pages/SingleView";
import UserList from "./pages/UserList";
import CitasLista from "./pages/CitasLista";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("https://house-api-chi.vercel.app/api/user/me", {
        withCredentials: true,
      })
      .then((res) => {
        const user = res.data;
        dispatch(setUser(user));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="bg-[#f9f9f9] w-[100%] min-h-[100vh] ">
      <NavBar />

      <Routes>
        {user.email && user.isAdmin ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logIn" element={<Login />} />
            <Route path="/admin" element={<h1>JOACO ES ADMIN</h1>} />
            <Route path="/crear-propiedad" element={<CrearPropiedad />} />
            <Route path="/citas-lista" element={<CitasLista />} />
            <Route path="/usuarios-lista" element={<UserList />} />
            <Route path="/propiedades/:id" element={<SingleView />} />
          </>
        ) : (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logIn" element={<Login />} />
            <Route path="/propiedades/:id" element={<SingleView />} />
          </>
        )}
        {!user.email && <Route path="/" element={<Home />} />}
      </Routes>
    </div>
  );
}

export default App;
