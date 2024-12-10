import nasdaqConstituentsStub from "../fixtures/nasdaqConstituents"
import { cy } from 'cypress';

const allSymbols = ["AAPL", "ABNB", "ADBE", "ADI", "ADP"];

describe('Stocksview spec', () => {
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
  
   cy.visit('localhost:3000/stocksView')
   cy.wait('@getNasdaqConstituents')
   const symbolWaitArray = allSymbols.map(symbol => `@get${symbol}`)
   cy.wait(symbolWaitArray);
  })

  it('should be able to search a stock name with substring', () => {
    cy.get('.searchbar').type('inc')
    cy.get('.stock-card').should('have.length', 2)
    cy.get('.stock-card').eq(0).find('.stock-info').eq(1).find('p').contains('Inc')
    cy.get('.stock-card').eq(1).find('.stock-info').eq(1).find('p').contains('Inc')
    cy.get('.cross-icon').click()
    cy.get('.stock-card').should('have.length', 5)
  })

  it('should be able to search a stock name with capital substring', () => {
    cy.get('.searchbar').type('INC')
    cy.get('.stock-card').should('have.length', 2)
    cy.get('.stock-card').eq(0).find('.stock-info').eq(1).find('p').contains('Inc')
    cy.get('.stock-card').eq(1).find('.stock-info').eq(1).find('p').contains('Inc')
    cy.get('.cross-icon').click()
    cy.get('.stock-card').should('have.length', 5)
  })

  it('should be able to search a stock name with mixed substring', () => {
    cy.get('.searchbar').type('iNc')
    cy.get('.stock-card').should('have.length', 2)
    cy.get('.stock-card').eq(0).find('.stock-info').eq(1).find('p').contains('Inc')
    cy.get('.stock-card').eq(1).find('.stock-info').eq(1).find('p').contains('Inc')
    cy.get('.cross-icon').click()
    cy.get('.stock-card').should('have.length', 5)
  })

  it('should be able to search a stock symbol as well', () => {
    cy.get('.searchbar').type('aa')
    cy.get('.stock-card').should('have.length', 1)
    cy.get('.stock-card').find('.stock-info').eq(1).find('h3').contains('AAPL')
    cy.get('.cross-icon').click()
    cy.get('.stock-card').should('have.length', 5)
  })

  it('should show error message if no results found', () => {
    cy.get('.searchbar').type('abcde')
    cy.get('h2').contains('No Nasdaq stocks match your search');
  })
})
  