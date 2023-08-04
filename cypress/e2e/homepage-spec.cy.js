describe('template spec', () => {
  beforeEach(() => {
    cy.intercept('GET', `https://financialmodelingprep.com/api/v3/historical-price-full/%5ENDX?apikey=${Cypress.env(`REACT_APP_API_KEY`)}`, {
      statusCode: 200,
      fixture: 'nasdaqResponse'
    }).as('getNasdaqData')
    cy.visit('localhost:3000')
    cy.wait('@getNasdaqData')

  })
  it('passes', () => {
  })
})