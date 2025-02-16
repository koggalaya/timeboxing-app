import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, onSnapshot, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import '../index.css';

function ToDoList() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "todos"), where("userId", "==", user.uid));
      const unsub = onSnapshot(q, (snapshot) => {
        const todoData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTodos(todoData);
      });
      return () => unsub();
    }
  }, [user]);

  const addTodo = async (e) => {
    e.preventDefault();
    if (todo !== "") {
      await addDoc(collection(db, "todos"), {
        task: todo,
        completed: false,
        important: false,
        userId: user.uid // Associate task with the user's ID
      });
      setTodo("");
    }
  };

  const toggleComplete = async (id, completed) => {
    await updateDoc(doc(db, "todos", id), { completed: !completed });
  };

  const toggleImportant = async (id, important) => {
    await updateDoc(doc(db, "todos", id), { important: !important });
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  const calculateEfficiency = () => {
    const completedTasks = todos.filter(todo => todo.completed).length;
    const totalTasks = todos.length;
    return totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
  };

  return (
    <div className="flex flex-col items-center p-4 bg-transparent min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Task List</h1>
      <div className="w-full max-w-lg p-4 bg-gray-800 bg-opacity-20 shadow-lg rounded-lg mb-8">
        <form onSubmit={addTodo} className="flex mb-4">
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Enter todo..."
            className="flex-1 px-2 py-2 bg-gray-700 border rounded-l-md focus:outline-none"
          />
          <button type="submit" className="px-4 py-2 bg-gradient-to-r from-red-600 to-blue-800 text-white font-semibold rounded-r-md ">Add</button>
        </form>
        <h2 className="text-xl font-semibold mb-4 text-center text-green-500">Important Tasks</h2>
        <ul>
          {todos.filter(todo => todo.important).map((todo) => (
            <li key={todo.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id, todo.completed)}
                className="mr-2"
              />
              <span className={todo.completed ? "line-through" : ""}>{todo.task}</span>
              <button
                onClick={() => toggleImportant(todo.id, todo.important)}
                className="ml-2 text-yellow-500"
              >
                Mark as {todo.important ? "Normal" : "Important"}
              </button>
              <button onClick={() => deleteTodo(todo.id)} className="ml-2 text-red-500">Delete</button>
            </li>
          ))}
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-4 text-center text-white">Overall Tasks</h2>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id, todo.completed)}
                className="mr-2"
              />
              <span className={todo.completed ? "line-through" : ""}>{todo.task}</span>
              <button
                onClick={() => toggleImportant(todo.id, todo.important)}
                className="ml-2 text-yellow-500"
              >
                Mark as {todo.important ? "Normal" : "Important"}
              </button>
              <button onClick={() => deleteTodo(todo.id)} className="ml-2 text-red-500">Delete</button>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-400">Task Completion Efficiency: {calculateEfficiency().toFixed(2)}%</h2>
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
