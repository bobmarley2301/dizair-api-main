'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
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


interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number; 
}

const TaskCard = React.memo(function TaskCard({ todo, onTodoClick, onToggle, onDelete }: { todo: Todo, onTodoClick: (todoId: number) => void, onToggle: (e: React.MouseEvent, todoId: number) => void, onDelete: (e: React.MouseEvent, todoId: number) => Promise<void> }) {
  return (
    <Card onClick={() => onTodoClick(todo.id)}>
      <CardHeader>
        <CardId>#{todo.id}</CardId>
        <CardActions>
          <ToggleButton
            completed={todo.completed}
            onClick={(e) => onToggle(e, todo.id)}
          >
            {todo.completed && '\u2713'}
          </ToggleButton>
          <DeleteButton
            onClick={(e) => onDelete(e, todo.id)}
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
  );
});

export default function TaskList() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { todos, loading, error } = useAppSelector((state) => state.tasks);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleTodoClick = useCallback((todoId: number) => {
    router.push(`/task/${todoId}`);
  }, [router]);

  const handleAddTodo = useCallback(async (e: React.FormEvent) => {
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
  }, [newTodoTitle, dispatch]);

  const handleDeleteTodo = useCallback(async (e: React.MouseEvent, todoId: number) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this task?')) {
      await dispatch(deleteTodo(todoId));
    }
  }, [dispatch]);

  const handleToggleTodo = useCallback((e: React.MouseEvent, todoId: number) => {
    e.stopPropagation();
    dispatch(toggleTodo(todoId));
  }, [dispatch]);

  const memoizedTodos = useMemo(() => todos, [todos]);

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
          {memoizedTodos.map((todo) => (
            <TaskCard
              key={todo.id}
              todo={todo}
              onTodoClick={handleTodoClick}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
            />
          ))}
        </div>
      </InnerContainer>
    </ListContainer>
  );
} 