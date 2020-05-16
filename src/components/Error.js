import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Error = ({ error }) => {
  return (
    <>
      {error && (
        <div className="mt-5 text-center">
          {error.type === 403
            ? (
              <p>
                Oh no, you hit the{' '}
                <a
                  href="https://developer.github.com/v3/#rate-limiting"
                  target="_blank"
                  rel="noopener noreferrer">
                  rate limit
                </a>
                ! Try again later.
              </p>
            )
            : error.type === 404
              ? (
                <div className="text-center">
                  <h1>User not found!</h1>
                </div>
              )
              : (<p>Oh no! Something went wrong. Try again later!</p>)
          }
          <Link to="/">
            <Button variant="success" className="mt-3">Go home</Button>
          </Link>
        </div>
      )}
    </>
  )
}

Error.propTypes = {
  error: PropTypes.object.isRequired
};

export default Error
