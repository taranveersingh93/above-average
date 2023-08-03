import { useParams } from 'react-router-dom';
import './StockChart.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const StockChart = ({nasdaqConstituents}) => {
  const currentSymbol = useParams().symbol;
  const currentStock = nasdaqConstituents.find(constituent => constituent.symbol === currentSymbol);

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
        text: `${currentStock.name} closing prices over last 150 days`,
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
        // borderColor: 'rgb(89, 252, 92)',
        borderColor: 'rgb(89, 252, 92)',
        backgroundColor: 'rgb(29, 41, 19)',
      }
    ]
  }

  return (
    <div className='line-container'>
      <Line className='line' options={options} data={data} />
    </div>
  )
}

export default StockChart;