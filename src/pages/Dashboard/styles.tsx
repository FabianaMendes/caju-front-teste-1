import styled from "styled-components";

export const Container = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: calc(100% - 64px);
  margin-top: 64px;
  padding-bottom: 80px;
  @media (min-width: 820px) {
    padding-bottom: 0;
  }
`;

export const CollumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 24px;
  justify-content: center;
  margin-top: 24px;
  position: relative;
  @media (min-width: 820px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const ScreenLoader = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff;
  opacity: 0.6;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 100px;
`