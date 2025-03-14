import { Admission, Status } from "~/types/Admission";

export const fakeAdmission: Admission = {
  id: "1",
  employeeName: "John Doe",
  cpf: "22189044030",
  email: "john@example.com",
  admissionDate: "05/02/2025",
  status: Status.REVIEW
}