import { getStockColor } from "../../helperFunctions"
import PropTypes from 'prop-types';


const SymbolTag = ({data, symbol}) => {
    return (
        <div className="symbol-tag position-absolute text-white py-1 px-3 rounded-3 z-index-10"
            style={{ backgroundColor: getStockColor(data.lastClose, data.average) }}>
            <span className="symbol-text">{symbol}</span>
        </div>
    )    
}

SymbolTag.propTypes = {
    symbol: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
  };
  
export default SymbolTag;