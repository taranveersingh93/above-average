import './Watchlist.css';
import { makeStockCards } from '../../helperFunctions';
import { useEffect, useState } from 'react';

const Watchlist = ({savedConstituents, toggleStockFromWatchlist}) => {
  const [stocksCode, setStocksCode] = useState([]);

  useEffect(() => {
    const watchlistCode = makeStockCards(savedConstituents, toggleStockFromWatchlist);
    setStocksCode(watchlistCode);
  }, [savedConstituents])

  return (
    <div className="watchlist-view">
      <h2 className="heading">Displaying {savedConstituents.length} stocks that are above their 150 Day Moving Average</h2>
      <p className="subheading">These stocks are ranked by their 150 Day return.</p>
      {stocksCode}
    </div>
  )
}

export default Watchlist