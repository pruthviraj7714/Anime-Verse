const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");

const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
