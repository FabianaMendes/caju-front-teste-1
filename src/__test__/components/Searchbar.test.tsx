import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { RegistersContext } from '~/context/RegistersContext'
import { useHistory } from 'react-router-dom'
import routes from '~/router/routes'
import { SearchBar } from '~/components/Searchbar'
import { act } from 'react'

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useHistory: jest.fn(() => ({
      push: jest.fn(),
    })),
  };
})

const mockFetchAll = jest.fn()
const mockFetchByCpf = jest.fn()
const mockHistoryPush = jest.fn()

beforeEach(() => {
  jest.clearAllMocks(),
  (useHistory as jest.Mock).mockReturnValue({
    push: mockHistoryPush
  })
  jest.useFakeTimers()
})

afterEach(() => {
  jest.clearAllMocks()
  jest.useRealTimers()
})

const renderComponent = (isLoading = false) => {
  return render(
    <RegistersContext.Provider
      value={{
        fetchByCpfStatus: { isLoading, success: false, error: false },
        registrations: [],
        isUpdatingCard: "",
        addNewRegisterStatus: { isLoading: false, success: false, error: false },
        fetchAllStatus: { isLoading: false, success: false, error: false },
        fetchRegistrationsByCpf: mockFetchByCpf,
        fetchAllRegistrations: mockFetchAll,
        resetStatus: jest.fn(),
        updateCardStatus: jest.fn(),
        deleteCard: jest.fn(),
        addNewRegister: jest.fn(),
      }}
    >
      <SearchBar />
    </RegistersContext.Provider>
  )
}

describe('SearchBar Component', () => {
  it('should render the search bar and buttons', () => {
    renderComponent()
    expect(screen.getByPlaceholderText('Digite um CPF válido')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Nova Admissão' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Recarregar/i })).toBeInTheDocument()
  })

  it('should call fetchRegistrationsByCpf with debounced input', async () => {
    renderComponent()
    const input = screen.getByPlaceholderText('Digite um CPF válido') as HTMLInputElement
    act(() => {
      fireEvent.change(input, { target: { value: '871.078.420-99' } })
    })
    act(() => {
      jest.advanceTimersByTime(600)
    })
    expect(input.value).toBe('871.078.420-99')
    await waitFor(() => {
      expect(mockFetchByCpf).toHaveBeenCalledWith('87107842099')
    })
  })

  it('should call fetchAllRegistrations when input is cleared', () => {
    renderComponent()
    const input = screen.getByPlaceholderText('Digite um CPF válido')
    fireEvent.change(input, { target: { value: '12345678900' } })
    fireEvent.change(input, { target: { value: '' } })
    jest.advanceTimersByTime(500)
    expect(mockFetchAll).toHaveBeenCalledTimes(1)
  })

  it('should show error message for invalid CPF', () => {
    renderComponent()
    const input = screen.getByPlaceholderText('Digite um CPF válido')
    fireEvent.change(input, { target: { value: '123' } })
    expect(screen.getByText('CPF inválido')).toBeInTheDocument()
  })

  it('should call fetchAllRegistrations when refresh button is clicked', () => {
    renderComponent()
    const refreshButton = screen.getByRole('button', { name: /Recarregar/i })
    fireEvent.click(refreshButton)
    expect(mockFetchAll).toHaveBeenCalledTimes(1)
  })

  it('should disable input when fetchByCpfStatus is loading', () => {
    renderComponent(true)
    const input = screen.getByPlaceholderText('Digite um CPF válido')
    expect(input).toBeDisabled()
  })

  it('should enable input when fetchByCpfStatus is not loading', () => {
    renderComponent(false)
    const input = screen.getByPlaceholderText('Digite um CPF válido')
    expect(input).toBeEnabled()
  })

  it('should navigate to new admission page when button is clicked', () => {
    renderComponent()
    const button = screen.getByRole('button', { name: 'Nova Admissão' })
    fireEvent.click(button)
    expect(mockHistoryPush).toHaveBeenCalledWith(routes.newUser)
  })
})