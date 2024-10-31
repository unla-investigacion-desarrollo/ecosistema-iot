import app from "./server";

const PORT = 3030;

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});