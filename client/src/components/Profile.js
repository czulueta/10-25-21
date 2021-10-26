import React, { useContext } from "react"
import TodoForm from "./TodoForm.js"
import TodoList from "./TodoList.js"
import Todo from "./Todo.js"
import { UserContext } from "../context/UserProvider.js"

export default function Profile(){
    const { user: {username}, addTodo, todos} = useState(UserContext)
    return(
        <div>
            <h1>Welcome {username}!</h1>
            <h3>Add a something you want to do</h3>
            <TodoForm addTodo={addTodo}/>
            <h3>Your Todos</h3>
            <TodoList todos={todos}/>
        </div>
    )
}