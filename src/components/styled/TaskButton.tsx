import styled from 'styled-components';

export const AddButton = styled.button`
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

export const CancelButton = styled.button`
  padding: 10px 22px;
  background: #6b7280;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-left: 10px;
  transition: background 0.2s;
  &:hover {
    background: #374151;
  }
`;

export const DeleteButton = styled.button`
  color: #ef4444;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: #b91c1c;
  }
`;

export const ToggleButton = styled.button<{completed: boolean}>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid ${({completed}) => completed ? '#22c55e' : '#d1d5db'};
  background: ${({completed}) => completed ? '#22c55e' : '#fff'};
  color: ${({completed}) => completed ? '#fff' : '#d1d5db'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  margin-right: 6px;
  transition: all 0.2s;
  &:hover {
    border-color: #22c55e;
  }
`; 