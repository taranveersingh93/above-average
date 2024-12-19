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
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

const StockChart = () => {
  const [currentStock, setCurrentStock] = useState({});
  const [lineOptions, setLineOptions] = useState({});
  const [lineData, setLineData] = useState({ labels: [], datasets: [] });
  const [waitingForData, setWaitingForData] = useState(true);
  const [dataFailed, setDataFailed] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const currentSymbol = useParams().symbol.toUpperCase();

  useEffect(() => {
    if (!currentStock.data) {
      fetchStock({ symbol: currentSymbol })
        .then(data => {
          const stock = data;
          stock.name = data.symbol;
          setCurrentStock(stock);
          setWaitingForData(false);
          setDataFailed(false);
        })
        .catch(error => {
          setDataFailed(true);
          setWaitingForData(false);
          setErrorMessage(error.message);
        });
    }
  }, [currentSymbol]);

  useEffect(() => {
    if (currentStock.data) {
      const prices = currentStock.data.priceHistory.map(price => price.close);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      
      const options = {
        scales: {
          x: {
            ticks: {
              maxTicksLimit: 10,
            },
          },
          y: {
            color: "#ffffff",
            min: minPrice * 0.8,
            max: maxPrice * 1.2
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
          zoom: {
            pan: {
              enabled: true,
              mode: 'xy',
              speed: 10,
              threshold: 10,
              limits: {
                x: { min: 0, max: currentStock.data.priceHistory.length - 1 },
                y: { min: minPrice * 0.8, max: maxPrice * 1.2 },
              },
            },
            zoom: {
              pinch: {
                enabled: true,
                mode: 'x',
              },
              wheel: {
                enabled: true,
                mode: 'x',
              },
            },
            limits: {
              x: { min: 0, max: currentStock.data.priceHistory.length - 1 },
              y: { min: minPrice * 0.8, max: maxPrice * 1.2 },
            },
          },
        },
      };

      const labels = currentStock.data.priceHistory.map(price => price.date);

      const data = {
        labels,
        datasets: [
          {
            label: `${currentStock.symbol}`,
            data: prices,
            borderColor: 'rgb(89, 252, 92)',
            backgroundColor: 'rgb(29, 41, 19)',
          }
        ]
      };
      setLineOptions(options);
      setLineData(data);
    }
  }, [currentStock, currentSymbol]);

  return (
    <div className="line-container">
      {!waitingForData && !dataFailed && <Line options={lineOptions} data={lineData} />}
      {waitingForData && <LoadSpinner />}
      {!waitingForData && dataFailed && <h2>{errorMessage}</h2>}
    </div>
  );
};

export default StockChart;
