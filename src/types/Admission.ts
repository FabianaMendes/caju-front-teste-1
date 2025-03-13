export enum Status {
  REVIEW = 'REVIEW',
  APPROVED = 'APPROVED',
  REPROVED = 'REPROVED'
}

export type Admission = {
  admissionDate: string;
  email: string;
  employeeName: string;
  status: Status;
  cpf: string;
  id?: string;
}