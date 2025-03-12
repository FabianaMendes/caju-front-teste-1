import { createContext, useContext, useState } from "react";
import { getRegistrations, searchRegisterByCpf, updateCard } from "~/services/api";
import { Admission } from "~/types/Admission";

interface IRegisterContext {
  registrations: Admission[];
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
  // const [loading, setLoading] = useState<boolean>(false)
  // const [error, setError] = useState<string>('')

  const fetchAllRegistrations = async () => {
      try {
        const data = await getRegistrations();
        setRegistrations(data);
      } catch (error) {
        alert(error);
      }
    }
  
  const fetchRegistrationsByCpf = async (cpf: string) => {
    try {
      const data = await searchRegisterByCpf(cpf);
      setRegistrations(data);
    } catch (error) {
      alert(error);
    }
  }

  const updateCardStatus = async (cardData: Admission) => {
    try {
      await updateCard(cardData).then(() => {
        fetchAllRegistrations();
      })
    } catch (error) {
      alert(error);
    }
  }

  return (
    <RegistersContext.Provider
      value={{
        registrations,
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