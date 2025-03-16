import styled from "styled-components";

interface ButtonProps {
  $isSubmitting?: boolean
  $padding?: string
}

export const Button = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 36px;
  padding: ${({ $padding }) => $padding ?? '8px 32px'};
  background-color: #64a98c;
  cursor: pointer;
  height: 56px;
  color: ${({ $isSubmitting }) => $isSubmitting ? 'transparent' : '#fff'};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  font-size: 16px;
  font-weight: 600;
  position: relative;
`;

export const ButtonLoader = styled.div`
  position: absolute;
`

interface ButtonSmallProps {
  $bgColor?: string;
  $color?: string;
}

export const ButtonSmall = styled.button<ButtonSmallProps>`
  font-size: 12px;
  border-radius: 4px;
  border: none;
  padding: 4px 16px;
  background-color: ${({ $bgColor }) => $bgColor ?? 'none'};
  color: ${({ $color }) => $color ?? "#000"};
  cursor: pointer;
`;