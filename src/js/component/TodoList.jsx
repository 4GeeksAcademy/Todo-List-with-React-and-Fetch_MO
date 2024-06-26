// import React, { useState, useEffect } from 'react';
// import Todo from './Todo.jsx';
// import TodoForm from './TodoForm.jsx';

// function TodoList() {
//   const [todos, setTodos] = useState([]);
//   const name = 'mar';

//   useEffect(() => {
//     fetch(`https://playground.4geeks.com/todo/users/${name}`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('La solicitud no se pudo completar.');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setTodos(data); // Actualiza el estado de las tareas con los datos del servidor
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);

//   const addTodo = (todo) => {
//     const newTodos = [todo, ...todos];
//     setTodos(newTodos);
//     saveTodosToServer(newTodos);
//   };

//   const removeTodo = (id) => {
//     const removeArr = todos.filter((todo) => todo.id !== id);
//     setTodos(removeArr);
//     saveTodosToServer(removeArr);
//   };

//   const deleteTodos = () => {
//     setTodos([]);
//     saveTodosToServer([]);
//   };

//   const saveTodosToServer = (todosToSave) => {
//     fetch(`https://playground.4geeks.com/todo/users/${name}`, {
//       method: 'PUT',
//       body: JSON.stringify(todosToSave),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((resp) => {
//         if (!resp.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return resp.json();
//       })
//       .then((data) => {
//         console.log('Saved to server:', data);
//       })
//       .catch((error) => {
//         console.error('Error saving to server:', error);
//       });
//   };

//   const createUser = () => {
//     return fetch(`https://playground.4geeks.com/todo/users/${name}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         } else {
//           throw new Error('Error creating user');
//         }
//       })
//       .then((data) => {
//         console.log('User created:', data);
//         return getTodos(); // Refresh todos after creating user
//       })
//       .catch((error) => {
//         console.error('Error creating user:', error);
//       });
//   };

//   return (
//     <div className='container w-50'>
//       <TodoForm onSubmit={addTodo} />
//       <Todo todos={todos} removeTodo={removeTodo} />
//       <div className='text-start text-secondary pt-4 m-2'>
//         {todos.length === 0 ? 'No tasks, add a task' : `${todos.length} item${todos.length === 1 ? '' : 's'} left`}
//       </div>
//       <button className='btn btn-danger' onClick={deleteTodos}>
//         Delete all Tasks
//       </button>
//     </div>
//   );
// }

// export default TodoList;