describe('E2E Testing', () => {
  it('Calculates Profit and Return Percent', () => {
    cy.visit('/')
    cy.get('#result').should('not.be.visible')

    cy.get('#initialAmount').type('30000')
    cy.get('#currency').select('USD')
    cy.get('#monthlyRate').type('5')
    cy.get('#monthlyAmount').type('1000')
    cy.get('#periodMonths').type('12')
    cy.get('#calculate').click()

    cy.get('#result').should('be.visible')
    cy.get('#result').should('contain', 'Initial Investment:')
    cy.get('#result').should('contain', 'Total Contributed:')
    cy.get('#result').should('contain', 'Total Invested:')
    cy.get('#result').should('contain', 'Final Amount:')
    cy.get('#result').should('contain', 'Total Profit:')
    cy.get('#result').should('contain', 'Total Return:')
  })

  it('Validates Inputs not Empty', () => {
    cy.visit('/')
    cy.get('#result').should('not.be.visible')
    cy.get('#calculate').click()
    cy.get('#result').should('be.visible')
    cy.get('#result').should('contain', 'Please enter valid numbers for all fields.')
  })
})
