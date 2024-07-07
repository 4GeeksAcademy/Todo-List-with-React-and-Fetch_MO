import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

const ToDoList = () => {
  const [toDo, setToDo] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const myDataBase = "https://playground.4geeks.com/todo/users/mar";

  useEffect(() => {
    fetch(myDataBase)
      .then((response) => {
        console.log(response);
        if (response.status === 404) {
          fetch(myDataBase, {
            method: "POST",
            headers: {
              accept: "application/json",
            },
          });
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setToDo(data.todos);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      const newTask = { label: inputValue.trim(), is_done: false };
      fetch("https://playground.4geeks.com/todo/todos/mar", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(newTask),
      })
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setToDo([...toDo, data]);
          setInputValue("");
        })
        .catch((error) => console.error("Error adding task:", error));
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };
  const handleCheckTodo = (index) => {
    const taskToCheck = toDo[index];
    console.log(taskToCheck);
    const updatedTask = { ...taskToCheck, is_done: true };
    console.log(updatedTask);
    fetch(`https://playground.4geeks.com/todo/todos/${taskToCheck.id}`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Error checking task:" + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const updatedTodoList = toDo.map((task, i) =>
          i === index ? data : task
        );
        setToDo(updatedTodoList);
      })
      .catch((error) => console.error("Error checking task:", error));
  };

  const handleDeleteTodo = (index) => {
    const taskToDelete = toDo[index];
    fetch(`https://playground.4geeks.com/todo/todos/${taskToDelete.id}`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error deleting task:" + response.statusText);
        }
        const newTodoList = toDo.filter((_, i) => i !== index);
        setToDo(newTodoList);
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  return (
    <div className="container mt-5">
      <div className="w-50 my-auto mb-3">
        <input
          type="text"
          className="form-control"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          name="Task"
          placeholder="Add a new task"
          style={{ border: "none", boxShadow: "none" }}
        />
      </div>
      <ul className="ps-0">
        {toDo.length > 0 ? (
          toDo?.map((todo, index) => (
            <li
              key={index}
              className={`d-flex justify-content-between align-items-center mb-2 ${
                todo.is_done ? "text-decoration-line-through" : ""
              }`}
              style={{
                padding: "5px",
                margin: "0 auto",
              }}
            >
              {todo.label}
              <div className="justify-content-end">
                <button
                  className="btn btn-success mx-1"
                  onClick={() => handleCheckTodo(index)}
                >
                  <FaCheck />
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteTodo(index)}
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))
        ) : (
          <li
            style={{
              padding: "30 px",
              margin: "center",
              listStyle: "none",
            }}
          >
            No hay toDo añadido
          </li>
        )}
      </ul>
    </div>
  );
};

export default ToDoList;
