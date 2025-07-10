'use client';
import TaskDetail from '../../../components/TaskDetail';
import { use } from 'react';
import { PageBg, CenteredContainer } from '../../../components/styled/PageContainer';

interface TaskPageProps {
  params: Promise<{ id: string }>;
}

export default function TaskPage({ params }: TaskPageProps) {
  const { id } = use(params);
  const taskId = parseInt(id, 10);

  if (isNaN(taskId)) {
    return (
      <PageBg>
        <CenteredContainer>
          <div style={{ background: '#fff', borderRadius: 20, boxShadow: '0 8px 32px rgba(0,0,0,0.10)', border: '1px solid #e5e7eb', padding: 36, textAlign: 'center', color: '#ef4444', fontWeight: 700 }}>
            Invalid task ID
          </div>
        </CenteredContainer>
      </PageBg>
    );
  }

  return (
    <PageBg>
      <CenteredContainer>
        <TaskDetail taskId={taskId} />
      </CenteredContainer>
    </PageBg>
  );
} 