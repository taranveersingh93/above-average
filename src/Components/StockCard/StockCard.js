import './StockCard.css';
import PropTypes from 'prop-types';
import { isAboveAverage } from '../../helperFunctions';
import SymbolTag from './SymbolTag';
import ButtonContainer from './ButtonContainer';
import TopSection from './TopSection';

const StockCard = ({ symbol, name, data, id, toggleStockFromWatchlist }) => {
  return (
    <div className="card position-relative stock-card shadow-lg rounded p-3 mb-4 h-100">
      <SymbolTag symbol={symbol} data={data} />
      <div className="card-body d-flex flex-column justify-content-around">
        <TopSection id={id} name={name} data={data} />
        <div className="d-flex align-items-center justify-content-around border p-2 mb-2">
          <i className="bi bi-info-circle text-success fs-3 me-3"></i>
          <div className="d-flex flex-column align-items-center">
            <span className="text-muted small-text">Moving Avg</span>
            <span className="font-weight-300">{data?.average}</span>
          </div>
        </div>
        
        <div className="d-flex align-items-center justify-content-around border p-2 mb-2">
          <i className={`bi fs-3 ${data?.changePercent >= 0 ? 'bi-arrow-up' : 'bi-arrow-down'} text-${data?.changePercent >= 0 ? 'success' : 'danger'} me-3`}></i> {/* Icon */}
          <div className="d-flex flex-column align-items-center">
            <span className="text-muted small-text">Change</span>
            <span className={` ${data?.changePercent >= 0 ? 'text-success' : 'text-danger'}`}>{data?.changePercent}%</span>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-around border p-2 mb-2">
  <i 
    className={`bi fs-3 ${isAboveAverage(data) ? 'bi-hand-thumbs-up text-success' : 'bi-hand-thumbs-down text-danger'} 
    me-3`} 
  ></i>
  <div className="d-flex flex-column align-items-center">
    <span className="text-muted small-text">Rating</span> {/* 'small' is a Bootstrap class for small text */}
    <span className={`small-text ${isAboveAverage(data) ? 'text-success' : 'text-danger'}`}>
      {isAboveAverage(data) ? 'Above Average' : 'Below Average'}
    </span>
  </div>
        </div>
        <ButtonContainer data={data} toggleStockFromWatchlist={toggleStockFromWatchlist} id={id} symbol={symbol} />
      </div>
    </div>
  );
}

StockCard.propTypes = {
  symbol: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  toggleStockFromWatchlist: PropTypes.func.isRequired
};

export default StockCard;
