const fetchSp500 = () => {
  return fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/%5EGSPC?apikey=${process.env.REACT_APP_API_KEY}`)
    .then(response => response.json())
}

export {
  fetchSp500
}