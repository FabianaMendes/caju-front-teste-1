import { ButtonHTMLAttributes } from 'react';
import * as S from './styles';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const Button = ({children, ...props}: Props) => {
  return (
    <S.Button {...props}>
      {children}
    </S.Button>
  );
}

interface IButtonSmall extends ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor?: string;
  color?: string;
  children?: React.ReactNode
}

export const ButtonSmall = ({ children, bgColor, color, ...props }: IButtonSmall) => {
  return (
    <S.ButtonSmall $bgColor={bgColor} $color={color} {...props}>
      {children}
    </S.ButtonSmall>
  );
}