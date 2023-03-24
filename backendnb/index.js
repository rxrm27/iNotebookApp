//starting Point
const connectToMongo = require("./db");
const express = require("express");

connectToMongo();
const app = express();
const port = 5000;

//middleware video #45 time: 3:09
app.use(express.json())

//Avaiable Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`INotebook backend listening on http://localhost:${port}`);
});
