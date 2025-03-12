/* eslint-disable react-hooks/exhaustive-deps */
import Collumns from "../../components/Columns";
import * as S from "./styles";
import { SearchBar } from "../../components/Searchbar";
import { ChangeEvent, useCallback, useEffect, useRef } from "react";
import { useRegisters } from "~/context/RegistersContext";

const DashboardPage = () => {
  const {
    registrations,
    fetchAllRegistrations,
    fetchRegistrationsByCpf
  } = useRegisters()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchAllRegistrations();
  }, [])

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

  const handleFilterData = (event: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  }

  const clearFilter = () => {
    fetchAllRegistrations();
  }

  return (
    <S.Container>
      <SearchBar handleSearchCpf={handleFilterData} handleRefreshSearch={clearFilter} />
      <Collumns registrations={registrations} />
    </S.Container>
  );
};

export default DashboardPage;
