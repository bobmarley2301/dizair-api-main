import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TaskList from './TaskList';

const mockStore = configureStore([]);

const initialState = {
  tasks: {
    todos: [
      { id: 1, title: 'Test todo', completed: false, userId: 1 },
      { id: 2, title: 'Another todo', completed: true, userId: 1 }
    ],
    loading: false,
    error: null,
  }
};

function renderWithStore(storeState = initialState) {
  const store = mockStore(storeState);
  return render(
    <Provider store={store}>
      <TaskList />
    </Provider>
  );
}

describe('TaskList', () => {
  it('renders todos', () => {
    renderWithStore();
    expect(screen.getByText('Test todo')).toBeInTheDocument();
    expect(screen.getByText('Another todo')).toBeInTheDocument();
  });

  it('shows loading', () => {
    renderWithStore({ tasks: { ...initialState.tasks, loading: true } });
    expect(screen.getByText(/loading tasks/i)).toBeInTheDocument();
  });

  it('shows error', () => {
    renderWithStore({ tasks: { ...initialState.tasks, error: 'Error!' } });
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  it('can open add form', () => {
    renderWithStore();
    fireEvent.click(screen.getByText(/add task/i));
    expect(screen.getByPlaceholderText(/enter task title/i)).toBeInTheDocument();
  });
}); 