import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Error = ({ error }) => {
    return (
        <>
            {error && (
                <div className="mt-5 text-center">
                    {error.type === 403 ? (
                        <p className="pt-5">
                            Oops! We have reached the{' '}
                            <a
                                href="https://developer.github.com/v3/#rate-limiting"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                rate limit
                            </a>
                            ! Try again later. ¯\_(ツ)_/¯
                        </p>
                    ) : error.type === 404 ? (
                        <div className="text-center pt-5">
                            <h1>Sorry!</h1>
                            <h2>We couldn't find that user.</h2>
                        </div>
                    ) : (
                        <p>
                            {' '}
                            :-( Internal Server Error. Please try after some
                            time!
                        </p>
                    )}
                    <Link to="/">
                        <Button variant="success" className="mt-3">
                            Go home
                        </Button>
                    </Link>
                </div>
            )}
        </>
    );
};

Error.propTypes = {
    error: PropTypes.object.isRequired
};

export default Error;
