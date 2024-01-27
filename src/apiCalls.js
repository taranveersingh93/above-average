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

let fetchUrl = "https://above-average-api-production.up.railway.app";
fetchUrl = "http://localhost:3001"

const fetchNasdaq = () => {
    return fetch(`${fetchUrl}/nasdaqData`)
    .then(response => checkForError(response))
}

const fetchNasdaqConstituents = () => {
  return fetch(`${fetchUrl}/nasdaqConstituents`)
    .then(response => checkForError(response))
    .then(data => data.map(stock => ({symbol: stock.symbol, name: stock.name})))
}

const fetchStock = (stock) => {
  const stockData = {
    symbol: stock.symbol,
    name: stock.name,
  }

  return fetch(`${fetchUrl}/${stock.symbol}`)
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