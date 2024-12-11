import { isAboveAverage } from "../../../helperFunctions"
import PropTypes from "prop-types";

const InfoSection = ({data}) => {
    return (
        <>
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
                    <span className="text-muted small-text">Rating</span>
                    <span className={`small-text ${isAboveAverage(data) ? 'text-success' : 'text-danger'}`}>
                        {isAboveAverage(data) ? 'Above Average' : 'Below Average'}
                    </span>
                </div>
            </div>
        </>
    )
}

InfoSection.propTypes = {
    data: PropTypes.object.isRequired,
};

export default InfoSection