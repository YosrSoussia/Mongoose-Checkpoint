const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config();
const app = express();
//connection to DB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(err);
  });
// Person schema prototype
const PersonPrototype = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});
//Create and Save a Record of a Model
const personModel = mongoose.model("person", PersonPrototype);
const person = new personModel({
  name: "yosr",
  age: 24,
  favoriteFoods: ["fricase", "shrimp", "pistache"],
});

person.save((err, person) => {
  if (err) console.log(err);
  console.log(person);
});

//Create Many Records with model.create()
const people = [
  {
    name: "ameur",
    age: 32,
    favoriteFoods: ["salade", "chakchouka", "3allouch"],
  },
  { name: "mehdi", age: 30, favoriteFoods: ["salade", "pizza", "bambalouni"] },
  { name: "feiza", age: 25, favoriteFoods: ["coffee", "cake", "riz"] },
];

personModel.create(people, function (err, person) {
  if (err) console.log(err);
  console.log(person);
});
//Use model.find() to Search Your Database
personModel.find({ name: "mehdi" }, function (err, person) {
  if (err) console.log(err);
  console.log(person);
});
//Use model.findOne() to Return a Single Matching Document from Your Database
personModel.findOne({ favoriteFoods: { $in: ["pizza"] } }, function (
  err,
  person
) {
  if (err) console.log(err);
  console.log(person);
});
//Use model.findbyID()
personModel.findById("5f12f197feece32638b71964", function (err, person) {
  if (err) console.log(err);
  console.log(person);
});
//Perform Classic Updates by Running Find, Edit, then Save
personModel.findById("5f12f197feece32638b71964", function (err, person) {
  if (err) console.log(err);
  person.favoriteFoods.push("hamburger");
  person.save(function (err, person) {
    if (err) console.log(err);
    console.log(person);
  });
});
//Perform New Updates on a Document Using model.findOneAndUpdate()
personModel.findOneAndUpdate(
  { name: "yosr" },
  { age: 20 },
  { new: true },
  function (err, person) {
    if (err) console.log(err);
    console.log(person);
  }
);
//Delete One Document Using model.findByIdAndRemove
personModel.findByIdAndRemove("5f12f1c5d94f411650453c49", function (
  err,
  person
) {
  if (err) console.log(err);
  console.log(person);
});
//Chain Search Query Helpers to Narrow Search Results
personModel
  .find({ favoriteFoods: { $in: ["cake"] } })
  .sort({ name: 1 })
  .select("-age")
  .limit(2)
  .exec()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.error(err);
  });
app.listen(8000, () => console.log("server is running onport 8000"));
