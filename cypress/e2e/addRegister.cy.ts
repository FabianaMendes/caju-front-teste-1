describe('Add register', () => {
  before(() => {
    cy.mountServices()
  })
  /** Adicionado apenas cenário de sucesso, mas podemos testar se os erros aparecem corretamente */
  it('add new register successfully', () => {
    cy.visit('/#/dashboard')
    cy.wait('@getRegistrations')
    cy.get('button').contains('Nova Admissão').click()
    cy.wait(200)
    cy.get('#employeeName').type('Teste Cypress')
    cy.get('#email').type('teste@gmail.com')
    cy.get('#cpf').type('761.737.090-31')
    cy.get('#admissionDate').type('2025-03-14')
    cy.get('button').contains('Cadastrar').click()
    cy.wait('@addRegister')
    cy.wait('@getRegistrations')
    cy.wait(500)
  })
})
