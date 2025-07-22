import React from 'react';
import { useSelector } from 'react-redux';
import Todo from './Todo';
function TodoList({ toast }) {
  const todos = useSelector(state => state.todos);
  // Sort: incomplete first, then by datatime ascending
  const sortedTodos = [...todos].sort((a, b) => {
    if ((a.iscompleted || false) !== (b.iscompleted || false)) {
      return a.iscompleted ? 1 : -1;
    }
    // Both same completion status, sort by datatime
    const dateA = new Date(a.datatime);
    const dateB = new Date(b.datatime);
    return dateA - dateB;
  });
  return (
    <ul className="flex flex-col gap-6 w-full">
      {sortedTodos.map((todo) => (
          <Todo
            id={todo._id || todo.id}
            key={todo._id || todo.id}
            todos={todo.todos}
            datatime={todo.datatime}
            iscompleted={todo.iscompleted}
            toast={toast}
          />
       
      ))}
    </ul>
  );
}

export default TodoList;
