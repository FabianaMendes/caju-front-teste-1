import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { Status } from "~/types/Admission";

interface Props {
  isLoading: boolean;
  title: string;
  email: string;
  admissionDate: string;
  status: Status;
  id: string;
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
  id,
  onReprove,
  onApprove,
  onReview,
  onDelete
}: Props) => {  
  return (
    <>
      <S.Card
        $isLoading={isLoading}
        data-testid="registration-card"
        id={id}
        className="card"
      >
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
              <S.StyledButtonSmall
                bgColor="rgb(255, 145, 154)"
                onClick={onReprove}
                disabled={isLoading}
                id="reprove"
                data-testid="reprove-button"
              >
                Reprovar
              </S.StyledButtonSmall>
              <S.StyledButtonSmall
                bgColor="rgb(155, 229, 155)"
                onClick={onApprove}
                disabled={isLoading}
                id="approve"
                data-testid="approve-button"
              >
                Aprovar
              </S.StyledButtonSmall>
            </>
          )}
          {status !== Status.REVIEW && (
            <S.StyledButtonSmall
              bgColor="#ff8858"
              onClick={onReview}
              disabled={isLoading}
              id="review"
              data-testid="review-button"
            >
              Revisar novamente
            </S.StyledButtonSmall>
          )}
          <S.StyledIconButton
            borderColor="transparent"
            iconColor="black"
            id="delete"
            onClick={onDelete}
            data-testid="delete-button"
          >
            <HiOutlineTrash />
          </S.StyledIconButton>
        </S.Actions>
      </S.Card>
      
    </>
  );
};

export default RegistrationCard;
