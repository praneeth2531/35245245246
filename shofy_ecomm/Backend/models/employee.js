const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    image: String,
    role: String
});

const EmployeeModel = mongoose.model("shopy_ecom", EmployeeSchema);

module.exports = EmployeeModel;