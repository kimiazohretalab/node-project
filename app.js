const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();
const usersRoute = require("./routes/users");
const presentationsRoute = require("./routes/presentations");
const cors = require('cors')
const { swaggerUi, specs } = require("./swagger");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/api/v1/", usersRoute);
app.use("/api/v1/presentations", presentationsRoute);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
