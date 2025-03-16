import styled from "styled-components";
import { Button } from "~/components/Button";
import { IconButton } from "~/components/IconButton";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Card = styled.div`
  border: 2px solid #f0f0f0;
  width: 100%;
  max-width: 500px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (min-width: 820px) {
    padding: 48px;
  }
`;

export const StyledIconButton = styled(IconButton)`
  margin-bottom: 8px;
  align-items: flex-start;
`
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const StyledButton = styled(Button)`
  align-self: flex-end;
`