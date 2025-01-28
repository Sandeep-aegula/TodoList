
export function addtodo(todo) {
    return { type: "ADD_TODO", payload: todo }
}
export function edittodo(todo) {
    return { type: "EDIT_TODO", payload: todo }
}
export function deletetodo(id) {
    return { type: "DELETE_TODO", payload: id };
  }
  