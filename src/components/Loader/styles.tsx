import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

interface LoaderProps {
  color?: string;
  size?: string;
}
export const LoaderContainer = styled.div<LoaderProps>`
  color: ${({ color }) => color ?? 'gray'};
  svg {
    height: ${({ size }) => size ?? '20px'};
    width: ${({ size }) => size ?? '20px'};
    animation: ${rotate} 1.5s linear infinite;
  }
`