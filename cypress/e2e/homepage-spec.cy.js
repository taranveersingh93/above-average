describe('Landing page elements', () => {

  it('shows the right elements', () => {
    cy.intercept('GET', `https://financialmodelingprep.com/api/v3/historical-price-full/%5ENDX?apikey=${Cypress.env(`REACT_APP_API_KEY`)}`, {
      statusCode: 200,
      fixture: 'nasdaqResponse'
    }).as('getNasdaqData')
    cy.visit('localhost:3000')
    cy.wait('@getNasdaqData')
    cy.get('.intro-text-container').contains('Now you can easily track')
    cy.get('.index-container').children().should('have.length', 5);
    cy.get('.index-container').find('p').eq(0).contains('(Click to view Nasdaq constituents)');
    cy.get('.index-container').find('p').eq(1).contains('Last close: 15457.81');
    cy.get('.index-container').find('p').eq(2).contains('Moving average: 13335.12');
    cy.get('.index-container').find('p').eq(3).contains('NDX 100 is above its moving average');;
    cy.get('.index-container').find('h2').contains('NDX 100');
    cy.get('.navlinks').find('.active').contains('Home');
  })

  it('shows the right error handling for 400', () => {
    cy.intercept('GET', `https://financialmodelingprep.com/api/v3/historical-price-full/%5ENDX?apikey=${Cypress.env(`REACT_APP_API_KEY`)}`, {
      statusCode: 400
    }).as('stub400');
    cy.visit('localhost:3000')
    cy.wait('@stub400')
    cy.get('h2').contains('Something went wrong')
  })

  it('shows the right error handling for 500', () => {
    cy.intercept('GET', `https://financialmodelingprep.com/api/v3/historical-price-full/%5ENDX?apikey=${Cypress.env(`REACT_APP_API_KEY`)}`, {
      statusCode: 500
    }).as('stub500');
    cy.visit('localhost:3000')
    cy.wait('@stub500')
    cy.get('h2').contains('Something went wrong')
  })

  it('shows the right error handling for 429', () => {
    cy.intercept('GET', `https://financialmodelingprep.com/api/v3/historical-price-full/%5ENDX?apikey=${Cypress.env(`REACT_APP_API_KEY`)}`, {
      statusCode: 429
    }).as('stub429');
    cy.visit('localhost:3000')
    cy.wait('@stub429')
    cy.get('h2').contains('The founder is waiting for funding')
  })
})