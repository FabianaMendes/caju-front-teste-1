import { ButtonSmall } from "~/components/Button";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";

type Props = {
  data: any;
};

const RegistrationCard = ({ data }: Props) => {
  return (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{data.employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{data.email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{data.admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        <ButtonSmall bgColor="rgb(255, 145, 154)">Reprovar</ButtonSmall>
        <ButtonSmall bgColor="rgb(155, 229, 155)">Aprovar</ButtonSmall>
        <ButtonSmall bgColor="#ff8858">Revisar novamente</ButtonSmall>
        <HiOutlineTrash />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
