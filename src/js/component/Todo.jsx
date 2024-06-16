import React, {useState} from 'react'
import TodoForm from './TodoForm.jsx'
import TodoList from './TodoList.jsx'
import { ImCross } from "react-icons/im";

function Todo({todos, removeTodo}) {
  return todos.map((todo, index) =>(
    <div className='row remove p-2 m-1 border border-secondary'>
        <div className='col text-start ' key={todo.id} >{todo.label}</div>
        <div className='text-end text-white col' onClick={()=> removeTodo(todo.id)}><ImCross/></div>
    </div>
  ))
}

export default Todo