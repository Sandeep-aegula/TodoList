import { createStore } from "redux";

const initialstate = {
    todos: [],
    nextId: 2,
}

const todoReducer = (state = initialstate, action) => {
    switch (action.type) {
        case "ADD_TODO":
            const newTodo = { 
                id: state.nextId, 
                title: action.payload.title, 
                datetime: action.payload.datetime
            };
            return {
                ...state, 
                todos: [...state.todos, newTodo], 
                nextId: state.nextId + 1
            };

        case "EDIT_TODO":
            return {
                ...state, 
                todos: state.todos.map((todo) =>
                    (todo.id === action.payload.id ? { ...todo, title: action.payload.title, datetime: action.payload.datetime } : todo) // Make sure datetime is updated too
                )
            }

        case "DELETE_TODO":
            return {
                ...state, 
                todos: state.todos.filter((todo) =>
                    (todo.id !== action.payload)
                )
            }

        default:
            return state;
    }
}

const store = createStore(todoReducer);
export default store;
