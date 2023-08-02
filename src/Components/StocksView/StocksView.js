import { useEffect, useState } from "react"
import { fetchStock, fetchNasdaqConstituents } from "../../apiCalls"

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
            constituents.map(constituent => fetchStock(constituent))
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
}

export default StocksView;