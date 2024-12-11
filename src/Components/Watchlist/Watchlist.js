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
    <div className="watchlist-view container">
      {stocksSaved && <h2 className="font-light text-black-50 text-center mt-4">Displaying {savedConstituents.length} saved stocks</h2>}
      {stocksSaved && stocksCode}
      {!stocksSaved && <h2 className='font-light text-black-50 text-center mt-4'>You have no stocks saved</h2>}
    </div>
  )
}

Watchlist.propTypes = {
  savedConstituents: PropTypes.array,
  toggleStockFromWatchlist: PropTypes.func
}

export default Watchlist