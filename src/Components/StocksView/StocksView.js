import { useEffect, useState } from "react";
import { fetchStock, fetchNasdaqConstituents } from "../../apiCalls";
import StockCard from "../StockCard/StockCard";
import { rankAndFilterStocks } from "../../helperFunctions";

const StocksView = ({nasdaqConstituents, assignNasdaqConstituents}) => {
  
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
        />
      })
      setStocksCode(nasdaqCode)
    }
  }, [nasdaqConstituents])

  useEffect(() => {
    console.log(stocksCode)
  }, [stocksCode])

  return (
    <div className="stocks-view">
      {stocksCode}
    </div>
  )
}

export default StocksView;