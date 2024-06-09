import React, { useState, useEffect } from "react";

const Home = () => {
  const [entry, setEntry] = useState("");
  const [arrayEntry, setArrayEntry] = useState([]);

  console.log(entry);
  console.log(arrayEntry);

  const addToDoToList = () => {
    setArrayEntry([...arrayEntry, { label: entry, done: false }]);
    setEntry("");
  };

  const deleteTask = (deletedTask) => {
    const filteredArray = arrayEntry.filter((task) => task !== deletedTask);
    setArrayEntry(filteredArray);
  };

  const createUser = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/molivieri", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([]),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === "ok") {
          getUser();
        }
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const getUser = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/molivieri", {
      method: "GET",
    })
      .then((response) => {
        console.log(response.status);
        if (response.status === 404) {
          createUser();
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          setArrayEntry(data);
        }
      })
      .catch((err) => console.log(err));
  };

  const updateToDos = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/molivieri", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arrayEntry),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  const deleteToDos = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/molivieri", {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 404) {
          createUser();
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setArrayEntry([]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUser();
    console.log("Me estoy ejecutando porque ya cargó el componente");
  }, []);

  useEffect(() => {
    if (arrayEntry.length > 0) {
      updateToDos();
    }
  }, [arrayEntry]);

  return (
    <>
      <div className="container col-6">
        <div className="input-group mb-3 my-4">
          <input
            type="text"
            className="form-control"
            id="toDoInputs"
            placeholder="Enter Activity To Do"
            aria-label="To Do's"
            aria-describedby="basic-addon2"
            onChange={(e) => setEntry(e.target.value)}
            value={entry}
          />
          <button
            className="input-group-text"
            id="basic-addon2"
            onClick={addToDoToList}
          >
            Submit
          </button>
        </div>

        <div>
          <ul className="list-group list-group-numbered">
            {arrayEntry.length > 0 ?
              arrayEntry.map((task, index) => (
                <li key={index} className="list-group-item d-flex">
                  <span style={{ width: "90%" }}>{task.label}</span>
                  <button
                    className="text-align-right"
                    onClick={() => deleteTask(task)}
                  >
                    Delete
                  </button>
                </li>
              )) : null}
          </ul>
        </div>
      </div>

      <div className="grid text-center my-2">
        <button
          className="col-2"
          onClick={() => deleteToDos()}
        >
          Clear All
        </button>
      </div>
    </>
  );
};

export default Home;