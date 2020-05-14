import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Header = (props) => {
  return (
    <Row className="header d-block d-sm-none">
      <Col sm={12}>
        This is the header
      </Col>
    </Row>
  )
}

export default Header
