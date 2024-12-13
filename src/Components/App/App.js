import './App.css';
import Navbar from '../Navbar/Navbar';
import {Routes, Route} from 'react-router-dom';
import StocksView from '../StocksView/StocksView';
import { useEffect, useState } from 'react';
import Watchlist from '../Watchlist/Watchlist';
import StockChart from '../StockChart/StockChart';
import ErrorPage from '../ErrorPage/ErrorPage';
import { getCardsPerRow } from '../../helperFunctions';
import AOS from 'aos';
import 'aos/dist/aos.css';

const App = () => {
  const [nasdaqConstituents, setNasdaqConstituents] = useState([]);
  const [savedConstituents, setSavedConstituents] = useState([]);
  const [cardsPerRow, setCardsPerRow] = useState(getCardsPerRow());
  
  const assignNasdaqConstituents = data => {
    setNasdaqConstituents(data);
  }
  
  const toggleStockFromWatchlist = id => {
    const clonedConstituents = [...nasdaqConstituents];
    const indexPosition = clonedConstituents.indexOf(clonedConstituents.find(constituent => constituent.id === id));
    clonedConstituents[indexPosition].data.saved = !clonedConstituents[indexPosition].data.saved;
    setNasdaqConstituents(clonedConstituents);
  }

  const handleResize = () => {
    setCardsPerRow(getCardsPerRow());
  }
  
  useEffect(() => {
    const savedStocks = nasdaqConstituents.filter(stock => stock.data.saved);
    setSavedConstituents(savedStocks);
  }, [nasdaqConstituents])

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<StocksView nasdaqConstituents={nasdaqConstituents} assignNasdaqConstituents={assignNasdaqConstituents} toggleStockFromWatchlist={toggleStockFromWatchlist} cardsPerRow={cardsPerRow}/>}/>
        <Route path='/watchlist' element={<Watchlist savedConstituents={savedConstituents} toggleStockFromWatchlist={toggleStockFromWatchlist} cardsPerRow={cardsPerRow}/>} />
        <Route path='/chart/:symbol' element={<StockChart nasdaqConstituents={nasdaqConstituents}/>}></Route>
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default App;
