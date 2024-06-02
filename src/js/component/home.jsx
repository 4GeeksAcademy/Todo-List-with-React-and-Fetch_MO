import React, { useState, useEffect } from 'react';

fetch('https://example.com/users.json', {
  method: 'POST',
  mode: 'cors',
  redirect: 'follow',
  headers: new Headers({
    'Content-Type': 'text/plain'
  })
})
  .then(res => res.json())
  .then(response => { /* manejar la respuesta */ })
  .catch(error => console.error(error));


const TodoApp = () => {
  const [todos, setTodos] = useState([]);

  // Obtener la lista de tareas 
  useEffect(() => {
    fetch('https://playground.4geeks.com/todo/user/alesanchezr')
      .then(response => response.json())
      .then(data => setTodos(data))
      .catch(error => console.log(error));
  }, []);

  // Función para agregar tarea
  const addTodo = (newTodo) => {
    const updatedTodos = [...todos, { label: newTodo, done: false }];
    setTodos(updatedTodos);
    syncWithServer(updatedTodos);
  };

  // Función para eliminar una tarea
  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((i) => i !== index);
    setTodos(updatedTodos);
    syncWithServer(updatedTodos);
  };

  // Función para limpiar todas las tareas
  //const clearTodos = () => {
    //setTodos([]);
    //syncWithServer([]);
  //};

  // Función para sincronizar la lista  con servidor
  const syncWithServer = (updatedTodos) => {
    fetch('https://playground.4geeks.com/todo/user/alesanchezr', {
      method: 'PUT',
      body: JSON.stringify(updatedTodos),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        console.log(resp.ok); // Será ok si la respuesta correcta
        console.log(resp.text()); // Intentará devolver el resultado exacto como string
        return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
      })
      .then((data) => {
        // comienzo después de finalizar busqueda
        console.log(data); // Imprimo objeto  recibido del servidor
      })
      .catch((error) => {
        // buscar errore
        console.log(error);
      });
  };

  return (
    <div>
      <h1>TODO List</h1>
      <input
        type="text"
        placeholder="Add a new task"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.target.value.trim() !== '') {
            addTodo(e.target.value);
            e.target.value = '';
          }
        }}
      />
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.label}
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={clearTodos}>Clear All</button>
    </div>
  );
};

export default TodoApp;