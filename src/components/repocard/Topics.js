import React from 'react';
import PropTypes from 'prop-types';
import Badge from 'react-bootstrap/Badge';

const Topics = ({ topics }) => {
    return (
        <>
            {topics.map((topic, index) => (
                <Badge key={index} pill className="badge-green">
                    {topic}
                </Badge>
            ))}
        </>
    );
};

Topics.propTypes = {
    topics: PropTypes.array.isRequired
};

export default Topics;
