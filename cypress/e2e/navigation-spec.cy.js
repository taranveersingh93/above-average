import nasdaqConstituentsStub from "../fixtures/nasdaqConstituents"

const allSymbols = ["AAPL", "ABNB", "ADBE", "ADI", "ADP"];
let symbolWaitArray

describe('Navigation tests', () => {
  beforeEach(() => {
    cy.intercept('GET', `https://financialmodelingprep.com/api/v3/historical-price-full/%5ENDX?apikey=${Cypress.env(`REACT_APP_API_KEY`)}`, {
      statusCode: 200,
      fixture: 'nasdaqResponse'
    }).as('getNasdaqData')

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
  
   cy.visit('localhost:3000')
   cy.wait('@getNasdaqData')
   symbolWaitArray = allSymbols.map(symbol => `@get${symbol}`)
  })

  it('should be able to navigate between homepage and stocksview', () => {
    cy.get('.navlinks').find('.active').contains('Home')
    cy.url().should('eq', 'http://localhost:3000/')
    cy.get('.index-container').click();
    cy.wait('@getNasdaqConstituents');
    cy.wait(symbolWaitArray);
    cy.get('.navlinks').find('.active').contains('Nasdaq Constituents')
    cy.url().should('eq', 'http://localhost:3000/stocksView')
    cy.go(-1).url().should('eq', 'http://localhost:3000/')
    cy.go(1).url().should('eq', 'http://localhost:3000/stocksView')
    cy.go(-1);
    cy.get('.navlinks').find('a').eq(1).click()
    cy.go(1).url().should('eq', 'http://localhost:3000/stocksView')
  })

  it('should be able to navigate between stocksview and watchlist', () => {
    cy.get('.navlinks').find('.active').contains('Home')
    cy.url().should('eq', 'http://localhost:3000/')
    cy.get('.navlinks').find('a').eq(1).click()
    cy.url().should('eq', 'http://localhost:3000/stocksView')
    cy.get('.navlinks').find('a').eq(2).click()
    cy.get('.navlinks').find('.active').contains('Watchlist')
    cy.url().should('eq', 'http://localhost:3000/watchlist')
    cy.go(-1).url().should('eq', 'http://localhost:3000/stocksView')
    cy.go(1).url().should('eq', 'http://localhost:3000/watchlist')
  })

  it('should be able to go to a chart from stocksView', () => {
    cy.visit('localhost:3000/stocksView');
    cy.get('.stock-card').eq(1).find('.chart-btn').click();
    cy.url().should('eq', 'http://localhost:3000/chart/ADBE');
    cy.go(-1).url().should('eq', 'http://localhost:3000/stocksView');
    cy.go(1).url().should('eq', 'http://localhost:3000/chart/ADBE')
  })
})