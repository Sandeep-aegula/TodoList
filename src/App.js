import { useState } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { addtodo } from './actions';
import TodoList from './TodoList';
import { AddIcon } from './todo-icons';

function App() {
  const dispatch = useDispatch();
  const [todotitle, setTodo] = useState('');
  const [dateTime, setDateTime] = useState('');  // New state for date and time input

  const handleTodo = () => {
    if (todotitle.trim() && dateTime) {
      const newTodo = {
        title: todotitle,
        datetime: dateTime,  // Include the date-time along with the task
      };
      dispatch(addtodo(newTodo)); // Dispatch action with both title and datetime
      setTodo('');
      setDateTime(''); // Reset both inputs after adding a todo
    } else {
      alert("Please enter a task and select a date-time!");
    }
  };

  return (
    <div className=" absolute h-full w-full bg-black flex justify-center items-center">
      <div className="container flex flex-col justify-center items-center w-full h-full sm:px-8 md:px-10 lg:px-12">
        <h2 className="text-green-500 glowing-text text-lg sm:text-2xl lg:text-3xl text-center p-5 font-semibold">
          TODO LIST APP
        </h2>
        <section className="flex flex-wrap justify-center items-center gap-4 w-full">
          <input
            type="text"
            className="border-2 border-blue-600 rounded px-3 py-2 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={todotitle}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Enter a task"
          />
          <input
            type="datetime-local"
            className="border-2 border-blue-600 rounded px-3 py-2 w-[40%] sm:w-[25%] md:w-[25%] lg:w-[15%] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />
          <button
            className="bg-blue-600 rounded px-5 py-3 text-white hover:bg-blue-700 transition text-sm sm:text-base"
            onClick={handleTodo}
            disabled={!todotitle.trim() || !dateTime} // Disable button when input is empty or no date-time is selected
          >
            <AddIcon />
          </button>
        </section>
        <div className="w-full mt-5">
          <TodoList /> 
        </div>
      </div>
    </div>
  );
}

export default App;
