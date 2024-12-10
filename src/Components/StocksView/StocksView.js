import { useEffect, useState } from "react";
import { fetchStock, fetchNasdaqConstituents } from "../../apiCalls";
import { rankStocks, makeStockCards, isAboveAverage } from "../../helperFunctions";
import LoadSpinner from "../LoadSpinner/LoadSpinner";
import Searchbar from "../Searchbar/Searchbar";
import PropTypes from 'prop-types';
import './StocksView.css'

const StocksView = ({nasdaqConstituents, assignNasdaqConstituents, toggleStockFromWatchlist}) => {
  
  const [errorMessage, setErrorMessage] = useState('');
  const [waitingForData, setWaitingForData] = useState(true);
  const [dataFailed, setDataFailed] = useState(true);
  const [stocksCode, setStocksCode] = useState([]);
  const [stocksOfInterest, setStocksOfInterest] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [stocksToShow, setStocksToShow] = useState(false);

  const filterStocks = (searchText, stocks) => {
    return [...stocks].filter(stock => stock.name.toLowerCase().includes(searchText.toLowerCase()) || stock.symbol.toLowerCase().includes(searchText.toLowerCase()));
  }

  const handleSearch = (searchText) => {
    setSearchValue(searchText);
    setStocksOfInterest(filterStocks(searchText, nasdaqConstituents));
  }

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
    const nasdaqCode = makeStockCards(stocksOfInterest, toggleStockFromWatchlist);
    setStocksCode(nasdaqCode)
  }, [stocksOfInterest])

  return (
    <div className="stocks-view container g-4">
      {!dataFailed && !waitingForData && <Searchbar searchValue={searchValue} handleSearch={handleSearch}/>}
      {stocksToShow && !dataFailed && !waitingForData && <h2 className="heading">Rating {stocksOfInterest.length} Nasdaq stocks based on their closing price vs their 150d Moving Average</h2>}
      {stocksToShow && !dataFailed && !waitingForData && <p className="subheading">These stocks are ranked by their 150 Day return.</p>}
      {!dataFailed && !waitingForData && stocksCode}
      {!stocksToShow && !dataFailed && !waitingForData && <h2 className="heading">No Nasdaq stocks match your search</h2>}
      {!waitingForData && dataFailed && <h2>{errorMessage}</h2>}
      {waitingForData && <LoadSpinner />}
    </div>
  )
}

StocksView.propTypes = {
  nasdaqConstituents: PropTypes.array,
  assignNasdaqConstituents: PropTypes.func,
  toggleStockFromWatchlist: PropTypes.func
}

export default StocksView;