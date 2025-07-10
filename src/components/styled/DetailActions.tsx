import styled from 'styled-components';

export const ActionsRow = styled.div`
  display: flex;
  gap: 12px;
`;

export const BackButton = styled.button`
  padding: 10px 22px;
  background: #6366f1;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #4f46e5;
  }
`;

export const EditButton = styled.button`
  padding: 10px 22px;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #1d4ed8;
  }
`;

export const SaveButton = styled.button`
  padding: 10px 22px;
  background: #22c55e;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #16a34a;
  }
`;

export const CancelButton = styled.button`
  padding: 10px 22px;
  background: #6b7280;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #374151;
  }
`;

export const DeleteButton = styled.button`
  padding: 10px 22px;
  background: #ef4444;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #b91c1c;
  }
`; 