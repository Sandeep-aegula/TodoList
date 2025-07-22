import { fetchTodos as fetchTodosAPI, addTodo as addTodoAPI, updateTodo, deleteTodo as deleteTodoAPI } from './api';

export function setTodos(todos) {
    return { type: "SET_TODOS", payload: todos };
}

export function fetchTodosThunk() {
    return async (dispatch) => {
        const todos = await fetchTodosAPI();
        dispatch(setTodos(todos));
    };
}

export function addtodoThunk(todo) {
    return async (dispatch) => {
        await addTodoAPI(todo);
        dispatch(fetchTodosThunk());
    };
}

export function edittodoThunk(todo) {
    return async (dispatch) => {
        await updateTodo(todo.id || todo._id, todo);
        dispatch(fetchTodosThunk());
    };
}

export function deletetodoThunk(id) {
    return async (dispatch) => {
        await deleteTodoAPI(id);
        dispatch(fetchTodosThunk());
    };
}
  