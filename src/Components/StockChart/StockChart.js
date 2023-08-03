import { useParams } from 'react-router-dom';
import './StockChart.css';

const StockChart = ({nasdaqConstituents}) => {
  const currentSymbol = useParams().symbol;
  const currentStock = nasdaqConstituents.find(constituent => constituent.symbol === currentSymbol);
  console.log(currentStock)
}

export default StockChart;