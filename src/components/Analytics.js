import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table } from "react-bootstrap";
import PieChart from './charts/PieChart';

const Analytics = ({ repoData }) => {
  // hooks
  const [analyticsData, setAnalyticsData] = useState([]);

  const convertMapToArray = (data) => {
    [...data]
      .sort((a, b) => b[1] - a[1])
      .forEach(([key, value]) => {
        let objectToAdd = { key, value };
        setAnalyticsData(analyticsData => [...analyticsData, objectToAdd]);
      });
  }

  const extractLanguages = () => {
    const languageMap = new Map();
    for (let index = 0; index < repoData.length; index++) {
      const repo = repoData[index];
      if (repo.language) {
        languageMap.get(repo.language)
          ? languageMap.set(repo.language, languageMap.get(repo.language) + 1)
          : languageMap.set(repo.language, 1)
      }
    }
    return languageMap;
  }

  useEffect(() => {
    convertMapToArray(extractLanguages());
  }, []);

  return (
    <Row className="analytics pt-4">
      <Col sm={6} className="mb-3">
        <h5 className="mt-1 mb-2">Top Technologies</h5>
        {analyticsData.length && (
          <Table bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Technologoy</th>
                <th>Repositories</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.length === 0
                ? (<tr><td>No data to show</td></tr>)
                : (analyticsData.map((lang, index) => (
                  <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td className="text-left">{lang.key}</td>
                    <td className="text-right pr-3">{lang.value}</td>
                  </tr>
                )))
              }
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
  repoData: PropTypes.array.isRequired
}

export default Analytics
