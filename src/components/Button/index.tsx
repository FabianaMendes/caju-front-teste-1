import { ButtonHTMLAttributes } from 'react';
import * as S from './styles';
import Loader from '../Loader';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  isSubmitting?: boolean
}

export const Button = ({children, isSubmitting, ...props}: Props) => {
  return (
    <S.Button {...props} $isSubmitting={isSubmitting}>
      {isSubmitting && (
        <S.ButtonLoader>
          <Loader color='#FFF'/>
        </S.ButtonLoader>
      )}
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