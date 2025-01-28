import React from 'react'
import { useSelector } from 'react-redux'
import Todo from './Todo'

function TodoList() {
  const todos = useSelector((state) => state.todos)

  return (
    <ul className="list container mx-auto mt-2 p-4 backdrop-blur-md bg-opacity-25 bg-white rounded-lg shadow-lg max-w-4xl w-full space-y-3 sm:p-6 md:p-8 lg:p-10">
      {todos.map((todo) => (
        <Todo 
          id={todo.id} 
          key={todo.id} 
          title={todo.title} 
          datetime={todo.datetime} 
        />
      ))}
    </ul>
  )
}

export default TodoList
