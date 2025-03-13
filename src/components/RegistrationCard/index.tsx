import { ButtonSmall } from "~/components/Button";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { Status } from "~/types/Admission";

type Props = {
  isLoading: boolean;
  title: string;
  email: string;
  admissionDate: string;
  status: Status;
  onReprove: () => void;
  onApprove: () => void;
  onReview: () => void;
  onDelete: () => void;
}

const RegistrationCard = ({
  isLoading,
  title,
  email,
  admissionDate,
  status,
  onReprove,
  onApprove,
  onReview,
  onDelete
}: Props) => {  
  return (
    <>
      <S.Card $isLoading={isLoading}>
        <S.IconAndText>
          <HiOutlineUser />
          <h3>{title}</h3>
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineMail />
          <p>{email}</p>
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineCalendar />
          <span>{admissionDate}</span>
        </S.IconAndText>
        <S.Actions>
          {status === Status.REVIEW && (
            <>
              <ButtonSmall
                bgColor="rgb(255, 145, 154)"
                onClick={onReprove}
                disabled={isLoading}
                id="reprove"
              >
                Reprovar
              </ButtonSmall>
              <ButtonSmall
                bgColor="rgb(155, 229, 155)"
                onClick={onApprove}
                disabled={isLoading}
                id="approve"
              >
                Aprovar
              </ButtonSmall>
            </>
          )}
          {status !== Status.REVIEW && (
            <ButtonSmall
              bgColor="#ff8858"
              onClick={onReview}
              disabled={isLoading}
              id="review"
            >
              Revisar novamente
            </ButtonSmall>
          )}
          <S.StyledIconButton borderColor="transparent" iconColor="black" id="delete">
            <HiOutlineTrash role="button" onClick={onDelete} />
          </S.StyledIconButton>
        </S.Actions>
      </S.Card>
      
    </>
  );
};

export default RegistrationCard;
