import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TaskDetail from './TaskDetail';

const mockStore = configureStore([]);

const initialState = {
  tasks: {
    currentTodo: { id: 1, title: 'Test todo', completed: false, userId: 1 },
    loading: false,
    error: null,
  }
};

function renderWithStore(storeState = initialState) {
  const store = mockStore(storeState);
  return render(
    <Provider store={store}>
      <TaskDetail taskId={1} />
    </Provider>
  );
}

describe('TaskDetail', () => {
  it('renders todo details', () => {
    renderWithStore();
    expect(screen.getByText('Task #1')).toBeInTheDocument();
    expect(screen.getByText('Test todo')).toBeInTheDocument();
  });

  it('shows loading', () => {
    renderWithStore({ tasks: { ...initialState.tasks, loading: true } });
    expect(screen.getByText(/loading task/i)).toBeInTheDocument();
  });

  it('shows error', () => {
    renderWithStore({ tasks: { ...initialState.tasks, error: 'Error!' } });
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  it('shows not found', () => {
    renderWithStore({ tasks: { ...initialState.tasks, currentTodo: null } });
    expect(screen.getByText(/task not found/i)).toBeInTheDocument();
  });
}); 