import app from "./app.js";
import config from "./utils/config.js";

app.get("/", (req, res) => {
  res.send("rpms server");
});

app.listen(config.PORT, () => {
  console.log(`Successfully connected at port ${config.PORT}`);
});
