import "dotenv/config";
import app from "./app.js";

const port = Number(process.env.PORT) || 5000;

app.listen(port, () => {
  console.log(`Lune backend listening on port ${port}`);
});