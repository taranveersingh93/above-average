import './Watchlist.css';
import { makeStockCards } from '../../helperFunctions';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

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
      {stocksSaved && <h2 className="heading">Displaying {savedConstituents.length} saved stocks</h2>}
      {stocksSaved && <p className="subheading">These stocks are ranked by their 150 Day return.</p>}
      {stocksSaved && stocksCode}
      {!stocksSaved && <h2>You have no stocks saved</h2>}
    </div>
  )
}

Watchlist.propTypes = {
  savedConstituents: PropTypes.array,
  toggleStockFromWatchlist: PropTypes.func
}

export default Watchlist