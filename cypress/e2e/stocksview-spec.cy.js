import nasdaqConstituentsStub from "../fixtures/nasdaqConstituents"
const allSymbols = ["AAPL", "ABNB", "ADBE", "ADI", "ADP"];

describe('Stocksview spec', () => {
  it('shows the right elements', () => {
    // cy.intercept('GET', `https://financialmodelingprep.com/api/v3/historical-price-full/%5ENDX?apikey=${Cypress.env(`REACT_APP_API_KEY`)}`, {
    //   statusCode: 200,
    //   fixture: 'nasdaqResponse'
    // }).as('getNasdaqData')

    cy.intercept('GET', `https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${Cypress.env(`REACT_APP_API_KEY`)}`, {
      statusCode: 200,
      body: nasdaqConstituentsStub
    }).as('getNasdaqConstituents')

    allSymbols.forEach(symbol => {
      cy.intercept('GET', `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?timeseries=151&apikey=${Cypress.env(`REACT_APP_API_KEY`)}`, {
        statusCode: 200,
        fixture: `stub${symbol}`
      }).as(`get${symbol}`)
    })

    cy.visit('localhost:3000/stocksView')
    cy.wait('@getNasdaqConstituents')
    const symbolWaitArray = allSymbols.map(symbol => `@get${symbol}`)
    cy.wait(symbolWaitArray);

  })
})