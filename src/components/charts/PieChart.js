import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const PieChart = ({ chartData }) => {
  return (
    <div>
      <p>Chart will be shown here</p>
    </div>
  )
};

PieChart.propTypes = {
  chartData: PropTypes.array.isRequired
};

export default PieChart
