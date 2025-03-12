import { ButtonSmall } from "~/components/Button";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { Admission, Status } from "~/types/Admission";
import { useRegisters } from "~/context/RegistersContext";

type Props = {
  data: Admission;
};

const RegistrationCard = ({ data }: Props) => {
  const {
    updateCardStatus
  } = useRegisters()

  const handleReprove = (cardData: Admission) => {
    if (cardData.status !== Status.REPROVED) {
      updateCardStatus({ ...cardData, status: Status.REPROVED })
    }
  }

  const handleApprove = (cardData: Admission) => {
    if (cardData.status !== Status.APPROVED) {
      updateCardStatus({ ...cardData, status: Status.APPROVED })
    }
  }

  const handleReview = (cardData: Admission) => {
    if (cardData.status !== Status.REVIEW) {
      updateCardStatus({ ...cardData, status: Status.REVIEW })
    }
  }
  
  return (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{data.employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{data.email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{data.admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        {data.status === Status.REVIEW && (
          <>
            <ButtonSmall bgColor="rgb(255, 145, 154)" onClick={() => handleReprove(data)}>
              Reprovar
            </ButtonSmall>
            <ButtonSmall bgColor="rgb(155, 229, 155)" onClick={() => handleApprove(data)}>
              Aprovar
            </ButtonSmall>
          </>
        )}
        {data.status !== Status.REVIEW && (
          <ButtonSmall bgColor="#ff8858" onClick={() => handleReview(data)}>
            Revisar novamente
          </ButtonSmall>
        )}
        <HiOutlineTrash />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
