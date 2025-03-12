import * as S from './styles'

export interface ModalProps {
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Modal = ({ text, onConfirm, onCancel }: ModalProps) => {
  return (
    <S.ModalOverlay aria-hidden="true" role="dialog" data-testid="modal-overlay">
      <S.Modal aria-modal="true" role="dialog" aria-labelledby={text}>
        <S.ModalTitle>
          {text}
        </S.ModalTitle>
        <S.ButtonsWrapper>
          <S.StyledButtonSmall bgColor="rgb(255, 145, 154)" onClick={onCancel}>
            Cancelar
          </S.StyledButtonSmall>
          <S.StyledButtonSmall bgColor="rgb(155, 229, 155)" onClick={onConfirm}>
            Confirmar
          </S.StyledButtonSmall>
        </S.ButtonsWrapper>
      </S.Modal>
    </S.ModalOverlay>
  )
}

export default Modal;