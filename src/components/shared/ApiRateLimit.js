import React from 'react'
import PropTypes from 'prop-types'

const ApiRateLimit = ({ apiRateLimit }) => {
  return (
    <div className="rate-limit text-center">
      {apiRateLimit && (
        <>
          <span>{`${apiRateLimit.remaining} / ${apiRateLimit.limit}`}</span>
          {' '}
          <span>requests left</span>
        </>
      )}
    </div>
  )
}

ApiRateLimit.propTypes = {
  apiRateLimit: PropTypes.object.isRequired
}

export default ApiRateLimit
