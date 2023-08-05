import nasdaqConstituentsStub from "../fixtures/nasdaqConstituents"

const allSymbols = ["AAPL", "ABNB", "ADBE", "ADI", "ADP"];

describe('Stocksview spec', () => {
  beforeEach(() => {
    cy.intercept('GET', `https://above-average-api-8566e04bf888.herokuapp.com/nasdaqConstituents`, {
     statusCode: 200,
     body: nasdaqConstituentsStub
   }).as('getNasdaqConstituents')
  
   allSymbols.forEach(symbol => {
     cy.intercept('GET', `https://above-average-api-8566e04bf888.herokuapp.com/${symbol}`, {
       statusCode: 200,
       fixture: `stub${symbol}`
     }).as(`get${symbol}`)
   })
  
   cy.visit('localhost:3000/stocksView')
   cy.wait('@getNasdaqConstituents')
   const symbolWaitArray = allSymbols.map(symbol => `@get${symbol}`)
   cy.wait(symbolWaitArray);
  })

  it('should show the right elements', () => {
    cy.get('.searchbar')
    cy.get('.heading').contains('Displaying 5 stocks that are above their 150 Day Moving Average')
    cy.get('.subheading').contains('These stocks are ranked by their 150 Day return')
    cy.get('.stock-card').should('have.length', 5)
    cy.get('.stock-card').eq(1).find('.stock-info').eq(0).find('p').contains('Rank')
    cy.get('.stock-card').eq(1).find('.stock-info').eq(0).find('h3').contains('2')
    cy.get('.stock-card').eq(1).find('.stock-info').eq(1).find('p').contains('Adobe Inc.')
    cy.get('.stock-card').eq(1).find('.stock-info').eq(1).find('h3').contains('ADBE')
    cy.get('.stock-card').eq(1).find('.stock-info').eq(2).find('p').contains('Last Close')
    cy.get('.stock-card').eq(1).find('.stock-info').eq(2).find('h3').contains('526.88')
    cy.get('.stock-card').eq(1).find('.stock-info').eq(3).find('p').contains('Last Day Change')
    cy.get('.stock-card').eq(1).find('.stock-info').eq(3).find('h3').contains('0.03%')
    cy.get('.stock-card').eq(1).find('.stock-info').eq(4).find('p').contains('150d Return')
    cy.get('.stock-card').eq(1).find('.stock-info').eq(4).find('h3').contains('56.08%')
  })

  it('should be able to save stocks to watchlist', () => {
    cy.get('.navlinks').find('a').eq(2).contains('Watchlist').click();
    cy.get('h2').contains('You have no stocks saved');
    cy.get('.navlinks').find('a').eq(1).click();
    cy.get('.stock-card').eq(1).find('.watchlist-btn')
      .contains('Save to watchlist').click()
      .contains('Remove from watchlist');
    cy.get('.navlinks').find('a').eq(2).contains('Watchlist').click();
    cy.get('.stock-card').should('have.length', 1);
    cy.get('.stock-card').find('.stock-info').eq(1).find('h3').contains('ADBE')
    cy.get('.watchlist-btn').click();
    cy.get('h2').contains('You have no stocks saved');
    cy.get('.navlinks').find('a').eq(1).click();
    cy.get('.stock-card').eq(1).find('.watchlist-btn').contains('Save to watchlist')
  })
})

