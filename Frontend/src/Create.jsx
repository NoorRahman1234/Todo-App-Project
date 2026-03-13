import React, { useState } from 'react'
import axios from 'axios';


function Create() {
  const [task,setTask] = useState()
  const handleAdd = ()=>{
    axios.post('http://localhost:3001/add', {task: task})
    .then(result => console.log(result))
    .catch(err => console.log(err))

  }
  return (
    <div className=''>
      <input className='border-2 h-8 ' type="text" placeholder='Enter task'  onChange={(e)=> setTask(e.target.value)} />
      <button className=" h-8 mt-4 ml-4 bg-green-500 text-white px-4 py-2 rounded cursor-pointer text-center justify-content" type="button"  onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Create




