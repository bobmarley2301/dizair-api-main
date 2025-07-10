import tasksReducer, { addTodo, deleteTodo, toggleTodo } from './tasksSlice';

describe('tasksSlice', () => {
  const initialState = {
    todos: [
      { id: 1, title: 'Test todo', completed: false, userId: 1 },
      { id: 2, title: 'Another todo', completed: true, userId: 1 }
    ],
    currentTodo: null,
    loading: false,
    error: null,
  };

  it('should handle addTodo.fulfilled', () => {
    const newTodo = { id: 3, title: 'New', completed: false, userId: 1 };
    const action = { type: addTodo.fulfilled.type, payload: newTodo };
    const state = tasksReducer(initialState, action);
    expect(state.todos[0]).toEqual(newTodo);
  });

  it('should handle deleteTodo.fulfilled', () => {
    const action = { type: deleteTodo.fulfilled.type, payload: 1 };
    const state = tasksReducer(initialState, action);
    expect(state.todos.length).toBe(1);
    expect(state.todos[0].id).toBe(2);
  });

  it('should handle toggleTodo', () => {
    const action = { type: toggleTodo.type, payload: 1 };
    const state = tasksReducer(initialState, action);
    expect(state.todos[0].completed).toBe(true);
  });
}); 