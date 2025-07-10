'use client';
import TaskList from '../components/TaskList';
import { PageBg, CenteredContainer } from '../components/styled/PageContainer';

export default function Home() {
  return (
    <PageBg>
      <CenteredContainer>
        <TaskList />
      </CenteredContainer>
    </PageBg>
  );
}
