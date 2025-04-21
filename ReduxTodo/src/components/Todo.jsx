import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removetodo, updatetodo } from '../features/todo/todoSlice'

function Todo() {
  const todos=useSelector(state=> state.todos)
  const dispatch=useDispatch()
  const [editId, setEditId]=useState()
  const [editText, setEditText]=useState()

  const handleedit=(todo)=>{
    setEditId(todo.id)
    setEditText(todo.text)
  }

  const handlesave=()=>{
    dispatch(updatetodo({id:editId, text:editText}))
    setEditId(null)
    setEditText('') 
  }



  return (
  
    <ul className="list-none">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="mt-4 flex justify-between items-center bg-gray-800 px-4 py-3 rounded shadow-md"
        >
          {/* Left: Todo Text */}
          <div className="text-white max-w-sm break-words">
            {editId==todo.id?(
              <input type="text" 
              value={editText}
              onChange={(e)=> (setEditText(e.target.value))}/>
            ):(
              <span>{todo.text}</span>
            )}
          </div>

          {/* Right: Buttons */}
          <div className="flex gap-2">
            {/* Update Button */}
            {editId==todo.id?(
            <button
              onClick={() => handlesave()}
              className="flex items-center gap-1 text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm transition duration-200"
            >
              💾 Save
            </button>
            ):(
              <button
              onClick={() => handleedit(todo)}
              className="flex items-center gap-1 text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm transition duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487a2.1 2.1 0 113.03 2.913l-9.193 9.193a4.2 4.2 0 01-1.554.982l-3.286 1.095 1.095-3.286a4.2 4.2 0 01.982-1.554l9.193-9.193z"
                />
              </svg>
              Update
            </button>
            )}

            {/* Delete Button */}
            <button
              onClick={() => dispatch(removetodo(todo.id))}
              className="flex items-center gap-1 text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm transition duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Todo

