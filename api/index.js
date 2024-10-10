const express = require("express");
const app = express();
const morgan = require("morgan");
const db = require("./configs/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const routes = require("./routes");

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "https://front-pink-beta.vercel.app",
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Ruta para comprobar que el servidor está corriendo
app.get("/", (req, res) => {
  res.send("El servidor está corriendo");
});

app.use("/api", routes);

db.sync({ force: false })
  .then(function () {
    app.listen(3001, () =>
      console.log("Servidor escuchando en el puerto 3001")
    );
  })
  .catch(console.error);