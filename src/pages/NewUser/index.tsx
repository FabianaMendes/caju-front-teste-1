/* eslint-disable react-hooks/exhaustive-deps */
import TextField from "~/components/TextField"
import * as S from "./styles"
import { HiOutlineArrowLeft } from "react-icons/hi"
import { useHistory } from "react-router-dom"
import routes from "~/router/routes"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { applyCpfMask, emailValidationRegex, formatDate, fullNameValidationRegex, isValidCpf, onlyDigits } from "~/utils"
import { Admission, Status } from "~/types/Admission"
import { useRegisters } from "~/context/RegistersContext"

interface FormErrors {
  employeeName?: string;
  email?: string;
  cpf?: string;
  admissionDate?:string;
  status?: Status;
}

const NewUserPage = () => {
  const history = useHistory();
  const [errors, setErrors] = useState<FormErrors>({});
  const [cpf, setCpf] = useState('');
  const {
    addNewRegister,
    addNewRegisterStatus,
    resetStatus
  } = useRegisters();

  const goToHome = () => {
    history.push(routes.dashboard)
  }

  const validateName = (name: string) => {
    let nameError = ''
    if (!name) nameError = 'Nome obrigatório'
    if (name && !fullNameValidationRegex.test(name)) nameError = 'Insira nome e sobrenome'
    if (name && !isNaN(Number(name[0]))) nameError = 'O primeiro caractere do nome não pode ser um número'
    setErrors((prevErrors) => ({ ...prevErrors, employeeName: nameError }))
  }

  const validateCpf = (cpf: string) => {
    let cpfError = ''
    if (!cpf) cpfError = 'CPF obrigatório'
    if (cpf && !isValidCpf(cpf)) cpfError = 'CPF inválido'
    setErrors((prevErrors) => ({ ...prevErrors, cpf: cpfError }))
  }

  const validateEmail = (email: string) => {
    let emailError = ''
    if (!email) emailError = 'E-mail obrigatório'
    if (email && !emailValidationRegex.test(email)) emailError = 'E-mail inválido'
    setErrors((prevErrors) => ({ ...prevErrors, email: emailError }))
  }

  const validateDate = (date: string) => {
    let dateError = ''
    if (!date) dateError = 'Data obrigatório'
    setErrors((prevErrors) => ({ ...prevErrors, admissionDate: dateError }))
  }

  const validateFormData = (values: Admission) => {
    validateName(values.employeeName)
    validateCpf(values.cpf)
    validateEmail(values.email)
    validateDate(values.admissionDate)
  }

  const handleChangeCpf = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const maskedValue = applyCpfMask(value)
    setCpf(maskedValue)
    validateCpf(maskedValue)
  }

  const haveErrors = () => {
    return !!(errors.cpf || errors.admissionDate || errors.email || errors.employeeName)
  }

  const haveEmptyValues = (values: Admission) => {
    return !(values.admissionDate && values.cpf && values.email && values.employeeName)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const employeeName = (form.elements.namedItem('employeeName') as HTMLInputElement).value
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const cpf = (form.elements.namedItem('cpf') as HTMLInputElement).value
    const admissionDate = (form.elements.namedItem('admissionDate') as HTMLInputElement).value
    const newRegister: Admission = {
      employeeName,
      email,
      cpf: onlyDigits(cpf),
      admissionDate: formatDate(admissionDate),
      status: Status.REVIEW
    }
    validateFormData(newRegister)
    if (!haveErrors() && !haveEmptyValues(newRegister)) {
      addNewRegister(newRegister)
    }
  }

  useEffect(() => {
    if (addNewRegisterStatus.success) {
      goToHome()
      resetStatus()
    }
  }, [addNewRegisterStatus])

  return (
    <S.Container>
      <S.Card>
        <S.StyledIconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </S.StyledIconButton>
        <S.Form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
          <TextField
            placeholder="Nome"
            label="Nome"
            name="employeeName"
            error={errors.employeeName}
            onChange={(event: ChangeEvent<HTMLInputElement>) => validateName(event.target.value)}
          />
          <TextField
            placeholder="Email"
            label="Email"
            type="email"
            name="email"
            error={errors.email}
            onChange={(event: ChangeEvent<HTMLInputElement>) => validateEmail(event.target.value)}
          />
          <TextField
            placeholder="CPF"
            label="CPF"
            name="cpf"
            error={errors.cpf}
            value={cpf}
            onChange={handleChangeCpf}
          />
          <TextField
            label="Data de admissão"
            type="date"
            name="admissionDate"
            error={errors.admissionDate}
          />
          <S.StyledButton type="submit" isSubmitting={addNewRegisterStatus.isLoading}>
            Cadastrar
          </S.StyledButton>
        </S.Form>
      </S.Card>
    </S.Container>
  )
}

export default NewUserPage
