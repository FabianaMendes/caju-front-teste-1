import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useHistory } from "react-router-dom";
import { RegistersContext } from "~/context/RegistersContext";
import NewUserPage from "~/pages/NewUser";
import routes from "~/router/routes";
import { Status } from "~/types/Admission";
import { initialRequestStatus } from "~/types/Requests";

type MockRegisterContext = {
  addNewRegister: jest.Mock;
  addNewRegisterStatus: typeof initialRequestStatus;
  resetStatus: jest.Mock;
}

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useHistory: jest.fn(() => ({ push: jest.fn() })),
  };
})

const mockAddNewRegister = jest.fn()
const mockResetStatus = jest.fn()
const mockHistoryPush = jest.fn()

beforeEach(() => {
  jest.clearAllMocks();
  (useHistory as jest.Mock).mockReturnValue({ push: mockHistoryPush });
})

const renderComponent = (contextOverrides: Partial<MockRegisterContext> = {}) => {
  return render(
    <RegistersContext.Provider
      value={{
        registrations: [],
        addNewRegister: mockAddNewRegister,
        addNewRegisterStatus: initialRequestStatus,
        resetStatus: mockResetStatus,
        fetchAllStatus: { isLoading: false, success: true, error: false },
        fetchByCpfStatus: initialRequestStatus,
        isUpdatingCard: "",
        fetchAllRegistrations: jest.fn(),
        updateCardStatus: jest.fn(),
        deleteCard: jest.fn(),
        fetchRegistrationsByCpf: jest.fn(),
        ...contextOverrides,
      }}
    >
      <NewUserPage />
    </RegistersContext.Provider>
  )
}

describe("NewUserPage", () => {
  it("should render form fields correctly", () => {
    renderComponent()
    expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/CPF/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Data de admissão/i)).toBeInTheDocument()
  })

  it("should show validation errors when submitting empty form", async () => {
    renderComponent()
    fireEvent.click(screen.getByRole("button", { name: /cadastrar/i }))
    
    expect(await screen.findByText("Nome obrigatório")).toBeInTheDocument()
    expect(await screen.findByText("E-mail obrigatório")).toBeInTheDocument()
    expect(await screen.findByText("CPF obrigatório")).toBeInTheDocument()
    expect(await screen.findByText("Data obrigatório")).toBeInTheDocument()
  })

  it("should apply CPF mask correctly", () => {
    renderComponent()
    const cpfInput = screen.getByLabelText("CPF")
    fireEvent.change(cpfInput, { target: { value: "12345678910" } })
    expect(cpfInput).toHaveValue("123.456.789-10")
  })

  it("should not submit values when there are validation errors", async () => {
    renderComponent()
    fireEvent.change(screen.getByLabelText("Nome"), { target: { value: "J" } })
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "invalid-email" } })
    fireEvent.change(screen.getByLabelText("CPF"), { target: { value: "123" } })
    fireEvent.click(screen.getByRole("button", { name: /cadastrar/i }))
    expect(mockAddNewRegister).not.toHaveBeenCalled()
  })

  it("should call addNewRegister when submitting valid data", async () => {
    renderComponent()
    fireEvent.change(screen.getByLabelText("Nome"), { target: { value: "John Doe" } })
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "john@example.com" } })
    fireEvent.change(screen.getByLabelText("CPF"), { target: { value: "871.078.420-99" } })
    fireEvent.change(screen.getByLabelText("Data de admissão"), { target: { value: "2023-05-15" } })
    
    fireEvent.click(screen.getByRole("button", { name: /cadastrar/i }))
    
    await waitFor(() => expect(mockAddNewRegister).toHaveBeenCalledWith({
      employeeName: "John Doe",
      email: "john@example.com",
      cpf: "87107842099",
      admissionDate: "15/05/2023",
      status: Status.REVIEW,
    }))
  })

  it("should navigate to home page when registration is successful", async () => {
    renderComponent({ addNewRegisterStatus: { isLoading: false, success: true, error: false } })
    await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith(routes.dashboard))
  })
})
