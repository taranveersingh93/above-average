import './Watchlist.css';
import { makeStockCards } from '../../helperFunctions';
import { useEffect, useState } from 'react';

const Watchlist = ({savedConstituents, toggleStockFromWatchlist}) => {
  const [stocksCode, setStocksCode] = useState([]);
  const [stocksSaved, setStocksSaved] = useState(false);

  useEffect(() => {
    const watchlistCode = makeStockCards(savedConstituents, toggleStockFromWatchlist);
    setStocksCode(watchlistCode);  

    if (savedConstituents.length) {
      setStocksSaved(true);
    } else {
      setStocksSaved(false);
    }
  }, [savedConstituents])

  return (
    <div className="watchlist-view">
      {stocksSaved && <h2 className="heading">Displaying {savedConstituents.length} stocks that are above their 150 Day Moving Average</h2>}
      {stocksSaved && <p className="subheading">These stocks are ranked by their 150 Day return.</p>}
      {stocksSaved && stocksCode}
      {!stocksSaved && <h2>You have no stocks saved</h2>}
    </div>
  )
}

export default Watchlist