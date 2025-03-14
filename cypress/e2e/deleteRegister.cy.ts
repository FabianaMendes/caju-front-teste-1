describe('Delete register', () => {
  before(() => {
    cy.mountServices()
  })
  it('delete register successfully', () => {
    cy.visit('/#/dashboard')
    cy.wait('@getRegistrations')
    cy.contains('.card', 'Teste Cypress')
      .find('#delete')
      .click()
    cy.get('button').contains('Confirmar').click()
    cy.wait('@deleteRegister')
  })
})
