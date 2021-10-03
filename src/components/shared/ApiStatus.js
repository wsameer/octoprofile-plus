import React from 'react'
import PropTypes from 'prop-types'

const ApiStatus = ({ apiRateLimit,apiStatus }) => {
  return (
    <div className="api-status text-center">
      <span>{`${apiRateLimit.remaining} / ${apiRateLimit.limit}`}</span>
      {' '}
      <span>requests left</span>
      <div>
        {apiStatus.indicator === "none"
        ? <span role="img" aria-label="operational">✅</span>
        : <span role="img" aria-label="not operational">❌</span>
        }
      {' '}
      <span>{apiStatus.description}</span>
      </div>
    </div>
  )
}

ApiStatus.propTypes = {
  apiRateLimit: PropTypes.object.isRequired,
  apiStatus: PropTypes.object.isRequired
}

export default ApiStatus
