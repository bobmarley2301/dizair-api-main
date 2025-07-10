import styled from 'styled-components';

export const DetailCard = styled.div`
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.10);
  border: 1px solid #e5e7eb;
  padding: 36px;
  margin-bottom: 24px;
`;

export const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 18px;
`;

export const DetailId = styled.span`
  display: inline-block;
  background: #6366f1;
  color: #fff;
  padding: 4px 16px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
`;

export const DetailStatus = styled.span<{completed: boolean}>`
  display: inline-block;
  padding: 6px 18px;
  border-radius: 14px;
  font-size: 1rem;
  font-weight: 600;
  background: ${({completed}) => completed ? '#d1fae5' : '#fef3c7'};
  color: ${({completed}) => completed ? '#065f46' : '#92400e'};
`;

export const DetailTitle = styled.h2<{completed: boolean}>`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 18px 0 10px 0;
  color: ${({completed}) => completed ? '#6b7280' : '#1f2937'};
  text-decoration: ${({completed}) => completed ? 'line-through' : 'none'};
`; 