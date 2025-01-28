
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { edittodo, deletetodo } from './actions';
import { EditIcon, CheckIcon, TrashIcon, SaveIcon } from './todo-icons';

function Todo({ id, title, datetime }) {
  const [edit, setEdit] = useState(false);
  const [newtitle, setNewTitle] = useState('');
  const [isComplete, setIsComplete] = useState(false); 
  const dispatch = useDispatch();

  const handleTodo = () => {
    if (newtitle.trim()) {
      dispatch(edittodo({ id, title: newtitle }));
      setEdit(false);
    }
  };

  const handleDelete = () => {
    dispatch(deletetodo(id));
  };

  const handleComplete = () => {
    setIsComplete((prev) => !prev);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 py-2 w-full">
      {edit ? (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-full">
          <input
            type="text"
            className="border-2 border-blue-600 rounded-lg px-3 py-2 w-full sm:w-[70%] md:w-[50%] focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={newtitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Edit your task"
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full sm:w-auto"
            onClick={handleTodo}
          >
            <SaveIcon/>
          </button>
        </div>
      ) : (
        <li className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-gray-100 border border-gray-300 rounded-lg p-3 shadow-sm w-full">
          <p
            className={`relative flex-1 text-gray-700 font-medium truncate pl-2 transition-all duration-300 ${isComplete ? "text-gray-500" : ""}`}
          >
            {title}  
            <span
              className={`absolute left-0 top-1/2 w-full h-[2px] bg-gray-500 transition-transform duration-400 ease-in-out ${isComplete ? "scale-x-100" : "scale-x-0"}`}
              style={{ transformOrigin: "left center" }}
            ></span> <span className="text-xs inline-block text-red-400 mt-1">{datetime}</span>
          </p>
          {/* Display datetime */}
         
          <div className="actions flex sm:flex-row gap-2 w-full sm:w-auto">
            <button
              className="bg-green-500 text-white px-6 sm:px-5 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm sm:text-base"
              onClick={handleComplete}
            >
              <CheckIcon />
            </button>
            <button
              className="bg-yellow-400 flex justify-center items-center text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm sm:text-base w-full sm:w-auto"
              onClick={() => setEdit(true)}
            >
              <EditIcon />
            </button>
            <button
              className="bg-red-500 flex justify-center items-center text-white px-3 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition text-sm sm:text-base w-full sm:w-auto"
              onClick={handleDelete}
            >
              <TrashIcon />
            </button>
          </div>
        </li>
      )}
    </div>
  );
}

export default Todo;
