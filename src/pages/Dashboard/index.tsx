/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Column from "../../components/Column";
import { SearchBar } from "../../components/Searchbar";
import { useRegisters } from "~/context/RegistersContext";
import * as S from "./styles";
import { Admission, Status } from "~/types/Admission";
import Loader from "~/components/Loader";
import RegistrationCard from "~/components/RegistrationCard";
import Modal, { ModalProps } from "~/components/Modal";

const allColumns = [
  { status: Status.REVIEW, title: "Pronto para revisar" },
  { status: Status.APPROVED, title: "Aprovado" },
  { status: Status.REPROVED, title: "Reprovado" },
];

const DashboardPage = () => {
  const [modalProps, setModalProps] = useState<ModalProps>({} as ModalProps)
  const [showModal, setShowModal] = useState<boolean>(false)
  const {
    registrations,
    fetchAllStatus,
    fetchByCpfStatus,
    fetchAllRegistrations,
    isUpdatingCard,
    updateCardStatus,
    deleteCard
  } = useRegisters()

  useEffect(() => {
    fetchAllRegistrations();
  }, [])

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
        text: `Tem certeza que deseja REPROVAR o candidato ${cardData.employeeName}?`,
        lastIdFocused: "reprove"
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
        text: `Tem certeza que deseja APROVAR o candidato ${cardData.employeeName}?`,
        lastIdFocused: "approve"
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
        text: `Tem certeza que deseja REVISAR o candidato ${cardData.employeeName}?`,
        lastIdFocused: "review"
      })
      setShowModal(true)
    }
  }

  const handleDelete = (cardData: Admission) => {
    setModalProps({
      onCancel: () => handleCloseModal(),
      onConfirm: () => {
        deleteCard(cardData.id || '');
        handleCloseModal();
      },
      text: `Tem certeza que deseja DELETAR o candidato ${cardData.employeeName}?`,
      lastIdFocused: "delete"
    })
    setShowModal(true)
  }

  return (
    <S.Container>
      <SearchBar />
      <S.CollumnsWrapper>
        {(fetchAllStatus.isLoading || fetchByCpfStatus.isLoading) ? (
          <S.ScreenLoader><Loader size="40px" /></S.ScreenLoader>
        ) : null}
        {allColumns.map((column) => (
          <Column
            status={column.status}
            key={column.title}
            title={column.title}
          >
            {registrations && registrations?.map((registration: Admission, index: number) => (
              registration.status === column.status ? (
                <RegistrationCard
                  key={registration.id}
                  id={`${registration.id}-${index}` || ''}
                  isLoading={isUpdatingCard === registration.id}
                  title={registration.employeeName}
                  email={registration.email}
                  admissionDate={registration.admissionDate}
                  status={registration.status}
                  onApprove={() => handleApprove(registration)}
                  onReprove={() => handleReprove(registration)}
                  onReview={() => handleReview(registration)}
                  onDelete={() => handleDelete(registration)}
                />
              ) : null
            ))}
          </Column>
        ))}
      </S.CollumnsWrapper>
      {showModal && (
        <Modal {...modalProps} />
      )}
    </S.Container>
  );
};

export default DashboardPage;
