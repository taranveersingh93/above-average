import { useEffect, useState } from "react";
import { makeStockCards } from "../../helperFunctions";
import LoadSpinner from "../LoadSpinner/LoadSpinner";
import Searchbar from "../Searchbar/Searchbar";
import PropTypes from 'prop-types';
import './StocksView.css'
import SortDropdown from "../SortDropdown/SortDropdown";

const StocksView = ({
  stocksOfInterest,
  toggleStockFromWatchlist, 
  cardsPerRow,
  handleSearch, 
  handleSort, 
  errorMessage, 
  waitingForData, 
  dataFailed,
  searchValue,
  sortValue}) => {
  
  const [stocksCode, setStocksCode] = useState([]);
  const [stocksToShow, setStocksToShow] = useState(false);

  useEffect(() => {
    if (stocksOfInterest.length) {
      setStocksToShow(true);
    } else {
      setStocksToShow(false);
    }
    const nasdaqCode = makeStockCards(stocksOfInterest, toggleStockFromWatchlist, cardsPerRow);
    setStocksCode(nasdaqCode)
  }, [stocksOfInterest])

  return (
    <div className="stocks-view container">
      {!waitingForData && dataFailed && <h2 className="font-light text-black-50 text-center mt-4">{errorMessage}</h2>}
      {waitingForData && <LoadSpinner />}
      {!dataFailed && !waitingForData && <Searchbar searchValue={searchValue} handleSearch={handleSearch}/>}
      {!dataFailed && !waitingForData && <SortDropdown sortValue={sortValue} handleSort={handleSort}/>}
      {!stocksToShow && !dataFailed && !waitingForData && <h2 className="font-light text-black-50 text-center mt-4">No Nasdaq stocks match your search</h2>}
      {!dataFailed && !waitingForData && stocksCode}
    </div>
  )
}

StocksView.propTypes = {
  stocksOfInterest: PropTypes.array,
  toggleStockFromWatchlist: PropTypes.func,
  cardsPerRow: PropTypes.number,
  handleSearch: PropTypes.func,
  handleSort: PropTypes.func,
  errorMessage: PropTypes.string,
  waitingForData: PropTypes.bool,
  dataFailed: PropTypes.bool,
  searchValue: PropTypes.string,
  sortValue: PropTypes.string
}

export default StocksView;