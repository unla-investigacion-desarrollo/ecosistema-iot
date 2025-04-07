//Importa y ejecuta el servidor
import server from "./server";

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});