import React, { useState, useEffect } from "react";


const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [taskList, setTaskList] = useState([]);

	useEffect(() => {
		fetchTodos(setTaskList);
	}, []);

	const fetchTodos = (setTaskList) => {
		fetch('https://playground.4geeks.com/todo/users/cedric')
			.then((resp) => {
				if (!resp.ok) {
					throw new Error("Failed to fetch todo list. Status: " + resp.status);
				}
				return resp.json();
			})
			.then((userObject) => {
				if (Array.isArray(userObject.todos)) {
					setTaskList(userObject.todos);
				} else {
					setTaskList([]);
				}
			})
			.catch((error) => {
				console.error("There has been a problem with your fetch operation:", error);
			});
	};

	// Add new todo when user hits Enter
	const handleAddTodo = (event) => {
		if (event.key === "Enter" && inputValue.trim() !== "") {
			fetch('https://playground.4geeks.com/todo/todos/cedric', {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					label: inputValue.trim(),
					is_done: false
				})
			})
				.then((resp) => {
					if (resp.ok) {
						fetchTodos(setTaskList);
					}
				})
				.catch((error) => console.error("Failed to add task", error));
			setInputValue("");
		}
	};

	// Delete a specific todo
	const deleteTodo = (index) => {
		let todoID = taskList[index].id;

		fetch(`https://playground.4geeks.com/todo/todos/${todoID}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
		})
			.then((resp) => {
				if (resp.ok) {
					fetchTodos(setTaskList);
				}
			})
			.catch((error) => console.error("Failed to delete todo", error));
	};

	const handleClearTasks = () => {
		fetch('https://playground.4geeks.com/todo/users/cedric', {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then((resp) => {
				if (resp.ok) {
					setTaskList([]);
				}
			})
			.catch((error) => console.error("Failed to clear all tasks", error));
	};

	return (
		<div className="todo-container">
			<h1>Todo List</h1>
			<input
				className="task-input"
				type="text"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				onKeyDown={handleAddTodo}
				placeholder="Enter Task"
			/>
			<ul className="task-list">
				{taskList.length === 0 ? (
					<li className="no-task"> Add Tasks</li>
				) : (
					taskList.map((item, index) => (
						<li className="task-item" key={item.id}>
							{item.label}
							<span className="delete-task" onClick={() => deleteTodo(index)}>
								✖
							</span>
						</li>
					))
				)}
			</ul>
			<div className="d-flex justify-content-center">
				<button className="btn btn-primary" onClick={handleClearTasks}>
					Clear All Tasks
				</button>
			</div>
		</div>
	);
};

export default Home;