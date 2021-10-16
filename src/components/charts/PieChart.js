import React from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import LANG_COLORS from '../../utils/langColors';

const PieChart = ({ chartData }) => {
    const getColors = () => {
        return chartData.map(({ key }) => LANG_COLORS[key]);
    };

    const pieChartConfig = {
        data: {
            labels: chartData.map(lang => lang.key),
            datasets: [
                {
                    data: chartData.map(lang => lang.value),
                    backgroundColor: getColors(),
                    hoverBackgroundColor: getColors()
                }
            ]
        },
        options: {
            responsive: true
        },
        legendOptions: {
            display: true,
            position: 'right',
            fullWidth: true,
            reverse: false,
            labels: {
                fontColor: 'rgb(255, 99, 132)'
            }
        }
    };

    const pieChartError = !(chartData && chartData.length > 0);

    return (
        <>
            {pieChartError && <p>Nothing to see here!</p>}
            <Doughnut
                data={pieChartConfig.data}
                options={pieChartConfig.options}
                legend={pieChartConfig.legendOptions}
            />
        </>
    );
};

PieChart.propTypes = {
    chartData: PropTypes.array.isRequired
};

export default PieChart;
