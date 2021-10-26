const express = require("express")
const todoRouter = express.Router()
const Todo = require("../models/todo.js")
// get all todos
todoRouter.get("/", (req, res, next) => {
    Todo.find((err, todos) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(todos)
    })
})
// get all user todos by id
todoRouter.get("/user", (req, res, next) => {
    Todo.find({ user: req.user._id }, (err, todos) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(todos)
    })
})
// add new Todo
todoRouter.post("/", (req, res, next) => {
    req.body.user = req.user._id
    const newTodo = new Todo(req.body)
    newTodo.save((err, savedTodo) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedTodo)
    })
})
// Delete todo
todoRouter.delete("/:todoId", (req, res, next) => {
    Todo.findOneAndDelete(
        { _id: req.params.todoId, user: req.user._id }, 
        (err, deletedTodo) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`successfully deleted ${deletedTodo.title}`)
    })
})
// update todo
todoRouter.put("/:todoId", (req, res, next) => {
    Todo.findOneAndUpdate(
        { _id: req.params.todoId, user: req.user._id }, 
        req.body, 
        {new : true}, 
        (err, updatedTodo) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(202).send(udpatedTodo)
    })
})

module.exports = todoRouter
