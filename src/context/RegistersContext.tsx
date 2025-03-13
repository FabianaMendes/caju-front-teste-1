import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { createAdmission, deleteRegister, getRegistrations, searchRegisterByCpf, updateCard } from "~/services/api";
import { Admission } from "~/types/Admission";
import { initialRequestStatus, RequestStatus } from "~/types/Requests";

interface IRegisterContext {
  registrations: Admission[];
  fetchAllStatus: RequestStatus;
  fetchByCpfStatus: RequestStatus;
  isUpdatingCard: string;
  addNewRegisterStatus: RequestStatus;
  fetchAllRegistrations: () => void;
  fetchRegistrationsByCpf: (cpf: string) => void;
  updateCardStatus: (cardData: Admission) => void;
  deleteCard: (id: string) => void;
  addNewRegister: (register: Admission) => void;
  resetStatus: () => void;
}

const RegistersContext = createContext<IRegisterContext>({} as IRegisterContext)

interface Props {
  children: React.ReactNode;
}

const RegistersProvider = ({
  children,
}: Props) => {
  const [registrations, setRegistrations] = useState<Admission[]>([]);
  const [fetchAllStatus, setFetchAllStatus] = useState<RequestStatus>(initialRequestStatus);
  const [fetchByCpfStatus, setFetchByCpfStatus] = useState<RequestStatus>(initialRequestStatus);
  const [isUpdatingCard, setIsUpdatingCard] = useState<string>('');
  const [addNewRegisterStatus, setAddNewRegisterStatus] = useState<RequestStatus>(initialRequestStatus);

  const resetStatus = () => {
    setAddNewRegisterStatus(initialRequestStatus)
    setFetchAllStatus(initialRequestStatus)
    setFetchByCpfStatus(initialRequestStatus)
  }

  const fetchAllRegistrations = async () => {
    setFetchAllStatus({ ...initialRequestStatus, isLoading: true })
    await getRegistrations()
      .then((response) => {
        setRegistrations(response)
        setFetchAllStatus({ ...initialRequestStatus, success: true })
      })
      .catch((error) => {
        toast.error(error)
        setFetchAllStatus({ ...initialRequestStatus, error: true })
      })
    }
  
  const fetchRegistrationsByCpf = async (cpf: string) => {
    setFetchByCpfStatus({ ...initialRequestStatus, isLoading: true })
    await searchRegisterByCpf(cpf)
    .then((response) => {
      setRegistrations(response)
      setFetchByCpfStatus({ ...initialRequestStatus, success: true })
    })
    .catch((error) => {
      toast.error(error)
      setFetchByCpfStatus({ ...initialRequestStatus, error: true })
    })
  }

  const updateCardStatus = async (cardData: Admission) => {
    setIsUpdatingCard(cardData.id || '')
    await updateCard(cardData)
    .then(() => {
      toast.success(`Status de ${cardData.employeeName} atualizado com sucesso!`)
      fetchAllRegistrations()
    })
    .catch((error) => {
      toast.error(error)
    })
    .finally(() => {
      setIsUpdatingCard('')
    })
  }

  const deleteCard = async (id: string) => {
    setIsUpdatingCard(id)
    await deleteRegister(id)
    .then(() => {
      toast.success('Card deletado com sucesso!')
      fetchAllRegistrations()
    })
    .catch((error) => {
      toast.error(error)
    })
    .finally(() => {
      setIsUpdatingCard('')
    })
  }

  const addNewRegister = async (register: Admission) => {
    setAddNewRegisterStatus({ ...initialRequestStatus, isLoading: true })
    await createAdmission(register)
    .then(() => {
      fetchAllRegistrations()
      toast.success('Registro adicionado com sucesso!')
      setAddNewRegisterStatus({ ...initialRequestStatus, success: true })
    })
    .catch((error) => {
      toast.error(error)
      setAddNewRegisterStatus({ ...initialRequestStatus, error: true })
    })
  }

  return (
    <RegistersContext.Provider
      value={{
        registrations,
        fetchAllStatus,
        fetchByCpfStatus,
        isUpdatingCard,
        addNewRegisterStatus,
        fetchAllRegistrations,
        fetchRegistrationsByCpf,
        updateCardStatus,
        deleteCard,
        addNewRegister,
        resetStatus
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

export { useRegisters, RegistersProvider, RegistersContext }