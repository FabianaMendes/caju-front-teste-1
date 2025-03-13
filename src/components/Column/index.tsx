import * as S from "./styles";
import { Status } from "~/types/Admission";

type Props = {
  status: Status;
  title: string;
  children?: React.ReactNode;
};

const Column = ({ status, title, children }: Props) => {
  return (
    <S.Column $status={status}>
      <>
        <S.TitleColumn $status={status}>
          {title}
        </S.TitleColumn>
        <S.CollumContent>
          {children}
        </S.CollumContent>
      </>
    </S.Column>
  );
};

export default Column;