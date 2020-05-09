const mongoose = require("mongoose");
const app = require("./app");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen(process.env.PORT);