/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import * as S from './styles'

export interface ModalProps {
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
  lastIdFocused: string;
}

const Modal = ({ text, onConfirm, onCancel, lastIdFocused }: ModalProps) => {
  function onCloseAndRefocused() {
    if (lastIdFocused !== undefined && lastIdFocused !== '') {
      if (document.getElementById(lastIdFocused)) {
        (document.getElementById(lastIdFocused) as any).focus()
      }
    }
    onCancel()
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event && event.key === 'Escape') {
      onCloseAndRefocused()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown, false)
    return () => {
      document.removeEventListener('keydown', onKeyDown, false)
    }
  }, [])

  return (
    <>
      <S.ModalOverlay
        aria-hidden="true"
        role="dialog"
        data-testid="modal-overlay"
        onClick={onCloseAndRefocused}
      />
      <S.Modal aria-modal="true" role="dialog" aria-labelledby={text}>
        <S.ModalTitle>
          {text}
        </S.ModalTitle>
        <S.ButtonsWrapper>
          <S.StyledButtonSmall bgColor="rgb(255, 145, 154)" onClick={onCloseAndRefocused}>
            Cancelar
          </S.StyledButtonSmall>
          <S.StyledButtonSmall bgColor="rgb(155, 229, 155)" onClick={onConfirm}>
            Confirmar
          </S.StyledButtonSmall>
        </S.ButtonsWrapper>
      </S.Modal>
    </>
  )
}

export default Modal;