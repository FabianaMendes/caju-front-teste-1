import * as S from './styles.tsx'

interface Props {
  text: string;
}

const Header = ({ text }: Props) => {
  return (
    <S.Header data-testid="header">
      <h1>
        {text}
      </h1>
    </S.Header>
  )
}

export default Header