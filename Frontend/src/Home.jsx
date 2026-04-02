
import React, { useState, useEffect } from 'react';
import Create from './Create';
import axios from 'axios';
import { FaTrash, FaEdit } from 'react-icons/fa';

function Home() {
    const [todos, setTodos] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState("");

    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleEdit = (id) => {
        setTodos(todos.map(todo => 
            todo._id === id ? { ...todo, done: !todo.done } : todo
        ));
        axios.put('http://localhost:3001/update/' + id)
            .then(result => console.log(result))
            .catch(err => console.log(err));
    }

    const handleDelete = (id) => {
        setTodos(todos.filter(todo => todo._id !== id));
        axios.delete('http://localhost:3001/delete/' + id)
            .then(result => console.log(result))
            .catch(err => console.log(err));
    }

    const handleUpdate = (id) => {
        if (!editingText.trim()) return;
        setTodos(todos.map(todo => 
            todo._id === id ? { ...todo, task: editingText } : todo
        ));
        axios.put('http://localhost:3001/update_task/' + id, { task: editingText })
            .then(result => {
                setEditingId(null);
                setEditingText("");
            })
            .catch(err => console.log(err));
    }
    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-slate-100 py-10 px-4 sm:px-6 lg:px-8'>
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white shadow-xl rounded-2xl p-5 sm:p-8 border border-slate-100">
                <h1 className='text-2xl sm:text-3xl font-extrabold text-slate-800 text-center mb-6 sm:mb-8 tracking-tight'>Todo List</h1>
                <Create onAdd={(newTodo) => setTodos([...todos, newTodo])} />
                {todos.length === 0 ? (
                    <div className="text-center text-slate-400 mt-4"><p>No tasks yet. Add one above!</p></div>
                ) : (
                    todos.map(todo => (
                        <div key={todo._id} className='flex flex-col sm:flex-row sm:items-center justify-between p-4 mb-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-100 transition-all duration-200 group shadow-sm'>
                            <div className="flex items-center flex-1 overflow-hidden w-full">
                                <input 
                                    type="checkbox" 
                                    checked={todo.done || false} 
                                    className='w-5 h-5 sm:w-6 sm:h-6 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600 shrink-0' 
                                    onChange={() => handleEdit(todo._id)} 
                                />
                                {editingId === todo._id ? (
                                    <input 
                                        type="text" 
                                        value={editingText} 
                                        onChange={(e) => setEditingText(e.target.value)} 
                                        className="text-slate-800 bg-white border border-indigo-300 rounded px-3 py-1 sm:py-2 ml-4 flex-1 outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner w-full text-sm sm:text-base"
                                        autoFocus
                                        onKeyDown={(e) => e.key === 'Enter' && handleUpdate(todo._id)}
                                    />
                                ) : (
                                    <span className={`block flex-1 ml-4 text-sm sm:text-base break-words pr-4 transition-colors ${todo.done ? "line-through text-slate-400" : "text-slate-700 font-medium"}`}>
                                        {todo.task}
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center justify-end w-full sm:w-auto mt-3 sm:mt-0 gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                                {editingId === todo._id ? (
                                    <button 
                                        className="text-indigo-600 hover:text-indigo-800 font-semibold px-3 py-1 rounded-md hover:bg-indigo-50 transition-colors"
                                        onClick={() => handleUpdate(todo._id)}
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button 
                                        className="text-slate-400 hover:text-indigo-600 p-2 rounded-lg hover:bg-indigo-50 transition-all cursor-pointer"
                                        onClick={() => {
                                            setEditingId(todo._id);
                                            setEditingText(todo.task);
                                        }}
                                        title="Edit Task"
                                    >
                                        <FaEdit size={16} />
                                    </button>
                                )}

                                <button 
                                    className="text-slate-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-all cursor-pointer"
                                    onClick={() => handleDelete(todo._id)}
                                    title="Delete Task"
                                >
                                    <FaTrash size={16} />
                                </button>
                            </div>
                        </div>


                    ))
                )}
            </div>
        </div>
    );
}

export default Home;


