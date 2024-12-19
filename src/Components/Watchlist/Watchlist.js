import './Watchlist.css';
import { makeStockCards } from '../../helperFunctions';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LoadSpinner from '../LoadSpinner/LoadSpinner';

const Watchlist = ({savedConstituents, toggleStockFromWatchlist, cardsPerRow, dataFailed, waitingForData, errorMessage}) => {
  const [stocksCode, setStocksCode] = useState([]);
  const [stocksSaved, setStocksSaved] = useState(false);

  useEffect(() => {
    const watchlistCode = makeStockCards(savedConstituents, toggleStockFromWatchlist, cardsPerRow);
    setStocksCode(watchlistCode);  

    if (savedConstituents.length) {
      setStocksSaved(true);
    } else {
      setStocksSaved(false);
    }
  }, [savedConstituents])

  return (
    <div className="watchlist-view container">
      {!waitingForData && dataFailed && <h2 className="font-light text-black-50 text-center mt-4">{errorMessage}</h2>}
      {waitingForData && <LoadSpinner />}
      {!waitingForData && !dataFailed && stocksSaved && (
        <h2 className="font-light text-black-50 text-center mt-4">
          Displaying {savedConstituents.length} saved {savedConstituents.length === 1 ? 'stock' : 'stocks'}
        </h2>
      )}
      {stocksSaved && !waitingForData && !dataFailed && stocksCode}
      {!stocksSaved && !dataFailed && <h2 className='font-light text-black-50 text-center mt-4'>You have no stocks saved</h2>}
    </div>
  )
}

Watchlist.propTypes = {
  savedConstituents: PropTypes.array,
  toggleStockFromWatchlist: PropTypes.func,
  cardsPerRow: PropTypes.number,
  waitingForData: PropTypes.bool,
  dataFailed: PropTypes.bool,
  errorMessage: PropTypes.string
}

export default Watchlist