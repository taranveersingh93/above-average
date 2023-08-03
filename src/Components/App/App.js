import './App.css';
import Navbar from '../Navbar/Navbar';
import {Routes, Route} from 'react-router-dom';
import HomeView from '../HomeView/HomeView';
import StocksView from '../StocksView/StocksView';
import { useEffect, useState } from 'react';
import Watchlist from '../Watchlist/Watchlist';


const App = () => {
  const [nasdaqData, setNasdaqData] = useState({});
  const [nasdaqConstituents, setNasdaqConstituents] = useState([]);
  const [savedConstituents, setSavedConstituents] = useState([]);

  const assignNasdaqData = data => {
    setNasdaqData(data);
  }

  const assignNasdaqConstituents = data => {
    setNasdaqConstituents(data);
  }

  const toggleStockFromWatchlist = id => {
    const clonedConstituents = [...nasdaqConstituents];
    const indexPosition = clonedConstituents.indexOf(clonedConstituents.find(constituent => constituent.id === id));
    clonedConstituents[indexPosition].data.saved = !clonedConstituents[indexPosition].data.saved;
    setNasdaqConstituents(clonedConstituents);
  }

  useEffect(() => {
    const savedStocks = nasdaqConstituents.filter(stock => stock.data.saved)
  }, [nasdaqConstituents])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeView nasdaqData={nasdaqData} assignNasdaqData={assignNasdaqData}/>}/>
        <Route path='/stocksView' element={<StocksView nasdaqConstituents={nasdaqConstituents} assignNasdaqConstituents={assignNasdaqConstituents} toggleStockFromWatchlist={toggleStockFromWatchlist}/>}/>
        <Route path='/watchlist' element={<Watchlist />} />
      </Routes>
    </>
  )
}

export default App;
