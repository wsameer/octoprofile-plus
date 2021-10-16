import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';
import { formatDate } from '../../utils/commonfunctions';

const PersonalDetails = ({ company, location, blog, createdAt, email }) => {
    return (
        <ListGroup variant="flush" className="personal-details">
            {company && (
                <ListGroup.Item>
                    <i className="fa fa-suitcase pr-3" aria-hidden="true"></i>
                    <span>{company}</span>
                </ListGroup.Item>
            )}
            {location && (
                <ListGroup.Item>
                    <i className="fa fa-map-marker pr-3" aria-hidden="true"></i>
                    <span>{location}</span>
                </ListGroup.Item>
            )}
            {email && (
                <ListGroup.Item>
                    <i className="fa fa-envelope-o pr-3" aria-hidden="true"></i>
                    <a
                        href={`mailto:${email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {email}
                    </a>
                </ListGroup.Item>
            )}
            {blog && (
                <ListGroup.Item>
                    <i className="fa fa-link pr-3" aria-hidden="true"></i>
                    <a href={blog} target="_blank" rel="noopener noreferrer">
                        {blog}
                    </a>
                </ListGroup.Item>
            )}
            <ListGroup.Item>
                <i className="fa fa-calendar pr-3" aria-hidden="true"></i>
                <span>{formatDate(createdAt)}</span>
            </ListGroup.Item>
        </ListGroup>
    );
};

PersonalDetails.propTypes = {
    createdAt: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    company: PropTypes.string,
    blog: PropTypes.string.isRequired,
    email: PropTypes.string
};

export default PersonalDetails;
