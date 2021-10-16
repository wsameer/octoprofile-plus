import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const Branding = ({ hireable, collapse, toggleCollapse }) => {
    return (
        <div className="branding col-md">
            <Link to="/">
                <img
                    className="brand-logo"
                    src="/github-plus.png"
                    alt="brand-logo"
                />
            </Link>

            <div className="d-block d-sm-none float-right hireable ml-3">
                <i
                    className={
                        (collapse ? 'fa fa-chevron-down' : 'fa fa-chevron-up') +
                        ' green'
                    }
                    onClick={toggleCollapse}
                    aria-hidden="true"
                />
            </div>

            <OverlayTrigger
                placement="left"
                overlay={
                    <Tooltip id="tooltip-disabled">
                        {hireable ? (
                            <span>Open for hire</span>
                        ) : (
                            <span>Not hireable</span>
                        )}
                    </Tooltip>
                }
            >
                <div className="hireable float-right">
                    <i
                        className={`fa fa-handshake-o ${
                            hireable ? 'green' : 'red'
                        }`}
                        aria-hidden="true"
                    />
                </div>
            </OverlayTrigger>
        </div>
    );
};

Branding.defaultProps = {
    hireable: false
};

Branding.propTypes = {
    hireable: PropTypes.bool,
    toggleCollapse: PropTypes.func,
    collapse: PropTypes.bool.isRequired
};

export default Branding;
