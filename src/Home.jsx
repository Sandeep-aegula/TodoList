import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TodoList from './TodoList';
import { AddIcon } from './todo-icons';
import { addtodoThunk, fetchTodosThunk } from './actions';
import toast, { Toaster } from 'react-hot-toast';
import { Particles } from "@tsparticles/react";

function Home() {
  const dispatch = useDispatch();
  const [todotext, setTodotext] = useState('');
  const [datatime, setDatatime] = useState('');
  const [loading, setLoading] = useState(false);
  const [dateError, setDateError] = useState(false);

  useEffect(() => {
    dispatch(fetchTodosThunk());
  }, [dispatch]);

  const handleTodo = () => {
    if (!datatime) {
      setDateError(true);
      toast.error('Please select a date and time!');
      return;
    }
    if (todotext.trim() && datatime) {
      setLoading(true);
      dispatch(addtodoThunk({ todos: todotext, datatime, iscompleted: false }))
        .then(() => {
          setTodotext('');
          setDatatime('');
          setLoading(false);
          setDateError(false);
          toast.success('Todo added!');
        });
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start py-8 relative overflow-hidden bg-gradient-to-br from-blue-900 via-black to-purple-900 animate-gradient-move">
      <Toaster position="top-right" />
      <Particles
        id="tsparticles"
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              onClick: { enable: true, mode: "push" }
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 },
              push: { quantity: 4 }
            }
          }
        }}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ position: "absolute", inset: 0, zIndex: 0 }}
      />
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-4 relative z-10">
        <h2 className="text-green-400 glowing-text text-lg sm:text-2xl lg:text-3xl text-center p-5 font-bold drop-shadow-lg">
          TODO LIST APP
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 w-full bg-white/80 backdrop-blur-lg rounded-t-lg shadow-2xl p-4 border border-blue-400">
          <input
            type="text"
            className="flex-1 border-2 border-blue-400 bg-white/90 rounded px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder:text-blue-400 font-semibold shadow"
            value={todotext}
            onChange={(e) => setTodotext(e.target.value)}
            placeholder="Enter a task"
          />
          <div className="flex w-full sm:w-auto gap-2">
            <input
              type="datetime-local"
              className={`flex-[2] border-2 rounded px-3 py-2 text-sm sm:text-base focus:outline-none transition min-w-0 font-semibold shadow ${dateError ? 'border-red-500' : 'border-blue-400'} bg-white/90 placeholder:text-blue-400`}
              value={datatime}
              onChange={(e) => {
                setDatatime(e.target.value);
                setDateError(false);
              }}
            />
            <button
              className="flex-[1] bg-blue-600 flex justify-center items-center rounded px-5 py-3 text-white hover:bg-blue-700 transition text-sm sm:text-base flex-shrink-0 min-w-[48px] font-bold shadow"
              onClick={handleTodo}
              disabled={!todotext.trim() || !datatime || loading}
            >
              <AddIcon />
            </button>
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-b-lg shadow-2xl p-4 min-h-[60vh] max-h-[60vh] w-full flex flex-col items-start justify-start overflow-y-auto mt-4 border border-blue-400">
          {loading ? (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
              <span className="text-blue-700 text-lg font-semibold">Loading...</span>
            </div>
          ) : (
            <TodoList toast={toast} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
