import { createContext, useContext, useEffect, useState } from "react";
import { getRegistrations, searchRegisterByCpf } from "~/services/api";
import { Admission } from "~/types/Admission";

interface IRegisterContext {
  registrations: Admission[];
  updateRegistrations: (values: Admission[]) => void;
  fetchAllRegistrations: () => void;
  fetchRegistrationsByCpf: (cpf: string) => void;
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
        console.log(data)
      } catch (error) {
        alert(error);
      }
    }
  
  const fetchRegistrationsByCpf = async (cpf: string) => {
    try {
      const data = await searchRegisterByCpf(cpf);
      setRegistrations(data);
      console.log(data)
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    fetchAllRegistrations()
  }, [])

  const updateRegistrations = (values: Admission[]) => {
    setRegistrations(values)
  }

  return (
    <RegistersContext.Provider
      value={{
        registrations,
        updateRegistrations,
        fetchAllRegistrations,
        fetchRegistrationsByCpf
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