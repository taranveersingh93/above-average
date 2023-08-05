import { extractData } from "./helperFunctions"

const checkForError = response => {
  if (response.status === 429) {
    throw new Error(`The founder is waiting for funding. Please wait a full minute before reloading`)
  } else if(!response.ok) {
    throw new Error(`Something went wrong.`);
  } else {
    return response.json()
  }
}

const fetchNasdaq = () => {
    return fetch(`https://above-average-api-8566e04bf888.herokuapp.com/nasdaqData`)
    .then(response => checkForError(response))
}

const fetchNasdaqConstituents = () => {
  return fetch(`https://above-average-api-8566e04bf888.herokuapp.com/nasdaqConstituents`)
    .then(response => checkForError(response))
    .then(data => data.map(stock => ({symbol: stock.symbol, name: stock.name})))
}

const fetchStock = (stock) => {
  const stockData = {
    symbol: stock.symbol,
    name: stock.name,
  }

  return fetch(`https://above-average-api-8566e04bf888.herokuapp.com/${stock.symbol}`)
    .then(response => checkForError(response))
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