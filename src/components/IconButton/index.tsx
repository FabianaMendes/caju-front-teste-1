import * as S from './styles.tsx'

type IconButtonProps = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>;

export const IconButton = (props: IconButtonProps) => {
  return (
    <S.IconButton {...props}>
      {props.children}
    </S.IconButton>
  );
};