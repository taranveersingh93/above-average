import { useEffect, useState } from "react"
import { fetchStock, fetchNasdaqConstituents } from "../../apiCalls"

const StocksView = () => {
  const [nasdaqConstituents, setNasdaqConstituents] = useState([]);
  useEffect(() => {console.log(nasdaqConstituents)}, [nasdaqConstituents])
  useEffect(() => {
    if (!nasdaqConstituents.length) {
      fetchNasdaqConstituents()
        .then(constituents => {
          return Promise.all(
            constituents.map(constituent => fetchStock(constituent))
          )
        })
        .then(newConstituents => {setNasdaqConstituents(newConstituents)})
    }
  }, [])
}

export default StocksView;