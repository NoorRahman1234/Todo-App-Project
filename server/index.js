import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import TodoModel from "./Models/Todo.js";
// import axios from 'axios';
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://rahmanafr0123_db_user:rfvgbH5BRcoRxkci@cluster0.s9u5g2n.mongodb.net/?appName=Cluster0");

app.get("/get", (req, res) => {
  TodoModel.find()
  
    .then((result) => {
      console.log(result);
      res.json(result)})
    .catch((err) => res.json(err));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findById({ _id: id })
    .then(todo => {
        todo.done = !todo.done;
        return todo.save();
    })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.put("/update_task/:id", (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  TodoModel.findByIdAndUpdate({ _id: id }, { task: task }, { new: true })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/add", (req, res) => {
  const task = req.body.task;
  TodoModel.create({
    task: task,
  })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});




app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  TodoModel.findByIdAndDelete({ _id: id })
    .then(result => res.json(result))
    .catch(err => res.json(err));
});


app.listen(3001, () => {
  console.log("Server is running  on port no 3001");
});
