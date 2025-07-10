import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface TasksState {
  todos: Todo[];
  currentTodo: Todo | null;
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  todos: [],
  currentTodo: null,
  loading: false,
  error: null,
};

// Отримання всіх TODO
export const fetchTodos = createAsyncThunk(
  'tasks/fetchTodos',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=20');
    const data = await response.json();
    return data as Todo[];
  }
);

// Отримання конкретного TODO
export const fetchTodoById = createAsyncThunk(
  'tasks/fetchTodoById',
  async (id: number) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    const data = await response.json();
    return data as Todo;
  }
);

// Додавання нового TODO
export const addTodo = createAsyncThunk(
  'tasks/addTodo',
  async (todo: Omit<Todo, 'id'>) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    const data = await response.json();
    return data as Todo;
  }
);

// Оновлення TODO
export const updateTodo = createAsyncThunk(
  'tasks/updateTodo',
  async (todo: Todo) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    const data = await response.json();
    return data as Todo;
  }
);

// Видалення TODO
export const deleteTodo = createAsyncThunk(
  'tasks/deleteTodo',
  async (id: number) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
    });
    return id;
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearCurrentTodo: (state) => {
      state.currentTodo = null;
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error loading tasks';
      })
      // Fetch todo by id
      .addCase(fetchTodoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodoById.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.loading = false;
        state.currentTodo = action.payload;
      })
      .addCase(fetchTodoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error loading task';
      })
      // Add todo
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.unshift(action.payload);
      })
      // Update todo
      .addCase(updateTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        const index = state.todos.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
        if (state.currentTodo?.id === action.payload.id) {
          state.currentTodo = action.payload;
        }
      })
      // Delete todo
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<number>) => {
        state.todos = state.todos.filter(t => t.id !== action.payload);
        if (state.currentTodo?.id === action.payload) {
          state.currentTodo = null;
        }
      });
  },
});

export const { clearCurrentTodo, toggleTodo } = tasksSlice.actions;
export default tasksSlice.reducer; 