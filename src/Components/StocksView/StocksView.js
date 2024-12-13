import { useEffect, useState } from "react";
import { fetchStock, fetchNasdaqConstituents } from "../../apiCalls";
import { rankStocks, makeStockCards, filterStocks, sortStocks } from "../../helperFunctions";
import LoadSpinner from "../LoadSpinner/LoadSpinner";
import Searchbar from "../Searchbar/Searchbar";
import PropTypes from 'prop-types';
import './StocksView.css'
import SortDropdown from "../SortDropdown/SortDropdown";

const StocksView = ({nasdaqConstituents, assignNasdaqConstituents, toggleStockFromWatchlist, cardsPerRow}) => {
  
  const [errorMessage, setErrorMessage] = useState('');
  const [waitingForData, setWaitingForData] = useState(true);
  const [dataFailed, setDataFailed] = useState(true);
  const [stocksCode, setStocksCode] = useState([]);
  const [stocksOfInterest, setStocksOfInterest] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [sortValue, setSortValue] = useState('longTermMomentum');
  const [stocksToShow, setStocksToShow] = useState(false);

  const handleSearch = (searchText) => {
    setSearchValue(searchText);
  }
  
  const handleSort = (newSortValue) => {
    setSortValue(newSortValue);
  }
  
  useEffect(() => {
    const filteredStocks = filterStocks(searchValue, nasdaqConstituents);
    const sortedStocks = sortStocks(sortValue, filteredStocks);
    setStocksOfInterest(sortedStocks)
  }, [searchValue, sortValue])

  useEffect(() => {
    if (!nasdaqConstituents.length) {
      fetchNasdaqConstituents()
        .then(constituents => {
          return Promise.all(
            constituents.map((constituent) => fetchStock(constituent))
          )
        })
        .then(unfilteredConstituents => {
          const newConstituents = rankStocks(unfilteredConstituents);
          setWaitingForData(false);
          setDataFailed(false);
          assignNasdaqConstituents(newConstituents);
        })
        .catch(error => {
          setErrorMessage(error.message)
          setWaitingForData(false);
          setDataFailed(true);
        })
    } else {
      setDataFailed(false)
      setWaitingForData(false)
      setStocksOfInterest(filterStocks(searchValue, nasdaqConstituents))
    }
  }, [nasdaqConstituents])

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
  nasdaqConstituents: PropTypes.array,
  assignNasdaqConstituents: PropTypes.func,
  toggleStockFromWatchlist: PropTypes.func,
  cardsPerRow: PropTypes.number
}

export default StocksView;