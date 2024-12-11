import PropTypes from 'prop-types';
import './SortDropdown.css';

const SortDropdown = ({ handleSort, sortValue }) => {

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <label htmlFor="sortDropdown" className="me-2 small-text">
        Sort By:
      </label>
      <select
        id="sortDropdown"
        className="form-select w-auto font-weight-300"
        value={sortValue}
        onChange={event => handleSort(event.target.value)}
        style={{ borderRadius: '20px', maxWidth: '200px' }}
      >
        <option value="alphabetically">Alphabetically</option>
        <option value="dailyChange">Daily Change</option>
        <option value="rating">Rating</option>
        <option value="momentum">Momentum</option>
      </select>
    </div>
  );
};

SortDropdown.propTypes = {
  handleSort: PropTypes.func.isRequired,
  sortValue: PropTypes.string.isRequired
};

export default SortDropdown;
