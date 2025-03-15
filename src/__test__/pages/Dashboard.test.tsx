import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';
import { useHistory } from 'react-router-dom';
import { RegistersContext } from '~/context/RegistersContext';
import DashboardPage from '~/pages/Dashboard';
import routes from '~/router/routes';
import { Status } from '~/types/Admission';
import { initialRequestStatus } from '~/types/Requests';

jest.mock("../../services/api", () => require("../mocks/api"))

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom')
  return {
    ...actual,
    useHistory: jest.fn(() => ({
      push: jest.fn(),
    })),
  };
})

const mockFetchAllRegistrations = jest.fn()
const mockUpdateCardStatus = jest.fn()
const mockDeleteCard = jest.fn()
const mockHistoryPush = jest.fn()

beforeEach(() => {
  jest.clearAllMocks();
  (useHistory as jest.Mock).mockReturnValue({
    push: mockHistoryPush
  });
})

const renderComponent = (contextOverrides = {}) => {
  return render(
    <RegistersContext.Provider
      value={{
        registrations: [
          {
            id: "1",
            employeeName: "John Doe",
            email: "john@example.com",
            admissionDate: "2023-05-15",
            status: Status.REVIEW,
            cpf: '12345678910'
          },
        ],
        fetchAllStatus: { isLoading: false, success: true, error: false },
        fetchByCpfStatus: initialRequestStatus,
        isUpdatingCard: "",
        addNewRegisterStatus: initialRequestStatus,
        fetchAllRegistrations: mockFetchAllRegistrations,
        updateCardStatus: mockUpdateCardStatus,
        deleteCard: mockDeleteCard,
        addNewRegister: jest.fn(),
        fetchRegistrationsByCpf: jest.fn(),
        resetStatus: jest.fn(),
        ...contextOverrides
      }}
    >
      <DashboardPage />
    </RegistersContext.Provider>
  )
}

describe('DashboardPage', () => {
  it('should render the search bar and columns', () => {
    renderComponent()
    expect(screen.getByPlaceholderText('Digite um CPF válido')).toBeInTheDocument()
    expect(screen.getByText('Pronto para revisar')).toBeInTheDocument()
    expect(screen.getByText('Aprovado')).toBeInTheDocument()
    expect(screen.getByText('Reprovado')).toBeInTheDocument()
  })

  it('should call fetchAllRegistrations on mount', () => {
    renderComponent()
    expect(mockFetchAllRegistrations).toHaveBeenCalledTimes(1)
  })

  it('should show loader when fetching data', () => {
    renderComponent({ fetchAllStatus: { isLoading: true, success: false, error: false } })
    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  it('should open modal when approving a candidate', async () => {
    renderComponent()
    const approveButton = screen.getByRole('button', { name: /aprovar/i })
    fireEvent.click(approveButton)
    expect(screen.getByText(/tem certeza que deseja aprovar/i)).toBeInTheDocument()
  })

  it('should call updateCardStatus when approving a candidate', async () => {
    renderComponent()
    const approveButton = screen.getByRole('button', { name: /aprovar/i })
    fireEvent.click(approveButton)
    const confirmButton = screen.getByRole('button', { name: /confirmar/i })
    fireEvent.click(confirmButton)
    expect(mockUpdateCardStatus).toHaveBeenCalledWith(expect.objectContaining({ status: 'APPROVED' }))
  })

  it('should not call updateCardStatus when canceling modal', async () => {
    renderComponent()
    const approveButton = screen.getByRole('button', { name: /aprovar/i })
    fireEvent.click(approveButton)
    const confirmButton = screen.getByRole('button', { name: /cancelar/i })
    fireEvent.click(confirmButton)
    expect(mockUpdateCardStatus).not.toHaveBeenCalled()
  })

  it("should close modal when pressing Escape", async () => {
    renderComponent()
    fireEvent.click(screen.getByRole("button", { name: /aprovar/i }))
    expect(screen.getByText(/Tem certeza que deseja APROVAR o candidato John Doe/i)).toBeInTheDocument()
    await act(async () => {
      fireEvent.keyDown(document, { key: "Escape" })
    })
    expect(screen.queryByText(/Tem certeza que deseja APROVAR o candidato John Doe/i)).not.toBeInTheDocument()
  })

  it('should call deleteCard when deleting a candidate', async () => {
    renderComponent()
    const deleteButton = screen.getByTestId('delete-button')
    fireEvent.click(deleteButton)
    const confirmButton = screen.getByRole('button', { name: /confirmar/i })
    fireEvent.click(confirmButton)
    expect(mockDeleteCard).toHaveBeenCalledWith('1')
  })

  it("should navigate to new admission page when clicking Nova Admissão", () => {
    renderComponent()
    fireEvent.click(screen.getByRole("button", { name: "Nova Admissão" }))
    expect(mockHistoryPush).toHaveBeenCalledWith(routes.newUser)
  })
})
