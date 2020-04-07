const mongoose = require("mongoose");
const {userSchema} = require("./model/userModel");
const dotenv=require("dotenv");
dotenv.config();
// connect mongodb database
let url;
if(process.env.DB_URL) url = process.env.DB_URL;
else url ="mongodb://localhost:27017/mathongo";

const connection = mongoose.createConnection(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
connection.on("error", () => {
    console.log("> error occurred during db connection")
});
connection.on("open",() => {
    console.log("> successfully connected to db")
})
const Users = connection.model("users", userSchema);
module.exports = {
    Users
}
