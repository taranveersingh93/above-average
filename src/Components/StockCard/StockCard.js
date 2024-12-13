import './StockCard.css';
import PropTypes from 'prop-types';
import SymbolTag from './CardComponents/SymbolTag';
import ButtonContainer from './CardComponents/ButtonContainer';
import TopSection from './CardComponents/TopSection';
import InfoSection from './CardComponents/InfoSection';

const StockCard = ({ symbol, name, data, id, toggleStockFromWatchlist }) => {
  return (
    <div className="card position-relative stock-card shadow-lg rounded p-3 h-100">
      <SymbolTag symbol={symbol} data={data} />
      <div className="card-body d-flex flex-column justify-content-around">
        <TopSection id={id} name={name} data={data} />
        <InfoSection data={data} />
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
