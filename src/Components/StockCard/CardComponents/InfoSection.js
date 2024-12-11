import { isAboveAverage } from "../../../helperFunctions"
import PropTypes from "prop-types";

const InfoSection = ({data}) => {
    return (
        <>
            <div className="d-flex align-items-center justify-content-between border py-2 px-5 mb-2">
                <div className="d-flex justify-content-center">
                    <i className="bi bi-info-circle text-center text-success fs-3 me-3"></i>
                </div>
                <div className="d-flex flex-column align-items-end">
                    <span className="text-muted small-text">MA</span>
                    <span className="font-weight-300">{data?.average}</span>
                </div>
            </div>
            
            <div className="d-flex align-items-center justify-content-between border p-2 px-5 mb-2">
                <div className="d-flex justify-content-center">
                    <i className={`bi fs-3 ${data?.changePercent >= 0 ? 'bi-arrow-up-circle' : 'bi-arrow-down-circle'} text-${data?.changePercent >= 0 ? 'success' : 'danger'} me-3`}></i> {/* Icon */}
                </div>
                <div className="d-flex flex-column align-items-end">
                    <span className="text-muted small-text">Change</span>
                    <span className={` ${data?.changePercent >= 0 ? 'text-success' : 'text-danger'}`}>{data?.changePercent}%</span>
                </div>
            </div>

            <div className="d-flex align-items-center justify-content-between border p-2 px-5 mb-2">
                <div className="d-flex justify-content-center">
                    <i 
                        className={`bi text-center fs-3 ${isAboveAverage(data) ? 'bi-hand-thumbs-up text-success' : 'bi-hand-thumbs-down text-danger'} 
                        me-3`} 
                    ></i>
                </div>
                <div className="d-flex flex-column align-items-end">
                    <span className="text-muted small-text">Rating</span>
                    <span className={`small-text ${isAboveAverage(data) ? 'text-success' : 'text-danger'}`}>
                        {isAboveAverage(data) ? 'Above Avg' : 'Below Avg'}
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