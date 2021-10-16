import React from 'react';
import PropTypes from 'prop-types';

const mapStatusToIcon = status => {
    switch (status) {
        case 'none':
            return '✅';
        case 'minor':
            return '⚠️';
        case 'major':
            return '❌';
        case 'critical':
        default:
            return '☠️';
    }
};

const ApiStatus = ({ apiRateLimit, apiStatus }) => {
    return (
        <div className="api-status text-center">
            <span>{`${apiRateLimit.remaining} / ${apiRateLimit.limit}`}</span>{' '}
            <span>requests left</span>
            <div>
                <span role="img" aria-label={apiStatus.description}>
                    {mapStatusToIcon(apiStatus.indicator)}
                </span>{' '}
                <span>{apiStatus.description}</span>
            </div>
        </div>
    );
};

ApiStatus.propTypes = {
    apiRateLimit: PropTypes.object.isRequired,
    apiStatus: PropTypes.object.isRequired
};

export default ApiStatus;
