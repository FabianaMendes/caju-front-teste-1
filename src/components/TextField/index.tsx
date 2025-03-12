import { InputHTMLAttributes } from "react";
import * as S from './styles';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  id?: string;
};

const TextField = ({label, error, id, ...props}: Props) => {
  return (
    <S.InputWrapper>
      <label htmlFor={id}>{label}</label>
      <S.Input {...props} disabled={props.disabled} />
      <S.Span>{error}</S.Span>
    </S.InputWrapper>
  );
};

export default TextField;
