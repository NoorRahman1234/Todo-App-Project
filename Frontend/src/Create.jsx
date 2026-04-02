import React, { useState } from 'react'
import axios from 'axios';


function Create({ onAdd }) {
  const [task, setTask] = useState("");
  const handleAdd = () => {
    if (!task.trim()) return;
    axios.post('http://localhost:3001/add', { task: task })
      .then(result => {
        setTask(""); // clear input
        if (onAdd && result.data) onAdd(result.data);
      })
      .catch(err => console.log(err));
  }
  return (
    <div className='flex flex-col sm:flex-row items-center w-full gap-2 sm:gap-3 mb-6'>
      <input 
        className='w-full sm:flex-1 border border-slate-300 rounded-lg h-12 sm:h-12 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-700 placeholder-slate-400 text-sm sm:text-base' 
        type="text" 
        placeholder='What needs to be done?' 
        value={task} 
        onChange={(e) => setTask(e.target.value)} 
        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
      />
      <button 
        className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 h-12 rounded-lg transition-all shadow-sm whitespace-nowrap cursor-pointer text-sm sm:text-base" 
        type="button" 
        onClick={handleAdd}
      >
        Add Task
      </button>
    </div>
  )
}

export default Create




