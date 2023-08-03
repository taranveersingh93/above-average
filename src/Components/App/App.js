import './App.css';
import Navbar from '../Navbar/Navbar';
import {Routes, Route} from 'react-router-dom';
import HomeView from '../HomeView/HomeView';
import StocksView from '../StocksView/StocksView';
import { fetchNasdaq, fetchNasdaqConstituents, fetchStock } from '../../apiCalls';
import { extractData } from '../../helperFunctions';
import { useEffect, useState } from 'react';


const App = () => {
  const [nasdaqData, setNasdaqData] = useState({});
  const [nasdaqConstituents, setNasdaqConstituents] = useState([]);

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

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeView nasdaqData={nasdaqData} assignNasdaqData={assignNasdaqData}/>}/>
        <Route path='/stocksView' element={<StocksView nasdaqConstituents={nasdaqConstituents} assignNasdaqConstituents={assignNasdaqConstituents} toggleStockFromWatchlist={toggleStockFromWatchlist}/>}/>
      </Routes>
    </>
  )
}

export default App;
