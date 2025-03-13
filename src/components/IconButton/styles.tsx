import styled from "styled-components";

interface ButtonProps {
  $borderColor?: string;
  $iconColor?: string;
}

export const IconButton = styled.button<ButtonProps>`
  cursor: pointer;
  border: 2px solid;
  border-color: ${({ $borderColor }) => $borderColor ?? '#64a98c'};
  width: fit-content;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  svg {
    color: ${({ $iconColor }) => $iconColor ?? '#64a98c'};
  }

`;