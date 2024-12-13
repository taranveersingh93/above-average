import nasdaqConstituentsStub from "../fixtures/nasdaqConstituents"

const allSymbols = ["AAPL", "ABNB", "ADBE", "ADI", "ADP"];
/* eslint-disable no-undef */
describe('Watchlist tests', () => {
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
  
    it('should initially have no stocks saved', () => {    
      cy.get('.navlinks').children('a').eq(1).click();
      cy.get('h2').should('contain.text', 'You have no stocks saved')
    });

    it('should be able to save and remove one stock', () => {
        cy.get('.navlinks').children('a').eq(0).click()
        cy.get('.stock-card').eq(0).find('button').should('have.text', 'Save').click()
        cy.get('.stock-card').eq(0).find('button').should('have.text', 'Remove')
        cy.get('.navlinks').children('a').eq(1).click();
        cy.get('h2').should('contain.text', 'Displaying 1 saved stock')
        cy.get('.stock-card').eq(0).find('button').should('have.text', 'Remove').click()
        cy.get('h2').should('contain.text', 'You have no stocks saved')
    })
    
    it('should be able to save and remove three stocks', () => {
        cy.get('.navlinks').children('a').eq(0).click()

        cy.get('.stock-card').eq(0).find('button').should('have.text', 'Save').click();
        cy.get('.stock-card').eq(1).find('button').should('have.text', 'Save').click();
        cy.get('.stock-card').eq(2).find('button').should('have.text', 'Save').click();
        cy.get('.stock-card').eq(0).find('button').should('have.text', 'Remove');
        cy.get('.stock-card').eq(1).find('button').should('have.text', 'Remove');
        cy.get('.stock-card').eq(2).find('button').should('have.text', 'Remove');
    
        cy.get('.navlinks').children('a').eq(1).click()
        cy.get('h2').should('contain.text', 'Displaying 3 saved stocks')
        cy.get('.stock-card').should('have.length', 3);
        cy.get('.stock-card').eq(2).find('button').should('have.text', 'Remove').click()
        cy.get('h2').should('contain.text', 'Displaying 2 saved stocks')
        cy.get('.stock-card').eq(1).find('button').should('have.text', 'Remove').click()
        cy.get('h2').should('contain.text', 'Displaying 1 saved stock')
        cy.get('.stock-card').eq(0).find('button').should('have.text', 'Remove').click()
        cy.get('h2').should('contain.text', 'You have no stocks saved');
    });
    
    it('should be able to save and remove five stocks', () => {
        cy.get('.navlinks').children('a').eq(0).click();
    
        cy.get('.stock-card').eq(0).find('button').should('have.text', 'Save').click();
        cy.get('.stock-card').eq(1).find('button').should('have.text', 'Save').click();
        cy.get('.stock-card').eq(2).find('button').should('have.text', 'Save').click();
        cy.get('.stock-card').eq(3).find('button').should('have.text', 'Save').click();
        cy.get('.stock-card').eq(4).find('button').should('have.text', 'Save').click();
    
        cy.get('.stock-card').eq(0).find('button').should('have.text', 'Remove');
        cy.get('.stock-card').eq(1).find('button').should('have.text', 'Remove');
        cy.get('.stock-card').eq(2).find('button').should('have.text', 'Remove');
        cy.get('.stock-card').eq(3).find('button').should('have.text', 'Remove');
        cy.get('.stock-card').eq(4).find('button').should('have.text', 'Remove');
    
        cy.get('.navlinks').children('a').eq(1).click();
        cy.get('h2').should('contain.text', 'Displaying 5 saved stocks');
        cy.get('.stock-card').should('have.length', 5);
    
        cy.get('.stock-card').eq(4).find('button').should('have.text', 'Remove').click();
        cy.get('h2').should('contain.text', 'Displaying 4 saved stocks');
        cy.get('.stock-card').eq(3).find('button').should('have.text', 'Remove').click();
        cy.get('h2').should('contain.text', 'Displaying 3 saved stocks');
        cy.get('.stock-card').eq(2).find('button').should('have.text', 'Remove').click();
        cy.get('h2').should('contain.text', 'Displaying 2 saved stocks');
        cy.get('.stock-card').eq(1).find('button').should('have.text', 'Remove').click();
        cy.get('h2').should('contain.text', 'Displaying 1 saved stock');
        cy.get('.stock-card').eq(0).find('button').should('have.text', 'Remove').click();
        cy.get('h2').should('contain.text', 'You have no stocks saved');
    });
    
   
  })
  