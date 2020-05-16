import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CanvasJSReact from '../../assets/canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PieChart = ({ chartData }) => {

  const [showChart, setShowChart] = useState(false);

  const options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Language Distribution"
    },
    data: [{
      type: "pie",
      startAngle: 75,
      toolTipContent: "<b>{label}</b>: {y}%",
      showInLegend: "true",
      legendText: "{label}",
      indexLabelFontSize: 16,
      indexLabel: "{label} - {y}%",
      dataPoints: []
    }]
  }

  useEffect(() => {
    // console.table(chartData);
    if (chartData) {
      chartData.forEach(element => {
        options.data[0].dataPoints.push({ y: element.value, label: element.key });
      });
      setShowChart(true);
    }
  }, []);

  return (
    <>
      {!showChart
        ? (<h1> Loading... </h1>)
        : (<CanvasJSChart options={options} />)
      }
    </>
  )
};

PieChart.propTypes = {
  chartData: PropTypes.array.isRequired
};

export default PieChart
