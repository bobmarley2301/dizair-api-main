'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchTodos, addTodo, deleteTodo, toggleTodo } from '../store/tasksSlice';
import {
  Card, Status, CardTitle, CardHeader, CardId, CardActions
} from './styled/TaskCard';
import {
  ListContainer, InnerContainer, ListHeader
} from './styled/TaskListContainer';
import {
  AddButton, CancelButton, DeleteButton, ToggleButton
} from './styled/TaskButton';
import { FormWrapper, Input } from './styled/Form';

export default function TaskList() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { todos, loading, error } = useAppSelector((state) => state.tasks);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleTodoClick = (todoId: number) => {
    router.push(`/task/${todoId}`);
  };

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoTitle.trim()) {
      await dispatch(addTodo({
        title: newTodoTitle.trim(),
        completed: false,
        userId: 1
      }));
      setNewTodoTitle('');
      setShowAddForm(false);
    }
  };

  const handleDeleteTodo = async (e: React.MouseEvent, todoId: number) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this task?')) {
      await dispatch(deleteTodo(todoId));
    }
  };

  const handleToggleTodo = async (e: React.MouseEvent, todoId: number) => {
    e.stopPropagation();
    dispatch(toggleTodo(todoId));
  };

  if (loading) {
    return <p style={{ color: '#6366f1', textAlign: 'center', fontWeight: 600 }}>Loading tasks...</p>;
  }

  if (error) {
    return <p style={{ color: '#ef4444', textAlign: 'center', fontWeight: 600 }}>Error: {error}</p>;
  }

  return (
    <ListContainer>
      <InnerContainer>
        <ListHeader>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#1f2937' }}>Task List</h1>
          {showAddForm ? (
            <CancelButton onClick={() => setShowAddForm(false)}>Cancel</CancelButton>
          ) : (
            <AddButton onClick={() => setShowAddForm(true)}>Add Task</AddButton>
          )}
        </ListHeader>

        {showAddForm && (
          <FormWrapper onSubmit={handleAddTodo}>
            <div style={{ display: 'flex', gap: 12 }}>
              <Input
                type="text"
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
                placeholder="Enter task title..."
                required
              />
              <AddButton type="submit">Add</AddButton>
            </div>
          </FormWrapper>
        )}

        <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          {todos.map((todo) => (
            <Card key={todo.id} onClick={() => handleTodoClick(todo.id)}>
              <CardHeader>
                <CardId>#{todo.id}</CardId>
                <CardActions>
                  <ToggleButton
                    completed={todo.completed}
                    onClick={(e) => handleToggleTodo(e, todo.id)}
                  >
                    {todo.completed && '✓'}
                  </ToggleButton>
                  <DeleteButton
                    onClick={(e) => handleDeleteTodo(e, todo.id)}
                    title="Delete"
                  >
                    🗑️
                  </DeleteButton>
                </CardActions>
              </CardHeader>
              <CardTitle completed={todo.completed}>{todo.title}</CardTitle>
              <Status completed={todo.completed}>
                {todo.completed ? 'Completed' : 'In Progress'}
              </Status>
            </Card>
          ))}
        </div>
      </InnerContainer>
    </ListContainer>
  );
} 