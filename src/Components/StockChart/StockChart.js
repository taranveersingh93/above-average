import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './StockChart.css';
import { Line } from 'react-chartjs-2';
import { fetchStock } from '../../apiCalls';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import LoadSpinner from '../LoadSpinner/LoadSpinner';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const StockChart = () => {
  const [currentStock, setCurrentStock] = useState({});
  const [lineOptions, setLineOptions] = useState({});
  const [lineData, setLineData] = useState({labels:[], datasets:[]});
  const [waitingForData, setWaitingForData] = useState(true);
  const [dataFailed, setDataFailed] = useState(true);
  const [errorMessage, setErrorMessage] = useState('')

  const currentSymbol = useParams().symbol.toUpperCase();

  useEffect(() => {
    if (!currentStock.data) {
      fetchStock({symbol:currentSymbol})
        .then(data => {
          const stock = data;
          stock.name = data.symbol
          setCurrentStock(stock);
          setWaitingForData(false);
          setDataFailed(false);
        })
        .catch(error => {
          setDataFailed(true);
          setWaitingForData(false);
          setErrorMessage(error.message);
        })
    }
  }, []) 

  useEffect(() => {
    if (currentStock.data) {
      console.log(currentStock.data.priceHistory, "pricehistory")
      const options = {
        responsive: true,
        scales: {
          y: {
            color:"#ffffff"
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: `${currentSymbol} closing prices over last 150 days`,
          },
        },
      };
      const labels = currentStock.data.priceHistory.map(price => price.date)

      const data = {
        labels,
        datasets: [
          {
            label: `${currentStock.symbol}`,
            data: currentStock.data.priceHistory.map(price => price.close),
            borderColor: 'rgb(89, 252, 92)',
            backgroundColor: 'rgb(29, 41, 19)',
          }
        ]
      }
      setLineOptions(options);
      setLineData(data);
    }
  }, [currentStock])

  return (
    <div className='line-container'>
      {!waitingForData && !dataFailed && <Line options={lineOptions} data={lineData} />}
      {waitingForData && <LoadSpinner />}
      {!waitingForData && dataFailed && <h2>{errorMessage}</h2>}
    </div>
  )
}

export default StockChart;