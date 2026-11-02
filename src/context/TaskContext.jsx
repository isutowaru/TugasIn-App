import React, { createContext, useContext, useMemo, useState } from 'react';
import { initialTasks } from '../constants/dummyData';

const TaskContext = createContext(null);
export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [user, setUser] = useState({ name: 'Alya Putri', email: 'alya.putri@email.com' });
  const addTask = (task) => setTasks((all) => [{ ...task, id: Date.now().toString() }, ...all]);
  const updateTask = (id, changes) => setTasks((all) => all.map((task) => task.id === id ? { ...task, ...changes } : task));
  const deleteTask = (id) => setTasks((all) => all.filter((task) => task.id !== id));
  const value = useMemo(() => ({ tasks, user, setUser, addTask, updateTask, deleteTask }), [tasks, user]);
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
export const useTasks = () => useContext(TaskContext);
