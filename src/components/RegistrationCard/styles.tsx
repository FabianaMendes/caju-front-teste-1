import styled from "styled-components";
import { IconButton } from "../IconButton";
import { ButtonSmall } from "../Button";

interface CardProps {
  $isLoading?: boolean;
}

export const Card = styled.div<CardProps>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  border: 4px solid #fff;
  margin: 16px;
  border-radius: 8px;
  padding: 16px;
  background-color: #fff;
  h3,
  p {
    margin: 0;
  }
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  opacity: ${({ $isLoading }) => $isLoading ? 0.5 : 1};
`;

export const IconAndText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Actions = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 4px;

  svg {
    cursor: pointer;
    height: 20px;
    width: 20px;
  }

  @media (min-width: 820px) {
    justify-content: space-between;
  }
`;

export const StyledIconButton = styled(IconButton)`
  padding: 0;
  margin-left: auto;
`

export const StyledButtonSmall = styled(ButtonSmall)`
  width: 100%;
  max-width: 200px;
  @media (min-width: 820px) {
    max-width: 140px;
  }
`