'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchTodoById, clearCurrentTodo, updateTodo, deleteTodo } from '../store/tasksSlice';
import {
  DetailCard, DetailHeader, DetailId, DetailStatus, DetailTitle
} from './styled/TaskDetailCard';
import {
  ActionsRow, BackButton, EditButton, SaveButton, CancelButton, DeleteButton
} from './styled/DetailActions';
import { FormWrapper, Input } from './styled/Form';

interface TaskDetailProps {
  taskId: number;
}

export default function TaskDetail({ taskId }: TaskDetailProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { currentTodo, loading, error } = useAppSelector((state) => state.tasks);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editCompleted, setEditCompleted] = useState(false);

  useEffect(() => {
    dispatch(fetchTodoById(taskId));
    return () => {
      dispatch(clearCurrentTodo());
    };
  }, [dispatch, taskId]);

  useEffect(() => {
    if (currentTodo) {
      setEditTitle(currentTodo.title);
      setEditCompleted(currentTodo.completed);
    }
  }, [currentTodo]);

  const handleBackClick = () => {
    router.push('/');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (currentTodo && editTitle.trim()) {
      await dispatch(updateTodo({
        ...currentTodo,
        title: editTitle.trim(),
        completed: editCompleted
      }));
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (currentTodo) {
      setEditTitle(currentTodo.title);
      setEditCompleted(currentTodo.completed);
    }
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (currentTodo && confirm('Are you sure you want to delete this task?')) {
      await dispatch(deleteTodo(currentTodo.id));
      router.push('/');
    }
  };

  if (loading) {
    return <p style={{ color: '#6366f1', textAlign: 'center', fontWeight: 600 }}>Loading task...</p>;
  }

  if (error) {
    return <p style={{ color: '#ef4444', textAlign: 'center', fontWeight: 600 }}>Error: {error}</p>;
  }

  if (!currentTodo) {
    return <p style={{ color: '#ef4444', textAlign: 'center', fontWeight: 600 }}>Task not found</p>;
  }

  return (
    <div>
      <ActionsRow style={{ justifyContent: 'space-between', marginBottom: 24 }}>
        <BackButton onClick={handleBackClick}>← Back to List</BackButton>
        <ActionsRow>
          {!isEditing ? (
            <>
              <EditButton onClick={handleEdit}>Edit</EditButton>
              <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
            </>
          ) : (
            <>
              <SaveButton onClick={handleSave}>Save</SaveButton>
              <CancelButton onClick={handleCancel}>Cancel</CancelButton>
            </>
          )}
        </ActionsRow>
      </ActionsRow>

      <DetailCard>
        <DetailHeader>
          <DetailId>Task #{currentTodo.id}</DetailId>
          <DetailStatus completed={currentTodo.completed}>
            {currentTodo.completed ? 'Completed' : 'In Progress'}
          </DetailStatus>
        </DetailHeader>

        {isEditing ? (
          <FormWrapper style={{ background: 'none', margin: 0, padding: 0 }}>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: '1rem', fontWeight: 500, color: '#374151', marginBottom: 8 }}>
                Task Title:
              </label>
              <Input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="checkbox"
                id="completed"
                checked={editCompleted}
                onChange={(e) => setEditCompleted(e.target.checked)}
                style={{ width: 18, height: 18 }}
              />
              <label htmlFor="completed" style={{ fontSize: '1rem', color: '#374151' }}>
                Completed
              </label>
            </div>
          </FormWrapper>
        ) : (
          <div>
            <DetailTitle completed={currentTodo.completed}>{currentTodo.title}</DetailTitle>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: '1rem', color: '#6b7280' }}>Status:</span>
              <DetailStatus completed={currentTodo.completed}>
                {currentTodo.completed ? 'Completed' : 'In Progress'}
              </DetailStatus>
            </div>
          </div>
        )}
      </DetailCard>
    </div>
  );
} 