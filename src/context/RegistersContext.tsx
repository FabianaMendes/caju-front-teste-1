import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { getRegistrations, searchRegisterByCpf, updateCard } from "~/services/api";
import { Admission } from "~/types/Admission";

interface IRegisterContext {
  registrations: Admission[];
  isFetchingAll: boolean;
  isFetchingByCpf: boolean;
  isUpdatingCard: string;
  fetchAllRegistrations: () => void;
  fetchRegistrationsByCpf: (cpf: string) => void;
  updateCardStatus: (cardData: Admission) => void;
}

const RegistersContext = createContext<IRegisterContext>({} as IRegisterContext)

interface Props {
  children: React.ReactNode;
}

const RegistersProvider = ({
  children,
}: Props) => {
  const [registrations, setRegistrations] = useState<Admission[]>([])
  const [isFetchingAll, setIsFetchingAll] = useState<boolean>(false)
  const [isFetchingByCpf, setIsFetchingByCpf] = useState<boolean>(false)
  const [isUpdatingCard, setIsUpdatingCard] = useState<string>('')

  const fetchAllRegistrations = async () => {
    setIsFetchingAll(true);
    await getRegistrations()
      .then((response) => {
        setRegistrations(response);
      })
      .catch((error) => {
        toast.error(error)
      })
      .finally(() => {
        setIsFetchingAll(false);
      })
    }
  
  const fetchRegistrationsByCpf = async (cpf: string) => {
    setIsFetchingByCpf(true);
    await searchRegisterByCpf(cpf)
    .then((response) => {
      setRegistrations(response);
    })
    .catch((error) => {
      toast.error(error)
    })
    .finally(() => {
      setIsFetchingByCpf(false);
    })
  }

  const updateCardStatus = async (cardData: Admission) => {
    setIsUpdatingCard(cardData.id);
    await updateCard(cardData)
    .then(() => {
      fetchAllRegistrations();
      toast.success(`Status de ${cardData.employeeName} atualizado com sucesso!`)
    })
    .catch((error) => {
      toast.error(error)
    })
    .finally(() => {
      setIsUpdatingCard('');
    })
  }

  return (
    <RegistersContext.Provider
      value={{
        registrations,
        isFetchingAll,
        isFetchingByCpf,
        isUpdatingCard,
        fetchAllRegistrations,
        fetchRegistrationsByCpf,
        updateCardStatus
      }}
    >
      {children}
    </RegistersContext.Provider>
  )
}

function useRegisters(): IRegisterContext {
  const context = useContext(RegistersContext)
  return context
}

export { useRegisters, RegistersProvider };