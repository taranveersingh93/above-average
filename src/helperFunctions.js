import StockCard from './Components/StockCard/StockCard'
const greenShades = {
  1: '#22dd22',  //light green
  2: '#17ad17',
  3: '#208020',
  4: '#1a641a',
};

const redShades = {
  1: '#eb2c2c', //light red
  2: '#ce2525',
  3: '#b21818',
  4: '#931616'
}


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

const isAboveAverage = stockData => {
   return stockData.lastClose > stockData.average;
}

const rankStocks = stocks => {
  const sortedByRelativeMomentum = stocks.sort((a,b) => b.data.longTermReturn - a.data.longTermReturn);
  const ranksIncluded = sortedByRelativeMomentum.map((stock, index) => {
    const rankedStock = {...stock}
    rankedStock.id = index+1
    return rankedStock
  })
  return ranksIncluded;
}

const makeStockCards = (constituents, toggleStockFromWatchlist) => {
  if (!constituents || constituents.length === 0) {
    return null;
  }
  return (
    <div className="row g-5 mt-4">
      {constituents.map((constituent) => (
        <div className="col-12 col-sm-6 col-xl-4 col-xxl-3" key={constituent.id}>
          <StockCard
            symbol={constituent.symbol}
            name={constituent.name}
            id={constituent.id}
            data={constituent.data}
            toggleStockFromWatchlist={toggleStockFromWatchlist}
          />
        </div>
      ))}
    </div>
  );
};

const getShadeKey = (differencePercent) => {
  const absDiff = Math.abs(differencePercent);
  
  if (absDiff <= 0.05) {
    return 1;
  } else if (absDiff <= 0.10) {
    return 2;
  } else if (absDiff <= 0.15) {
    return 3;
  } else {
    return 4;
  }
};

const getStockColor = (lastClose, average) => {
  const differencePercent = (lastClose - average) / average;
  const shadeKey = getShadeKey(Math.abs(differencePercent));
  const isAbove = differencePercent > 0;
  return isAbove ? greenShades[shadeKey] : redShades[shadeKey];
};

const filterStocks = (searchText, stocks) => {
  return [...stocks].filter(stock => stock.name.toLowerCase().includes(searchText.toLowerCase()) || stock.symbol.toLowerCase().includes(searchText.toLowerCase()));
}

const sortStocks = (sortValue, stocks) => {
  return [...stocks].sort((a, b) => {
    if (sortValue === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortValue === "symbol") {
      return a.symbol.localeCompare(b.symbol);
    } else if (sortValue === "dailyChange") {
      return b.data.changePercent - a.data.changePercent;
    } else if (sortValue === "rating") {
      const aRating = a.data.lastClose > a.data.average ? 1 : 0;
      const bRating = b.data.lastClose > b.data.average ? 1 : 0;
      return bRating - aRating;
    } else if (sortValue === "priceAvgDiff") {
      return ((b.data.lastClose - b.data.average)/b.data.average) - ((a.data.lastClose - a.data.average)/a.data.average);
    } else if (sortValue === "longTermMomentum") {
      return Number(b.data.longTermReturn) - Number(a.data.longTermReturn);
    } else {
      return 0;
    }
  });
}


export {extractData, rankStocks, makeStockCards, isAboveAverage, getStockColor, filterStocks, sortStocks}