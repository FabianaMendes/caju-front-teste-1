/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { Button } from "~/components/Button";
import { IconButton } from "~/components/IconButton";
import TextField from "~/components/TextField";
import { useRegisters } from "~/context/RegistersContext";
import * as S from "./styles";
import { applyCpfMask, isValidCpf } from "../utils";

export const SearchBar = () => {
  const history = useHistory();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [cpfError, setCpfError] = useState<string>('')
  const [cpf, setCpf] = useState('')

  const {
    fetchAllRegistrations,
    fetchRegistrationsByCpf,
    isFetchingByCpf
  } = useRegisters();

  const debouncedSearch = useCallback((cpf: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      if (cpf) {
        fetchRegistrationsByCpf(cpf);
      } else {
        fetchAllRegistrations();
      }
      timeoutRef.current = null;
    }, 500);
  }, []);

  const handleFilterData = (cpf: string) => {
    debouncedSearch(cpf);
  }

  const clearFilter = () => {
    fetchAllRegistrations();
  }

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  }

  const validateCpf = (value: string) => {
    setCpfError('')
    if (value && isValidCpf(value)) {
      handleFilterData(cpf)
    } else if (value && !isValidCpf(value)) {
      setCpfError('CPF inválido')
    } else {
      clearFilter()
    }
  }

  const handleChangeCpf = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const maskedValue = applyCpfMask(value)
    setCpf(maskedValue)
    validateCpf(maskedValue)
  }
  
  return (
    <S.Container>
      <TextField
        placeholder="Digite um CPF válido"
        onChange={handleChangeCpf}
        disabled={isFetchingByCpf}
        error={cpfError}
        value={cpf}
      />
      <S.Actions>
        <IconButton aria-label="refetch">
          <HiRefresh onClick={clearFilter} />
        </IconButton>
        <Button onClick={goToNewAdmissionPage}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
