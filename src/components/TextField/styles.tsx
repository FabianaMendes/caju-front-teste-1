import styled from "styled-components";

interface InputProps {
  $isFetching?: boolean;
}

export const Input = styled.input<InputProps>`
  padding: 0 8px;
  vertical-align: middle;
  border-radius: 2px;
  width: 100%;
  min-height: 36px;
  background-color: #ffffff;
  border: 1px solid rgba(36, 28, 21, 0.3);
  transition: all 0.2s ease-in-out 0s;
  font-size: 16px;
  line-height: 18px;
  font-weight: normal;
  border-radius:8px;
  outline-color: rgba(36, 28, 21, 0.3);
  color: #080808;
  &:focus, &:focus-visible, &:focus-within {
    outline-color: #007c89;
    border-color: 1px solid #007c89;
    box-shadow: inset 0 0 0 1px #007c89;
  }
  &:disabled {
    border-color: rgba(36, 28, 21, 0.2);
    outline-color: rgba(36, 28, 21, 0.2);
    color: #c1c2c3;
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const InputWrapper = styled.div`
  width: 40%;
  height: 56px;
  padding-top: 10px;
`

export const Span = styled.span`
  font-size: 12;
  color: #da0000d8;
  height: 12px;
  width: 100%;
`