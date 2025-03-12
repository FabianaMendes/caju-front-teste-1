import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { Button } from "~/components/Button";
import { IconButton } from "~/components/IconButton";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import * as S from "./styles";
import { ChangeEvent } from "react";

interface Props {
  handleSearchCpf: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRefreshSearch: () => void;
}

export const SearchBar = ({ handleSearchCpf, handleRefreshSearch }: Props) => {
  const history = useHistory();

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };
  
  return (
    <S.Container>
      <TextField placeholder="Digite um CPF válido" onChange={handleSearchCpf} />
      <S.Actions>
        <IconButton aria-label="refetch">
          <HiRefresh onClick={handleRefreshSearch} />
        </IconButton>
        <Button onClick={goToNewAdmissionPage}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
