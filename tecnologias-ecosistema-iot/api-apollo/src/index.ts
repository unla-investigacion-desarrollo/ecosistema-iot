import app from "./server";

//Definimos el puerto en el que se va a ejecutar la aplicación:
const PORT = 3030;

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});