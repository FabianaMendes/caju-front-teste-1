import { HTMLAttributes } from 'react';
import * as S from './styles.tsx';

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  iconColor?: string;
  borderColor?: string;
}

export const IconButton = ({
  children,
  iconColor,
  borderColor,
  ...props
}: IconButtonProps) => {
  return (
    <S.IconButton
      $iconColor={iconColor}
      $borderColor={borderColor}
      {...props}
    >
      {children}
    </S.IconButton>
  );
};