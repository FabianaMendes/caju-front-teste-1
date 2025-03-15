import { rest } from "msw";
import {
  getRegistrations,
  createAdmission,
  searchRegisterByCpf,
  updateCard,
  deleteRegister,
} from "../../services/api";
import { Admission, Status } from "~/types/Admission";
import { baseUrl, server } from "../mocks/server";
import { fakeAdmission } from "../mocks/fakeEntities";

jest.mock("../../services/api", () => require("../mocks/api"))

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const newAdmission: Admission = {
  employeeName: "Maria",
  cpf: "12345678900",
  email: "maria@email.com",
  admissionDate: "13/03/2025",
  status: Status.REVIEW
};

beforeEach(() => {
  jest.clearAllMocks();

  (getRegistrations as jest.Mock).mockResolvedValue([fakeAdmission]);
  (createAdmission as jest.Mock).mockResolvedValue({ message: "Created" });
  (searchRegisterByCpf as jest.Mock).mockResolvedValue([fakeAdmission]);
  (updateCard as jest.Mock).mockResolvedValue({ message: "Updated" });
  (deleteRegister as jest.Mock)
    .mockResolvedValue({ message: "Deleted" });
});

describe("API Tests", () => {
  test("getRegistrations deve retornar uma lista de registros", async () => {
    const data = await getRegistrations();
    expect(data).toEqual([fakeAdmission]);
  });

  test("getRegistrations deve lançar erro quando a API falha", async () => {
    (getRegistrations as jest.Mock).mockRejectedValue(new Error("Falha ao buscar registros"));
    server.use(
      rest.get(`${baseUrl}/registrations`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    try {
      await getRegistrations();
    } catch (error: any) {
      await expect(getRegistrations()).rejects.toThrow("Falha ao buscar registros");
    }
  });

  test("createAdmission deve criar um novo registro", async () => {
    const response = await createAdmission(newAdmission);
    expect(response.message).toEqual("Created");
  });

  test("createAdmission deve lançar erro quando a API falha", async () => {
    server.use(
      rest.post(`${baseUrl}/registrations`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    try {
      await createAdmission(newAdmission);
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Falha ao incluir admissão");
    }
  });

  test("searchRegisterByCpf deve retornar um registro correspondente ao CPF", async () => {
    const response = await searchRegisterByCpf(fakeAdmission.cpf);
    expect(response).toEqual([fakeAdmission]);
  });

  test("updateCard deve atualizar um registro", async () => {
    const updatedAdmission = { ...newAdmission, status: Status.APPROVED };
    const response = await updateCard(updatedAdmission);
    expect(response.message).toEqual("Updated");
  });

  test("deleteRegister deve remover um registro", async () => {
    const response = await deleteRegister("5");
    expect(response.message).toEqual("Deleted");
  });

  test("deleteRegister deve lançar erro quando a API falha", async () => {
    server.use(
      rest.delete(`${baseUrl}/registrations/:id`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    try {
      await deleteRegister("5");
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Falha ao deletar card");
    }
  });
});
