import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const ToDoList = ({ user }) => {
  const [importantTasks, setImportantTasks] = useState(Array(3).fill({ text: "", done: false }));
  const [overallTasks, setOverallTasks] = useState(Array(10).fill({ text: "", done: false }));

  useEffect(() => {
    if (user) {
      const fetchTasks = async () => {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log("Fetched tasks:", docSnap.data());
            // Update state with fetched tasks
        } else {
            console.log("No tasks found for user.");
        }
        } catch (error) {
          console.error("Error fetching tasks: ", error);
        }
      };

      fetchTasks();
    }
  }, [user]);

  const calculateEfficiency = (tasks) => {
    const completedTasks = tasks.filter(task => task.done).length;
    return (completedTasks / tasks.length) * 100;
  };

  useEffect(() => {
    if (user) {
      const saveTasks = async () => {
        try {
          const docRef = doc(db, "users", user.uid);
          await setDoc(docRef, {
            importantTasks,
            overallTasks,
            importantTasksEfficiency: calculateEfficiency(importantTasks),
            overallTasksEfficiency: calculateEfficiency(overallTasks)
          });
        } catch (error) {
          console.error("Error saving tasks: ", error);
        }
      };

      saveTasks();
    }
  }, [importantTasks, overallTasks, user]);

  

  const handleTaskChange = (tasks, setTasks, index, value) => {
    const newTasks = [...tasks];
    newTasks[index] = { ...newTasks[index], text: value };
    setTasks(newTasks);
  };

  const handleTaskDoneChange = (tasks, setTasks, index) => {
    const newTasks = [...tasks];
    newTasks[index] = { ...newTasks[index], done: !newTasks[index].done };
    setTasks(newTasks);
  };

  return (
    <div className="flex mt-4 space-x-4">
      <div className="w-1/2 bg-gray-800 p-4 rounded-lg shadow-lg bg-opacity-50">
        <table className="min-w-full text-white mt-2">
          <thead>
            <tr>
              <th className="p-2">Most Important Tasks</th>
            </tr>
          </thead>
          <tbody>
            {importantTasks.map((task, index) => (
              <tr key={index}>
                <td className="p-2 flex items-center">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => handleTaskDoneChange(importantTasks, setImportantTasks, index)}
                    className="mr-2"
                  />
                  <input
                    type="text"
                    value={task.text}
                    onChange={(e) => handleTaskChange(importantTasks, setImportantTasks, index, e.target.value)}
                    className={`w-full px-2 py-1 ring-2 ring-blue-500/[.55] bg-transparent shadow-md text-white rounded ${task.done ? 'line-through' : ''}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 text-white">
          Efficiency: {calculateEfficiency(importantTasks).toFixed(2)}%
        </div>
      </div>

      <div className="w-1/2 bg-gray-800 p-4 rounded-lg shadow-lg bg-opacity-50">
        <table className="min-w-full text-white mt-2">
          <thead>
            <tr>
              <th className="p-2">Overall Tasks</th>
            </tr>
          </thead>
          <tbody>
            {overallTasks.map((task, index) => (
              <tr key={index}>
                <td className="p-2 flex items-center">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => handleTaskDoneChange(overallTasks, setOverallTasks, index)}
                    className="mr-2"
                  />
                  <input
                    type="text"
                    value={task.text}
                    onChange={(e) => handleTaskChange(overallTasks, setOverallTasks, index, e.target.value)}
                    className={`w-full px-2 py-1 ring-2 ring-blue-500/[.55] bg-transparent shadow-md text-white rounded ${task.done ? 'line-through' : ''}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 text-white">
          Efficiency: {calculateEfficiency(overallTasks).toFixed(2)}%
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
