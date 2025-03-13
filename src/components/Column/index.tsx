import * as S from "./styles";
import { Status } from "~/types/Admission";

interface Props {
  status: Status;
  title: string;
  children?: React.ReactNode;
};

const Column = ({ status, title, children }: Props) => {
  return (
    <S.Column $status={status} data-testid={`column-${status}`}>
      <>
        <S.TitleColumn $status={status} data-testid={`column-title-${status}`}>
          {title}
        </S.TitleColumn>
        <S.CollumContent data-testid={`column-content-${status}`}>
          {children}
        </S.CollumContent>
      </>
    </S.Column>
  );
};

export default Column;