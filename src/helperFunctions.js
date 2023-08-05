import StockCard from './Components/StockCard/StockCard'

const extractData = (data) => {
  const baseData = data.historical.slice(0,150);
  const allClosingPrices = baseData.map(day => Number(day.close.toFixed(2)));
  const initialClose = Number(allClosingPrices[149]);
  const lastClose = Number(allClosingPrices[0]);
  const longTermReturn = Number(((lastClose - initialClose)*100)/initialClose).toFixed(2);
  const priceSum = allClosingPrices.reduce((sum, price) => sum + price, 0);
  const average = Number((priceSum/150).toFixed(2));
  const changePercent = Number(baseData[0].changePercent.toFixed(2));
  const extraction = {
    lastClose: lastClose,
    changePercent: changePercent,
    average: average,
    longTermReturn: longTermReturn,
    saved: false,
    priceHistory: baseData.reverse()
  }
  return extraction;
}

const rankAndFilterStocks = stocks => {
  const filteredByAbsoluteMomentum = stocks.filter(stock => stock.data.lastClose > stock.data.average);
  const sortedByRelativeMomentum = filteredByAbsoluteMomentum.sort((a,b) => b.data.longTermReturn - a.data.longTermReturn);
  const ranksIncluded = sortedByRelativeMomentum.map((stock, index) => {
    const rankedStock = {...stock}
    rankedStock.id = index+1
    return rankedStock
  })
  return ranksIncluded;
}

const makeStockCards = (constituents, toggleStockFromWatchlist) => {
  const stocksCode = constituents.map(constituent => {
    return <StockCard
      symbol={constituent.symbol}
      name={constituent.name}
      id={constituent.id}
      key={constituent.id}
      data={constituent.data}
      toggleStockFromWatchlist={toggleStockFromWatchlist}
    />
  })

  return stocksCode;
}

export {extractData, rankAndFilterStocks, makeStockCards}