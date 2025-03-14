import { Admission } from "~/types/Admission";

///
declare global {
  namespace Cypress {
    interface Chainable {
      mountServices(): void;
      addAdmission(admission: Admission): Chainable;
      deleteAdmission(id: string): Chainable;
      updateAdmission(admission: Admission): Chainable;
    }
  }
}