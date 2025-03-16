import styled from "styled-components";

const registrationStatusStyles: {
  [key in string]: { background: string; title: string };
} = {
  REVIEW: {
    background: "#FDF8E9",
    title: "#EFC24D",
  },
  APPROVED: {
    background: "#EEEEFD",
    title: "#4242DF",
  },
  REPROVED: {
    background: "#FBEDF6",
    title: "#CE2893",
  },
};

export const Column = styled.div<{ $status: any }>`
  height: auto;
  background-color: ${({ $status }) =>
    registrationStatusStyles[$status].background};
  border-radius: 32px;
  min-height: fit-content;
  @media (min-width: 820px) {
    overflow-y: auto;
    min-height: 80vh;
    max-height: 80vh;
  }
`;

export const TitleColumn = styled.h3<{ $status: any }>`
  margin: 0px;
  color: ${({ $status }) => registrationStatusStyles[$status].title};
  margin: 24px;
`;

export const CollumContent = styled.div`
  max-height: 85%;
  height: fit-content;

  @media (min-width: 820px) {
    grid-template-columns: 1fr 1fr 1fr;
    overflow: auto;
  }
`;
