/* eslint-disable no-undef */
import nasdaqConstituentsStub from "../fixtures/nasdaqConstituents"

const allSymbols = ["AAPL", "ABNB", "ADBE", "ADI", "ADP"];
let symbolWaitArray

describe('Navigation tests', () => {
  beforeEach(() => {
    cy.intercept('GET', `https://above-average-api-production.up.railway.app/nasdaqConstituents`, {
      statusCode: 200,
      body: nasdaqConstituentsStub
    }).as('getNasdaqConstituents')
  
    allSymbols.forEach(symbol => {
      cy.intercept('GET', `https://above-average-api-production.up.railway.app/${symbol}`, {
        statusCode: 200,
        fixture: `stub${symbol}`
      }).as(`get${symbol}`)
    })
  
   cy.visit('localhost:3000')
   cy.wait('@getNasdaqConstituents')
   symbolWaitArray = allSymbols.map(symbol => `@get${symbol}`)
  })

  it('should be able to navigate between stocksview and watchlist', () => {
    cy.get('.navlinks').find('.active').contains('Home')
    cy.url().should('eq', 'http://localhost:3000/')
    cy.get('.navlinks').find('a').eq(1).click()
    cy.get('.navlinks').find('.active').contains('Watchlist')
    cy.url().should('eq', 'http://localhost:3000/watchlist')
    cy.go(-1).url().should('eq', 'http://localhost:3000/')
    cy.go(1).url().should('eq', 'http://localhost:3000/watchlist')
  })

  it('should be able to go to a chart from stocksView', () => {
    cy.visit('localhost:3000/');
    cy.get('.stock-card').eq(1).find('a').click();
    cy.url().should('eq', 'http://localhost:3000/chart/ADBE');
    cy.go(-1).url().should('eq', 'http://localhost:3000/');
    cy.go(1).url().should('eq', 'http://localhost:3000/chart/ADBE')
  })
})