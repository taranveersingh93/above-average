import { useEffect, useState } from "react";
import { fetchStock, fetchNasdaqConstituents } from "../../apiCalls";
import { rankAndFilterStocks, makeStockCards } from "../../helperFunctions";
import LoadSpinner from "../LoadSpinner/LoadSpinner";
import './StocksView.css'

const StocksView = ({nasdaqConstituents, assignNasdaqConstituents, toggleStockFromWatchlist}) => {
  
  const [errorMessage, setErrorMessage] = useState('');
  const [waitingForData, setWaitingForData] = useState(true);
  const [dataFailed, setDataFailed] = useState(true);
  const [stocksCode, setStocksCode] = useState([]);

  useEffect(() => {
    if (!nasdaqConstituents.length) {
      fetchNasdaqConstituents()
        .then(constituents => {
          return Promise.all(
            constituents.map((constituent, index) => fetchStock(constituent, index))
          )
        })
        .then(unfilteredConstituents => {
          const newConstituents = rankAndFilterStocks(unfilteredConstituents);
          setWaitingForData(false);
          setDataFailed(false);
          assignNasdaqConstituents(newConstituents);
        })
        .catch(error => {
          console.log(error.message)
          setErrorMessage(error.message)
          setWaitingForData(false);
          setDataFailed(true);
        })
    } else {
      const nasdaqCode = makeStockCards(nasdaqConstituents, toggleStockFromWatchlist);
      setStocksCode(nasdaqCode)
    }
  }, [nasdaqConstituents])

  return (
    <div className="stocks-view">
      {!dataFailed && !waitingForData && <h2 className="heading">Displaying {nasdaqConstituents.length} stocks that are above their 150 Day Moving Average</h2>}
      {!dataFailed && !waitingForData && <p className="subheading">These stocks are ranked by their 150 Day return.</p>}
      {!dataFailed && !waitingForData && stocksCode}
      {!waitingForData && dataFailed && <h2>{errorMessage}</h2>}
      {waitingForData && <LoadSpinner />}
    </div>
  )
}

export default StocksView;