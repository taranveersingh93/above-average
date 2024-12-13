/* eslint-disable no-undef */
import nasdaqConstituentsStub from "../fixtures/nasdaqConstituents"

const allSymbols = ["AAPL", "ABNB", "ADBE", "ADI", "ADP"];

describe('Search functionality tests', () => {
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
  
   cy.visit('localhost:3000/')
   cy.wait('@getNasdaqConstituents')
   const symbolWaitArray = allSymbols.map(symbol => `@get${symbol}`)
   cy.wait(symbolWaitArray);
  })

  it('should be able to search a stock name with substring', () => {
    cy.get('input.form-control').type('inc')
    cy.get('.stock-card').should('have.length', 2)
    cy.get('.stock-card').eq(0).find('h5').contains('Inc')
    cy.get('.stock-card').eq(1).find('h5').contains('Inc')
    cy.get('input.form-control').clear()
    cy.get('.stock-card').should('have.length', 5)
  })

  it('should be able to search a stock name with capital substring', () => {
    cy.get('input.form-control').type('INC')
    cy.get('.stock-card').should('have.length', 2)
    cy.get('.stock-card').eq(0).find('h5').contains('Inc')
    cy.get('.stock-card').eq(1).find('h5').contains('Inc')
    cy.get('input.form-control').clear()
    cy.get('.stock-card').should('have.length', 5)
  })

  it('should be able to search a stock name with mixed substring', () => {
    cy.get('input.form-control').type('iNc')
    cy.get('.stock-card').should('have.length', 2)
    cy.get('.stock-card').eq(0).find('h5').contains('Inc')
    cy.get('.stock-card').eq(1).find('h5').contains('Inc')
    cy.get('input.form-control').clear()
    cy.get('.stock-card').should('have.length', 5)
  })

  it('should be able to search a stock symbol in lowercase', () => {
    cy.get('input.form-control').type('aap')
    cy.get('.stock-card').should('have.length', 1)
    cy.get('.stock-card').find('.symbol-tag').find('.symbol-text').contains('AAPL')
    cy.get('input.form-control').clear()
    cy.get('.stock-card').should('have.length', 5)
  })

  it('should be able to search a stock symbol in uppercase', () => {
    cy.get('input.form-control').type('AAP')
    cy.get('.stock-card').should('have.length', 1)
    cy.get('.stock-card').find('.symbol-tag').find('.symbol-text').contains('AAPL')
    cy.get('input.form-control').clear()
    cy.get('.stock-card').should('have.length', 5)
  })

  it('should be able to search a stock symbol in mixedcase', () => {
    cy.get('input.form-control').type('aAp')
    cy.get('.stock-card').should('have.length', 1)
    cy.get('.stock-card').find('.symbol-tag').find('.symbol-text').contains('AAPL')
    cy.get('input.form-control').clear()
    cy.get('.stock-card').should('have.length', 5)
  })

  it('should show error message if no results found', () => {
    cy.get('input.form-control').type('abcde')
    cy.get('h2').contains('No Nasdaq stocks match your search');
    cy.get('input.form-control').clear()
    cy.get('.stock-card').should('have.length', 5)
  })
})
  