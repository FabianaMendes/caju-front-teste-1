import * as S from './styles.tsx'

interface Props {
  text: string;
}

const Header = ({ text }: Props) => {
  return (
    <S.Header>
      <h1>
        {text}
      </h1>
    </S.Header>
  )
}

export default Header