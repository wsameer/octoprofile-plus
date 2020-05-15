import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table } from 'react-bootstrap';
import PieChart from './charts/PieChart';

const Analytics = ({ languageStats }) => {
  const [analyticsData, setAnalyticsData] = useState([]);

  const convertMapToArray = () => {
    [...languageStats]
      .sort((a, b) => b[1] - a[1])
      .forEach(([key, value]) => {
        console.log(key + ' = ' + value);
        let objectToAdd = { key, value };
        setAnalyticsData(analyticsData => [...analyticsData, objectToAdd]);
      });
  }

  useEffect(() => {
    console.log(languageStats);
    convertMapToArray();
  }, [])

  return (
    <Row className="analytics pt-4">
      <Col sm={6} className="mb-3">
        <h5 className="mt-1 mb-2">Top Technologies</h5>
        {analyticsData.length && (
          <Table bordered hover variant="dark">
            <thead>
              <tr className="text-center">
                <th>#</th>
                <th>Technology</th>
                <th>Repo count</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.map((lang, index) => (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td className="text-left">{lang.key}</td>
                  <td className="text-right pr-3">{lang.value}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
      <Col sm={6} className="mb-3">
        {analyticsData.length && <PieChart chartData={analyticsData} />}
      </Col>
    </Row>
  )
}

Analytics.propTypes = {
  languageStats: PropTypes.object.isRequired
};

export default Analytics
