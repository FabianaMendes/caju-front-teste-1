import { ButtonHTMLAttributes } from 'react';
import * as S from './styles';
import Loader from '../Loader';

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  isSubmitting?: boolean
  padding?: string
}

export const Button = ({children, isSubmitting, padding, ...props}: Props) => {
  return (
    <S.Button {...props} $isSubmitting={isSubmitting} $padding={padding}>
      {isSubmitting && (
        <S.ButtonLoader>
          <Loader color='#FFF'/>
        </S.ButtonLoader>
      )}
      {children}
    </S.Button>
  );
}

export interface IButtonSmall extends ButtonHTMLAttributes<HTMLButtonElement> {
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