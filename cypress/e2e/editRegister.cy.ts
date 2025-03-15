describe('Edit admission', () => {
  before(() => {
    cy.mountServices()
  })
  /** Para que o teste passe é necessário que haja
   * ao menos um card na coluna 'Pronto para revisar'
   */
  it('aprove, reprove and review cards correctly', () => {
    cy.visit('/#/dashboard')
    cy.wait('@getRegistrations')

    cy.get('#column-REVIEW')
      .find('.card')
      .first()
      .invoke('attr', 'id')
      .then((cardId) => {
        cy.wrap(cardId).as('selectedCard')
    
        cy.get(`.card#${cardId}`)
          .find('button')
          .contains('Aprovar')
          .click()
        cy.wait(200)
        cy.get('button').contains('Confirmar').click()
        cy.wait('@editStatus')
        cy.wait('@getRegistrations')
        cy.wait(200)
    
        cy.get(`.card#${cardId}`)
          .find('button')
          .contains('Revisar novamente')
          .click()
        cy.wait(200)
        cy.get('button').contains('Confirmar').click()
        cy.wait('@editStatus')
        cy.wait('@getRegistrations')
    
        cy.get(`.card#${cardId}`)
          .find('button')
          .contains('Reprovar')
          .click()
        cy.wait(200)
        cy.get('button').contains('Confirmar').click()
        cy.wait('@editStatus')
        cy.wait('@getRegistrations')
        
        cy.get(`.card#${cardId}`)
          .find('button')
          .contains('Revisar novamente')
          .click()
        cy.wait(200)
        cy.get('button').contains('Confirmar').click()
        cy.wait('@editStatus')
        cy.wait('@getRegistrations')
      })
  })
})
