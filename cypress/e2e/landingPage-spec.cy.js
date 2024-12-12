/* eslint-disable no-undef */
import nasdaqConstituentsStub from "../fixtures/nasdaqConstituents"

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
  
   cy.visit('localhost:3000/')
   cy.wait('@getNasdaqConstituents')
   const symbolWaitArray = allSymbols.map(symbol => `@get${symbol}`)
   cy.wait(symbolWaitArray);
  })

  it('should show 5 stock cards', () => {
    cy.get('.stock-card').should('have.length', 5)
  })

  it('should show searchbar', () => {
    cy.get('input.form-control')
  })

  it('should show sorting dropdown', () => {
    cy.get('#sortDropdown')
        .children('option')
        .should('have.length', 6)
  })

  it('should show the right options in dropdown', () => {
    cy.get('#sortDropdown')
    .children('option')
    .eq(0)
    .should('contain.text', 'Name')
    .should('have.value', 'name');
    
    cy.get('#sortDropdown')
        .children('option')
        .eq(1)
        .should('contain.text', 'Symbol')
        .should('have.value', 'symbol');
        
    cy.get('#sortDropdown')
        .children('option')
        .eq(2)
        .should('contain.text', 'Daily Change')
        .should('have.value', 'dailyChange');
        
    cy.get('#sortDropdown')
        .children('option')
        .eq(3)
        .should('contain.text', 'Rating')
        .should('have.value', 'rating');
        
    cy.get('#sortDropdown')
        .children('option')
        .eq(4)
        .should('contain.text', 'Current Momentum')
        .should('have.value', 'priceAvgDiff');
        
    cy.get('#sortDropdown')
        .children('option')
        .eq(5)
        .should('contain.text', 'Long Term Momentum')
        .should('have.value', 'longTermMomentum');
  })
})

describe('Error handling', () => {
  it('should return an error if constituents fail', () => {
    cy.intercept('GET', `https://above-average-api-production.up.railway.app/nasdaqConstituents`, {
     statusCode: 404,
   }).as('getNasdaqConstituents')
  
   allSymbols.forEach(symbol => {
     cy.intercept('GET', `https://above-average-api-production.up.railway.app/${symbol}`, {
       statusCode: 200,
       fixture: `stub${symbol}`
     }).as(`get${symbol}`)
   })

   cy.visit('localhost:3000/stocksView')
   cy.wait('@getNasdaqConstituents')
   cy.get('h2').contains('Something went wrong')
  })

  it('should return an error if an individual stock fetch fails', () => {
    cy.intercept('GET', `https://above-average-api-production.up.railway.app/nasdaqConstituents`, {
      statusCode: 200,
      body: nasdaqConstituentsStub
    }).as('getNasdaqConstituents')
  
    allSymbols.forEach(symbol => {
      cy.intercept('GET', `https://above-average-api-production.up.railway.app/${symbol}`, {
        statusCode: 404,
      }).as(`get${symbol}`)
    })
    
    cy.visit('localhost:3000/')
    const symbolWaitArray = allSymbols.map(symbol => `@get${symbol}`)
    cy.wait('@getNasdaqConstituents')
    cy.wait(symbolWaitArray);
    cy.get('h2').contains('Something went wrong')
  })




  })
