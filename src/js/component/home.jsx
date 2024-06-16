import React from "react";

//include images into your bundle
import TodoForm from "./TodoForm.jsx";
import TodoList from "./TodoList.jsx";
import UserName from "./UserName.jsx";

//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<h1 className="pt-5 text-secondary">  MY TODOS</h1>
			<UserName/>
		</div>
	);
};

export default Home;
