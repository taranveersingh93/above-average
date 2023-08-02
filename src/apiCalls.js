import { extractData } from "./helperFunctions"

const fetchNasdaq = () => {
  return fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/%5ENDX?apikey=${process.env.REACT_APP_API_KEY}`)
    .then(response => response.json())
}

const fetchNasdaqConstituents = () => {
  return fetch(`https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${process.env.REACT_APP_API_KEY}`)
    .then(response => response.json())
    .then(data => data.map(stock => ({symbol: stock.symbol, name: stock.name})))
}

const fetchStock = stock => {
  const stockData = {
    symbol: stock.symbol,
    name: stock.name
  }
  return fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${stock.symbol}?timeseries=151&apikey=${process.env.REACT_APP_API_KEY}`)
    .then(response => response.json())
    .then(fetchedData => {
      stockData.data = extractData(fetchedData);
      return stockData;
    })
}

export {
  fetchNasdaq,
  fetchNasdaqConstituents,
  fetchStock
}