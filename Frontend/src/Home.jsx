
import React, { useState, useEffect } from 'react';
import Create from './Create';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleEdit =(id)=>{
          axios.put('http://localhost:3001/update/'+id)
            .then(result => console.log(result))
            .catch(err => console.log(err));

    }
    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-500 '>
              <div className="border-3 border-blue-500 rounded-lg shadow-md p-6 flex flex-col gap-4 bg-yellow-200">
            <h1 className='items-center justify-ce'><b>Todo list</b></h1>
            <Create />
            {todos.length === 0 ? (
                <div><h2>No record</h2></div>
            ) : (
                todos.map(todo => (
                    <div className='bg-black text-white rounded'>
                    <div  key={todo._id}>
                        
                     <input type="checkbox" className='mr-8 w-5 h-5 text-blue-500 text-center' onClick={() => handleEdit (todo._id)}/>  
                     {todo.done }
                     <span>{todo.task}</span>
                      <button className="text-red-500 hover:text-red-700 ml-8 cursor-pointer">
                          <FaTrash/>
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


