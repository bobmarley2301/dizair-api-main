import styled from 'styled-components';

export const FormWrapper = styled.form`
  background: #f3f4f6;
  border-radius: 14px;
  padding: 20px;
  margin-bottom: 24px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px 14px;
  border: 1.5px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  color: #111827;
  background: #fff;
  outline: none;
  transition: border 0.2s;
  &:focus {
    border-color: #6366f1;
  }
`; 