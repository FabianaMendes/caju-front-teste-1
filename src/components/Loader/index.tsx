import { AiOutlineLoading3Quarters } from "react-icons/ai";
import * as S from './styles';

interface Props {
  size?: string;
  color?: string;
}

const Loader = ({ size, color }: Props) => {
  return (
    <S.LoaderContainer size={size} color={color}>
      <AiOutlineLoading3Quarters/>
    </S.LoaderContainer>
  )
}

export default Loader;
