import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import brandLogo from '../../github-plus.png';
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const Branding = ({ hireable, collapse, toggleCollapse }) => {

  const hire = hireable
    ? <i className="fa fa-handshake-o green" aria-hidden="true"></i>
    : <i className="fa fa-handshake-o red" aria-hidden="true"></i>;

  return (
    <div className="branding col-md">
      <Link to="/">
        <img className="brand-logo" src={brandLogo} alt="brand-logo" />
      </Link>

      <div className="d-block d-sm-none float-right hireable ml-3">
        <i
          className={(collapse ? 'fa fa-chevron-down' : 'fa fa-chevron-up') + " green"}
          onClick={toggleCollapse}
          aria-hidden="true"
        />
      </div>

      <OverlayTrigger
        placement="left"
        overlay={
          <Tooltip id="tooltip-disabled">
            {hireable ? <span>Open for hire</span> : <span>Not hireable</span>}
          </Tooltip>
        }>
        <div className="hireable float-right">{hire}</div>
      </OverlayTrigger>
    </div>
  )
}

Branding.defaultProps = {
  hireable: false
};

Branding.propTypes = {
  hireable: PropTypes.bool.isRequired,
  toggleCollapse: PropTypes.func,
  collapse: PropTypes.bool.isRequired
};

export default Branding
