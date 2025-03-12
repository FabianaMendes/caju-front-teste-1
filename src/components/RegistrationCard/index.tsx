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
import Modal, { ModalProps } from "../Modal";
import { useState } from "react";

type Props = {
  data: Admission;
};

const RegistrationCard = ({ data }: Props) => {
  const [modalProps, setModalProps] = useState<ModalProps>({} as ModalProps)
  const [showModal, setShowModal] = useState<boolean>(false)
  const {
    updateCardStatus,
    isUpdatingCard,
    deleteCard
  } = useRegisters()

  const handleCloseModal = () => {
    setModalProps({} as ModalProps)
    setShowModal(false)
  }

  const handleReprove = (cardData: Admission) => {
    if (cardData.status !== Status.REPROVED) {
      setModalProps({
        onCancel: () => handleCloseModal(),
        onConfirm: () => {
          updateCardStatus({ ...cardData, status: Status.REPROVED });
          handleCloseModal();
        },
        text: `Tem certeza que deseja REPROVAR o candidato ${cardData.employeeName}?`
      })
      setShowModal(true)
    }
  }

  const handleApprove = (cardData: Admission) => {
    if (cardData.status !== Status.APPROVED) {
      setModalProps({
        onCancel: () => handleCloseModal(),
        onConfirm: () => {
          updateCardStatus({ ...cardData, status: Status.APPROVED });
          handleCloseModal();
        },
        text: `Tem certeza que deseja APROVAR o candidato ${cardData.employeeName}?`
      })
      setShowModal(true)
    }
  }

  const handleReview = (cardData: Admission) => {
    if (cardData.status !== Status.REVIEW) {
      setModalProps({
        onCancel: () => handleCloseModal(),
        onConfirm: () => {
          updateCardStatus({ ...cardData, status: Status.REVIEW });
          handleCloseModal();
        },
        text: `Tem certeza que deseja REVISAR o candidato ${cardData.employeeName}?`
      })
      setShowModal(true)
    }
  }

  const handleDelete = (cardData: Admission) => {
    if (cardData.status !== Status.REVIEW) {
      setModalProps({
        onCancel: () => handleCloseModal(),
        onConfirm: () => {
          deleteCard(cardData.id);
          handleCloseModal();
        },
        text: `Tem certeza que deseja DELETAR o candidato ${cardData.employeeName}?`
      })
      setShowModal(true)
    }
  }
  
  return (
    <>
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
              <ButtonSmall
                bgColor="rgb(255, 145, 154)"
                onClick={() => handleReprove(data)}
                disabled={isUpdatingCard === data.id}
              >
                Reprovar
              </ButtonSmall>
              <ButtonSmall
                bgColor="rgb(155, 229, 155)"
                onClick={() => handleApprove(data)}
                disabled={isUpdatingCard === data.id}
              >
                Aprovar
              </ButtonSmall>
            </>
          )}
          {data.status !== Status.REVIEW && (
            <ButtonSmall
              bgColor="#ff8858"
              onClick={() => handleReview(data)}
              disabled={isUpdatingCard === data.id}
            >
              Revisar novamente
            </ButtonSmall>
          )}
          <HiOutlineTrash role="button" onClick={() => handleDelete(data)} />
        </S.Actions>
      </S.Card>
      {showModal && (
        <Modal {...modalProps} />
      )}
    </>
  );
};

export default RegistrationCard;
