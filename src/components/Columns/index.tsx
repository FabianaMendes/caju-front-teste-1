
import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { Admission, Status } from "~/types/Admission";

const allColumns = [
  { status: Status.REVIEW, title: "Pronto para revisar" },
  { status: Status.APPROVED, title: "Aprovado" },
  { status: Status.REPROVED, title: "Reprovado" },
];

type Props = {
  registrations?: any[];
};

const Collumns = ({ registrations }: Props) => {
  return (
    <S.Container>
      {allColumns.map((collum) => (
        <S.Column $status={collum.status} key={collum.title}>
          <>
            <S.TitleColumn $status={collum.status}>
              {collum.title}
            </S.TitleColumn>
            <S.CollumContent>
              {registrations && registrations?.map((registration: Admission) => {
                return registration.status === collum.status ? (
                  <RegistrationCard
                    data={registration}
                    key={registration.id}
                  />
                ) : null;
              })}
            </S.CollumContent>
          </>
        </S.Column>
      ))}
    </S.Container>
  );
};

export default Collumns;