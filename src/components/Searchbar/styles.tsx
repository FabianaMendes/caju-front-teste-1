import styled from "styled-components";
import { Button } from "../Button";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

export const SearchInput = styled.section`
  width: 300px;
  height: 56px;
  padding-top: 10px;
`

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
`;

export const DesktopButton = styled(Button)`
  display: none;
  @media (min-width: 820px) {
    display: flex;
  }
`

export const MobileButton = styled(Button)`
  @media (min-width: 820px) {
    display: none;
  }
`