import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

const initialstate = {
    todos: [],
    nextId: 2,
}

const todoReducer = (state = initialstate, action) => {
    switch (action.type) {
        case "ADD_TODO":
            const newTodo = { 
                ...(action.payload._id ? { _id: action.payload._id } : { id: state.nextId }),
                ...action.payload
            };
            return {
                ...state, 
                todos: [...state.todos, newTodo], 
                nextId: action.payload._id ? state.nextId : state.nextId + 1
            };

        case "EDIT_TODO":
            return {
                ...state, 
                todos: state.todos.map((todo) =>
                    ((todo._id || todo.id) === (action.payload._id || action.payload.id) ? { ...todo, ...action.payload } : todo)
                )
            }

        case "DELETE_TODO":
            return {
                ...state, 
                todos: state.todos.filter((todo) =>
                    ((todo._id || todo.id) !== action.payload)
                )
            }
        case "SET_TODOS":
            return {
                ...state,
                todos: action.payload,
            };
        default:
            return state;
    }
}

const store = createStore(
    todoReducer,
    applyMiddleware(thunk)
);
export default store;
