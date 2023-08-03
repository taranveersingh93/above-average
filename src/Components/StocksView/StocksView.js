import { useEffect, useState } from "react";
import { fetchStock, fetchNasdaqConstituents } from "../../apiCalls";
import StockCard from "../StockCard/StockCard";
import { rankAndFilterStocks } from "../../helperFunctions";
import './StocksView.css'

const StocksView = ({nasdaqConstituents, assignNasdaqConstituents, toggleStockFromWatchlist}) => {
  
  const [errorMessage, setErrorMessage] = useState('');
  const [waitingForData, setWaitingForData] = useState(true);
  const [dataFailed, setDataFailed] = useState(true);
  const [stocksCode, setStocksCode] = useState([]);


  useEffect(() => {console.log(errorMessage)}, [errorMessage])
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
          setErrorMessage(error)
          setWaitingForData(false);
          setDataFailed(true);
        })
    } else {
      const nasdaqCode = nasdaqConstituents.map(constituent => {
        return <StockCard
          symbol={constituent.symbol}
          name={constituent.name}
          id={constituent.id}
          key={constituent.id}
          data={constituent.data}
          toggleStockFromWatchlist={toggleStockFromWatchlist}
        />
      })
      setStocksCode(nasdaqCode)
    }
  }, [nasdaqConstituents])

  return (
    <div className="stocks-view">
      <h2 className="heading">Displaying {nasdaqConstituents.length} stocks that are above their 150 Day Moving Average</h2>
      <p className="subheading">These stocks are ranked by their 150 Day return.</p>
      {stocksCode}
    </div>
  )
}

export default StocksView;