import styled from 'styled-components';

export const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  border: 1px solid #e5e7eb;
  padding: 24px;
  margin-bottom: 16px;
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
  &:hover {
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
    transform: translateY(-2px);
  }
`;

export const Status = styled.span<{completed: boolean}>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  background: ${({completed}) => completed ? '#d1fae5' : '#fef3c7'};
  color: ${({completed}) => completed ? '#065f46' : '#92400e'};
  margin-left: 8px;
`;

export const CardTitle = styled.h3<{completed: boolean}>`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 12px 0 0 0;
  color: ${({completed}) => completed ? '#6b7280' : '#1f2937'};
  text-decoration: ${({completed}) => completed ? 'line-through' : 'none'};
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
`;

export const CardId = styled.span`
  display: inline-block;
  background: #6366f1;
  color: #fff;
  padding: 2px 10px;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 700;
`;

export const CardActions = styled.div`
  display: flex;
  gap: 8px;
`; 