describe('Error handling', () => {
  it('should return an error if constituents fail', () => {
    cy.intercept('GET', `https://above-average-api-8566e04bf888.herokuapp.com/nasdaqConstituents`, {
     statusCode: 404,
   }).as('getNasdaqConstituents')
  
   allSymbols.forEach(symbol => {
     cy.intercept('GET', `https://above-average-api-8566e04bf888.herokuapp.com/${symbol}`, {
       statusCode: 200,
       fixture: `stub${symbol}`
     }).as(`get${symbol}`)
   })

   cy.visit('localhost:3000/stocksView')
   cy.wait('@getNasdaqConstituents')
   cy.get('h2').contains('Something went wrong')
  })

  it('should return an error if an individual stock fetch fails', () => {
    cy.intercept('GET', `https://above-average-api-8566e04bf888.herokuapp.com/nasdaqConstituents`, {
      statusCode: 200,
      body: nasdaqConstituentsStub
    }).as('getNasdaqConstituents')
  
    allSymbols.forEach(symbol => {
      cy.intercept('GET', `https://above-average-api-8566e04bf888.herokuapp.com/${symbol}`, {
        statusCode: 404,
      }).as(`get${symbol}`)
    })
    
    cy.visit('localhost:3000/stocksView')
    const symbolWaitArray = allSymbols.map(symbol => `@get${symbol}`)
    cy.wait('@getNasdaqConstituents')
    cy.wait(symbolWaitArray);
    cy.get('h2').contains('Something went wrong')
  })

  it("should return relevant error if API limit is reached while fetching constituents", () => {
    cy.intercept('GET', `https://above-average-api-8566e04bf888.herokuapp.com/nasdaqConstituents`, {
      statusCode: 429,
    }).as('getNasdaqConstituents')
  
    allSymbols.forEach(symbol => {
      cy.intercept('GET', `https://above-average-api-8566e04bf888.herokuapp.com/${symbol}`, {
        statusCode: 404,
      }).as(`get${symbol}`)
    })

    cy.visit('localhost:3000/stocksView')
    cy.wait('@getNasdaqConstituents').then(() => {
      cy.get('h2').contains('The founder is waiting for funding')
    })
  })

  it('should return an error if API limit is reached during individual stock fetch ', () => {
    cy.intercept('GET', `https://above-average-api-8566e04bf888.herokuapp.com/nasdaqConstituents`, {
      statusCode: 200,
      body: nasdaqConstituentsStub
    }).as('getNasdaqConstituents')
  
    allSymbols.forEach(symbol => {
      cy.intercept('GET', `https://above-average-api-8566e04bf888.herokuapp.com/${symbol}`, {
        statusCode: 429,
      }).as(`get${symbol}`)
    })
    
    cy.visit('localhost:3000/stocksView')
    cy.wait('@getNasdaqConstituents').then(() => {
      const symbolWaitArray = allSymbols.map(symbol => `@get${symbol}`)
      cy.wait(symbolWaitArray).then(() => {
        cy.get('h2').contains('The founder is waiting for funding')
      })
    })
  })

  it('should return an error for 500 error while fetching constituents', () => {
    cy.intercept('GET', `https://above-average-api-8566e04bf888.herokuapp.com/nasdaqConstituents`, {
      statusCode: 500,
    }).as('getNasdaqConstituents')
  
    allSymbols.forEach(symbol => {
      cy.intercept('GET', `https://above-average-api-8566e04bf888.herokuapp.com/${symbol}`, {
        statusCode: 200,
        fixture: `stub${symbol}`
      }).as(`get${symbol}`)
    })
  
    cy.visit('localhost:3000/stocksView')
    cy.wait('@getNasdaqConstituents').then(() => {
      cy.get('h2').contains('Something went wrong')
    })
  })

  it('should return an error for 500 error whiel fetching single stock', () => {
    cy.intercept('GET', `https://above-average-api-8566e04bf888.herokuapp.com/nasdaqConstituents`, {
      statusCode: 200,
      body: nasdaqConstituentsStub
    }).as('getNasdaqConstituents')
  
    allSymbols.forEach(symbol => {
      cy.intercept('GET', `https://above-average-api-8566e04bf888.herokuapp.com/${symbol}`, {
        statusCode: 500,
      }).as(`get${symbol}`)
    })
    
    cy.visit('localhost:3000/stocksView')
    cy.wait('@getNasdaqConstituents').then(() => {
      const symbolWaitArray = allSymbols.map(symbol => `@get${symbol}`)
      cy.wait(symbolWaitArray).then(() => {
        cy.get('h2').contains('Something went wrong')
      });
    })
  })
})