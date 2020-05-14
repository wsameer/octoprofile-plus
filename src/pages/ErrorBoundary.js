import React from 'react'
import PropTypes from 'prop-types'

const ErrorBoundary = props => {
  return (
    <div>
      {props.message}
    </div>
  )
}

ErrorBoundary.propTypes = {
  message: PropTypes.string
}

export default ErrorBoundary
