import React, { useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import logo from '../github-plus.png';
import { useHistory } from 'react-router-dom';

const Start = (props) => {
  const history = useHistory()
  const [userName, setUserName] = useState('');

  const handleChange = event => setUserName(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userName !== '') {
      history.push({
        pathname: '/home',
        state: {
          id: userName
        }
      });
    }
  };

  return (
    <Col md={{ span: 4, offset: 4 }}
      className="start text-center mt-5">
      <img
        className="mb-4"
        src={logo}
        alt="Logo"
        height="120"
      />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label className="mb-4">
            Enter a GitHub user name
          </Form.Label>
          <Form.Control
            type="text"
            autoFocus
            value={userName}
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
    </Col>
  )
}

export default Start

