import './App.css';
import Navbar from '../Navbar/Navbar';
import {Routes, Route} from 'react-router-dom';
import StocksView from '../StocksView/StocksView';
import { useEffect, useState } from 'react';
import Watchlist from '../Watchlist/Watchlist';
import StockChart from '../StockChart/StockChart';
import ErrorPage from '../ErrorPage/ErrorPage';
import { getCardsPerRow } from '../../helperFunctions';
import { fetchStock, fetchNasdaqConstituents } from "../../apiCalls";
import { rankStocks, filterStocks, sortStocks } from "../../helperFunctions";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Cookies from 'js-cookie';


const App = () => {
  const [nasdaqConstituents, setNasdaqConstituents] = useState([]);
  const [savedConstituents, setSavedConstituents] = useState([]);
  const [stocksOfInterest, setStocksOfInterest] = useState([]);
  const [cardsPerRow, setCardsPerRow] = useState(getCardsPerRow());
  const [errorMessage, setErrorMessage] = useState('');
  const [waitingForData, setWaitingForData] = useState(true);
  const [dataFailed, setDataFailed] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [sortValue, setSortValue] = useState('longTermMomentum');

  const assignNasdaqConstituents = data => {
    const watchlistSymbols = Cookies.get('watchlist')
      ? JSON.parse(Cookies.get('watchlist'))
      : [];
    
    const updatedConstituents = data.map((stock) => {
      if (watchlistSymbols.includes(stock.symbol)) {
        stock.data.saved = true;
      }
      return stock;
    });
    setNasdaqConstituents(updatedConstituents);
  }
  
  const toggleStockFromWatchlist = id => {
    const clonedConstituents = [...nasdaqConstituents];
    const indexPosition = clonedConstituents.indexOf(clonedConstituents.find(constituent => constituent.id === id));
    // check that indexPosition is found
    if (indexPosition !== -1) {
      //toggle the saved boolean directly in clonedConstituents
      clonedConstituents[indexPosition].data.saved = !clonedConstituents[indexPosition].data.saved;
      const stock = clonedConstituents[indexPosition];
      //handle cookies update
      const currentWatchlist = Cookies.get('watchlist')
      ? JSON.parse(Cookies.get('watchlist'))
      : [];
      let updatedWatchlist;
      if (stock.data.saved) {
        updatedWatchlist = [...currentWatchlist, stock.symbol];
      } else {
        updatedWatchlist = currentWatchlist.filter((savedSymbol) => savedSymbol !== stock.symbol);
      }
      Cookies.set('watchlist', JSON.stringify(updatedWatchlist), { expires: 7 }); //7 days storage

    }
    setNasdaqConstituents(clonedConstituents);
  }

  const handleResize = () => {
    setCardsPerRow(getCardsPerRow());
  }

  const handleSearch = (searchText) => {
    setSearchValue(searchText);
  }
  
  const handleSort = (newSortValue) => {
    setSortValue(newSortValue);
  }
  
  useEffect(() => {
    const filteredStocks = filterStocks(searchValue, nasdaqConstituents);
    const sortedStocks = sortStocks(sortValue, filteredStocks);
    setStocksOfInterest(sortedStocks)
  }, [searchValue, sortValue])
  
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
      console.log(nasdaqConstituents)
      const savedStocks = nasdaqConstituents.filter(stock => stock.data.saved);
      setSavedConstituents(savedStocks);
      setStocksOfInterest(nasdaqConstituents);
      setDataFailed(false)
      setWaitingForData(false)
    }
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
        <Route path='/' element={
          <StocksView 
            handleSearch={handleSearch}
            handleSort={handleSort}
            toggleStockFromWatchlist={toggleStockFromWatchlist}
            cardsPerRow={cardsPerRow}
            stocksOfInterest={stocksOfInterest}
            errorMessage={errorMessage}
            waitingForData={waitingForData}
            dataFailed={dataFailed}
            searchValue={searchValue}
            sortValue={sortValue}
          />
        }/>
        <Route path='/watchlist' element={
          <Watchlist
           savedConstituents={savedConstituents} 
           toggleStockFromWatchlist={toggleStockFromWatchlist} 
           cardsPerRow={cardsPerRow}
           errorMessage={errorMessage}
           waitingForData={waitingForData}
           dataFailed={dataFailed}
           />} />
        <Route path='/chart/:symbol' element={<StockChart nasdaqConstituents={nasdaqConstituents}/>}></Route>
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default App;
