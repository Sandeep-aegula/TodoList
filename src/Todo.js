
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { edittodoThunk, deletetodoThunk } from './actions';
import { EditIcon, CheckIcon, TrashIcon, SaveIcon } from './todo-icons';

function formatDateTime(dt) {
  if (!dt) return '';
  const date = new Date(dt);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const isTomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000).toDateString() === date.toDateString();
  const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  if (isToday) return `Today at ${time}`;
  if (isTomorrow) return `Tomorrow at ${time}`;
  return date.toLocaleString();
}

function Todo({ id, todos, datatime, iscompleted, toast }) {
  const [edit, setEdit] = useState(false);
  const [newtext, setNewtext] = useState(todos);
  const [isComplete, setIsComplete] = useState(iscompleted);
  const dispatch = useDispatch();

  const handleTodo = () => {
    if (newtext.trim()) {
      dispatch(edittodoThunk({ id, todos: newtext, datatime, iscompleted: isComplete })).then(() => {
        if (toast) toast.success('Todo updated!');
      });
      setEdit(false);
    }
  };

  const handleDelete = () => {
    dispatch(deletetodoThunk(id)).then(() => {
      if (toast) toast.success('Todo deleted!');
    });
  };

  const handleComplete = () => {
    setIsComplete(!isComplete);
    dispatch(edittodoThunk({ id, todos: newtext, datatime, iscompleted: !isComplete }));
  };

  return (
    <li className={`flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 w-full border-2 border-cyan-200 mb-2`}>
      <div className="flex-1 w-full flex flex-col gap-2 min-w-0">
        <div className="flex items-center gap-3 flex-wrap">
          <span
            className="text-lg w-full text-black min-w-0 font-semibold truncate"
            title={todos}
          >
            {todos.length > 40 ? todos.slice(0, 40) + '...' : todos}
          </span>
          {isComplete ? (
            <span className="px-3 py-1 bg-green-200 text-green-800 rounded-lg text-sm font-bold shadow">Completed</span>
          ) : (
            <span className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-lg text-sm font-bold shadow">Pending</span>
          )}
        </div>
        <span className="text-xs text-cyan-600 font-semibold">{formatDateTime(datatime)}</span>
      </div>
      <div className="flex flex-row flex-wrap gap-3 w-full sm:w-auto justify-center sm:justify-end mt-2 sm:mt-0">
        <button
          className="bg-green-500 flex justify-center items-center text-white px-7 py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition text-base font-bold shadow min-w-[80px]"
          onClick={handleComplete}
        >
          <CheckIcon />
        </button>
        <button
          className="bg-yellow-400 flex justify-center items-center text-white px-5 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-base font-bold shadow min-w-[80px]"
          onClick={() => setEdit(true)}
        >
          <EditIcon />
        </button>
        <button
          className="bg-red-500 flex justify-center items-center text-white px-4 py-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition text-base font-bold shadow min-w-[80px]"
          onClick={handleDelete}
        >
          <TrashIcon />
        </button>
      </div>
      {edit && (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-full mt-2">
          <input
            type="text"
            className="border-2 border-cyan-400 bg-white/80 rounded-xl px-4 py-2 w-full sm:w-[70%] md:w-[50%] focus:outline-none focus:ring-2 focus:ring-cyan-400 transition font-semibold shadow"
            value={newtext}
            onChange={(e) => setNewtext(e.target.value)}
            placeholder="Edit your task"
          />
          <button
            className="bg-cyan-500 text-white px-4 py-2 rounded-xl hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition w-full sm:w-auto font-bold shadow"
            onClick={handleTodo}
          >
            <SaveIcon/>
          </button>
        </div>
      )}
    </li>
  );
}

export default Todo;
