import { useEffect, useState } from "react";
import { fetchStock, fetchNasdaqConstituents } from "../../apiCalls";
import StockCard from "../StockCard/StockCard";

const StocksView = () => {
  const [nasdaqConstituents, setNasdaqConstituents] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [waitingForData, setWaitingForData] = useState(true);
  const [dataFailed, setDataFailed] = useState(true);


  useEffect(() => {console.log(nasdaqConstituents)}, [nasdaqConstituents])
  useEffect(() => {console.log(errorMessage)}, [errorMessage])
  useEffect(() => {
    if (!nasdaqConstituents.length) {
      fetchNasdaqConstituents()
        .then(constituents => {
          return Promise.all(
            constituents.map((constituent, index) => fetchStock(constituent, index))
          )
        })
        .then(newConstituents => {
          setNasdaqConstituents(newConstituents);
          setWaitingForData(false);
          setDataFailed(false);
        })
        .catch(error => {
          setErrorMessage(error)
          setWaitingForData(false);
          setDataFailed(true);
        })
    }
  }, [])

  // useEffect(() => {
  //   if (nasdaqConstituents.length) {
  //     const stocksCode = nasdaqConstituents.map(constituent => {
  //       return <StockCard
  //         symbol={constituent.symbol}
  //         name={constituent.name}
  //         id={constituent.id}
  //         key={constituent.id}
  //         data={constituent.data}
  //       />
  //     })
  //     console.log(stocksCode)
  //   }    
  // }, [nasdaqConstituents])

  const stocksCode = nasdaqConstituents.map(constituent => {
    return <StockCard
      symbol={constituent.symbol}
      name={constituent.name}
      id={constituent.id}
      key={constituent.id}
      data={constituent.data}
    />
  })

  return (
    <div className="stocks-view">
      {stocksCode}
    </div>
  )
}

export default StocksView;