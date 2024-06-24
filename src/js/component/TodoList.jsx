
// import React, { useState, useEffect } from 'react'
// import Todo from './Todo.jsx';
// import TodoForm from "./TodoForm.jsx";
// import UserName from './UserName.jsx';

// function TodoList() {
//  const [todos, setTodos] = useState([]);
//  const [task,setTask]= useState ("")
//   const name = 'mar'; // Define the username here or fetch it from somewhere
//   const addTodo = todo => {

//     // const newTodos = [todo, ...todos];

//     // setTodos(newTodos)
//     // console.log(...todos)
//     // console.log(todos.length)
//     // console.log(newTodos)
//      fetch('https://playground.4geeks.com/todo/users/' + name, {
//        method: "POST",
//      body: JSON.stringify(task),
//       headers: {
//         "Content-Type": "application/json"
//      }
//     })
    
//       .then(resp => {
//         console.log(resp.ok); // will be true if the response is successfull
//         console.log(resp.status); // the status code = 200 or code = 400 etc.
//         console.log(resp.text()); // will try return the exact result as string
//         return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
//       })
//       .then(data => {
//         //here is where your code should start after the fetch finishes
//         console.log(data); //this will print on the console the exact object received from the server
//       })
//       .catch(error => {
//         //error handling
//         console.log(error);
//       });
//   }

//   const removeTodo = id => {
//     const removeArr = [...todos].filter(todo => todo.id !== id)
//     setTodos(removeArr)
//     fetch('https://playground.4geeks.com/todo/users/' + name, {
//       method: "PUT",
//       body: JSON.stringify(removeArr),
//       headers: {
//         "Content-Type": "application/json"
//       }
//     })
//       .then(resp => {
//         console.log(resp.ok); // will be true if the response is successfull
//         console.log(resp.status); // the status code = 200 or code = 400 etc.
//         console.log(resp.text()); // will try return the exact result as string
//         return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
//       })
//       .then(data => {
//         //here is were your code should start after the fetch finishes
//         console.log(data); //this will print on the console the exact object received from the server
//       })
//       .catch(error => {
//         //error handling
//         console.log(error);
//       });
//   }

//   const deleteTodos = () => {
//     setTodos([]);
//     fetch('https://playground.4geeks.com/todo/users/' + name, {
//       method: "PUT",
//       body: JSON.stringify([
//         {
//           "label": "sample task",
//           "done": false
//         }
//       ]),
//       headers: {
//         "Content-Type": "application/json"
//       }
//     })
//       .then(resp => {
//         console.log(resp.ok); // will be true if the response is successfull
//         console.log(resp.status); // the status code = 200 or code = 400 etc.
//         console.log(resp.text()); // will try return the exact result as string
//         return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
//       })
//       .then(data => {
//         //here is were your code should start after the fetch finishes
//         console.log(data); //this will print on the console the exact object received from the server
//       })
//       .catch(error => {
//         //error handling
//         console.log(error);
//       });
//   }
//   const getTodos = () => {
//     fetch('https://playground.4geeks.com/todo/users/mar')
//       .then((response) => {
//         if (response.ok) {
//           return response.json()
//         } else {
//           if (response.status === 404) {
//             createUser()

//           } else { console.log("error en la solicitud", response.status) }
//         }
//       })
//       .then((data) => setTodos(data.todos))
//       .catch(error => {
//         //error handling
//         console.log(error);
//       });

//   }
//   const createUser = () => {
//     fetch('https://playground.4geeks.com/todo/users/mar', {
//       method: "POST",
//       header: {
//         "Content-Type": "application/json"

//       }
//     })
//       .then((response) => response.json())
//       .then((data) => getTodos())
//       .catch(error => {
//         //error handling
//         console.log(error);
//       });
//   }
// useEffect(()=>{
//   getTodos()
// },[])
//   return (
//     <div className='container w-50'>
//       <TodoForm onSubmit={addTodo} todos={todos} />
//       <Todo todos={todos} removeTodo={removeTodo} />
//       <div className='text-start text-secondary  pt-4 m-2'>{todos.length == 0 ? "No tasks, add a task" : todos.length + " " + "item left"}</div>
//       <button className='btn btn-danger' onClick={() => deleteTodos()}>Delete all Tasks</button>
//     </div>
//   )
// }

// export default TodoList
import React, { useState, useEffect } from 'react';
import Todo from './Todo.jsx';
import TodoForm from './TodoForm.jsx';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const name = 'mar'; // Define the username here or fetch it from somewhere

  useEffect(() => {
    // Function to get todos from localStorage or server on initial load
    const fetchData = async () => {
      try {
        // Fetch todos from localStorage
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];

        // If there are no todos in localStorage, fetch from server
        if (storedTodos.length === 0) {
          const response = await fetch(`https://playground.4geeks.com/todo/users/${name}`);
          if (response.ok) {
            const data = await response.json();
            setTodos(data.todos);
            localStorage.setItem('todos', JSON.stringify(data.todos));
          } else if (response.status === 404) {
            // If user does not exist, create user and fetch todos
            await createUser();
          } else {
            console.log('Error en la solicitud', response.status);
          }
        } else {
          // Use todos from localStorage
          setTodos(storedTodos);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // Fetch todos on initial load
  }, []); // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    // Save todos to localStorage whenever todos state changes
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]); // Update localStorage whenever todos state changes

  const addTodo = (todo) => {
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
    saveTodosToServer(newTodos);
  };

  const removeTodo = (id) => {
    const removeArr = todos.filter((todo) => todo.id !== id);
    setTodos(removeArr);
    saveTodosToServer(removeArr);
  };

  const deleteTodos = () => {
    setTodos([]);
    saveTodosToServer([]);
  };

  const saveTodosToServer = (todosToSave) => {
    fetch(`https://playground.4geeks.com/todo/users/${name}`, {
      method: 'PUT',
      body: JSON.stringify(todosToSave),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Network response was not ok');
        }
        return resp.json();
      })
      .then((data) => {
        console.log('Saved to server:', data);
      })
      .catch((error) => {
        console.error('Error saving to server:', error);
      });
  };

  const createUser = () => {
    return fetch(`https://playground.4geeks.com/todo/users/${name}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error creating user');
        }
      })
      .then((data) => {
        console.log('User created:', data);
        return getTodos(); // Refresh todos after creating user
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
  };

  return (
    <div className='container w-50'>
      <TodoForm onSubmit={addTodo} todos={todos} />
      <Todo todos={todos} removeTodo={removeTodo} />
      <div className='text-start text-secondary pt-4 m-2'>
        {todos.length === 0 ? 'No tasks, add a task' : `${todos.length} item${todos.length === 1 ? '' : 's'} left`}
      </div>
      <button className='btn btn-danger' onClick={deleteTodos}>
        Delete all Tasks
      </button>
    </div>
  );
}

export default TodoList;