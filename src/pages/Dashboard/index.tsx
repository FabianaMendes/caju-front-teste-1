/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Collumns from "../../components/Columns";
import { SearchBar } from "../../components/Searchbar";
import { useRegisters } from "~/context/RegistersContext";
import * as S from "./styles";

const DashboardPage = () => {
  const {
    registrations,
    isFetchingAll,
    isFetchingByCpf,
    fetchAllRegistrations,
  } = useRegisters()

  useEffect(() => {
    fetchAllRegistrations();
  }, [])

  return (
    <S.Container>
      <SearchBar />
      <Collumns registrations={registrations} isLoading={isFetchingAll || isFetchingByCpf} />
    </S.Container>
  );
};

export default DashboardPage;
