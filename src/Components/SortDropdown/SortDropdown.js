import PropTypes from 'prop-types';

const SortDropdown = ({ handleSort, sortValue }) => {

  return (
    <div className="d-flex justify-content-end align-items-center mt-3">
      <label htmlFor="sortDropdown" className="me-2 fw-bold">
        Sort By:
      </label>
      <select
        id="sortDropdown"
        className="form-select w-auto"
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
