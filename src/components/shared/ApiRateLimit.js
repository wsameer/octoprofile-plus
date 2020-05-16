import React from 'react'
import PropTypes from 'prop-types'

const ApiRateLimit = ({ apiRateLimit }) => {
  return (
    <div className="rate-limit text-right">
      {apiRateLimit && (
        <>
          <span>{`${apiRateLimit.remaining} / ${apiRateLimit.limit}`}</span>
          <br />
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
