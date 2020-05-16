import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const PieChart = ({ chartData }) => {
  useEffect(() => {
    // console.table(chartData);
  }, []);

  return (
    <h3>Coming soon.</h3>
  )
};

PieChart.propTypes = {
  chartData: PropTypes.array.isRequired
};

export default PieChart
