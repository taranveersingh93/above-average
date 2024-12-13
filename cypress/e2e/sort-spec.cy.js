/* eslint-disable no-undef */
import nasdaqConstituentsStub from "../fixtures/nasdaqConstituents"

const allSymbols = ["AAPL", "ABNB", "ADBE", "ADI", "ADP"];

describe('Sorting tests', () => {
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
  
    it('should be sorted by long term momentum by default', () => {
        cy.get('#sortDropdown')
        .should('have.value', 'longTermMomentum')
    })

    it('should be able to sort stocks by name', () => {
        cy.get('#sortDropdown')
        .select(0)

        cy.get('.stock-card')
        .eq(0)
        .find('h5')
        .should('contain.text','Adobe Inc')

        cy.get('.stock-card')
        .eq(1)
        .find('h5')
        .should('contain.text','ADP')

        cy.get('.stock-card')
        .eq(2)
        .find('h5')
        .should('contain.text','Airbnb')

        cy.get('.stock-card')
        .eq(3)
        .find('h5')
        .should('contain.text','Analog Devices')

        cy.get('.stock-card')
        .eq(4)
        .find('h5')
        .should('contain.text','Apple Inc')
    })

    it('should be able to sort stocks by symbol', () => {
        cy.get('#sortDropdown')
        .select(1)

        cy.get('.stock-card')
        .eq(0)
        .find('h5')
        .should('contain.text','Apple Inc')

        cy.get('.stock-card')
        .eq(1)
        .find('h5')
        .should('contain.text','Airbnb')

        cy.get('.stock-card')
        .eq(2)
        .find('h5')
        .should('contain.text','Adobe Inc')

        cy.get('.stock-card')
        .eq(3)
        .find('h5')
        .should('contain.text','Analog Devices')

        cy.get('.stock-card')
        .eq(4)
        .find('h5')
        .should('contain.text','ADP')
    })

    it('should be able to sort stocks by daily change', () => {
        cy.get('#sortDropdown')
        .select(2)

        cy.get('.stock-card')
        .eq(0)
        .find('h5')
        .should('contain.text','Adobe Inc')

        cy.get('.stock-card')
        .eq(1)
        .find('h5')
        .should('contain.text','Airbnb')

        cy.get('.stock-card')
        .eq(2)
        .find('h5')
        .should('contain.text','Analog Devices')

        cy.get('.stock-card')
        .eq(3)
        .find('h5')
        .should('contain.text','ADP')

        cy.get('.stock-card')
        .eq(4)
        .find('h5')
        .should('contain.text','Apple Inc')
    })

    it('should be able to sort stocks by rating', () => {
        cy.get('#sortDropdown')
        .select(3)

        cy.get('.stock-card')
        .eq(0)
        .find('h5')
        .should('contain.text','Airbnb')

        cy.get('.stock-card')
        .eq(1)
        .find('h5')
        .should('contain.text','Adobe Inc')

        cy.get('.stock-card')
        .eq(2)
        .find('h5')
        .should('contain.text','Apple Inc')

        cy.get('.stock-card')
        .eq(3)
        .find('h5')
        .should('contain.text','Analog Devices')

        cy.get('.stock-card')
        .eq(4)
        .find('h5')
        .should('contain.text','ADP')
    })

    it('should be able to sort stocks by long term momentum', () => {
        cy.get('#sortDropdown')
        .select(4)

        cy.get('.stock-card')
        .eq(0)
        .find('h5')
        .should('contain.text','Airbnb')

        cy.get('.stock-card')
        .eq(1)
        .find('h5')
        .should('contain.text','Adobe Inc')

        cy.get('.stock-card')
        .eq(2)
        .find('h5')
        .should('contain.text','Apple Inc')

        cy.get('.stock-card')
        .eq(3)
        .find('h5')
        .should('contain.text','Analog Devices')

        cy.get('.stock-card')
        .eq(4)
        .find('h5')
        .should('contain.text','ADP')
    })

    it('should be able to sort stocks by current momentum', () => {
        cy.get('#sortDropdown')
        .select(4)

        cy.get('.stock-card')
        .eq(0)
        .find('h5')
        .should('contain.text','Airbnb')

        cy.get('.stock-card')
        .eq(1)
        .find('h5')
        .should('contain.text','Adobe Inc')

        cy.get('.stock-card')
        .eq(2)
        .find('h5')
        .should('contain.text','Apple Inc')

        cy.get('.stock-card')
        .eq(3)
        .find('h5')
        .should('contain.text','Analog Devices')

        cy.get('.stock-card')
        .eq(4)
        .find('h5')
        .should('contain.text','ADP')
    })
  })
  