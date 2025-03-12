import styled from "styled-components";
import { ButtonSmall } from "../Button";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Modal = styled.div`
  height: fit-content;
  max-height: 80vh;
  width: 50vw;
  padding: 30px;
  background-color: #FFF;
  border-radius: 8px;
`
export const ModalTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 30px;
  text-align: center;
`
export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 20px;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
`

export const StyledButtonSmall = styled(ButtonSmall)`
  font-size: 16px;
  font-weight: 500;
  padding: 8px 20px;
  width: 100%;
`