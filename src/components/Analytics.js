import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table } from 'react-bootstrap';
import PieChart from './charts/PieChart';
import { convertMapToArray } from '../utils/convertMapToArray';

const Analytics = ({ repoData }) => {
    const [analyticsData, setAnalyticsData] = useState([]),
        extractLanguages = useCallback(() => {
            const languageMap = new Map();
            for (let index = 0; index < repoData.length; index++) {
                const repo = repoData[index];
                if (repo.language) {
                    languageMap.get(repo.language)
                        ? languageMap.set(
                              repo.language,
                              languageMap.get(repo.language) + 1
                          )
                        : languageMap.set(repo.language, 1);
                }
            }
            return languageMap;
        }, [repoData]);

    useEffect(() => {
        const convertedData = convertMapToArray(extractLanguages());
        setAnalyticsData(analyticsData => [...analyticsData, ...convertedData]);
    }, [extractLanguages]);

    return (
        <Row className="analytics pt-4">
            <h5 className="mt-0 mb-4 col-12">Top Languages</h5>
            <Col sm={6} className="mb-3">
                {analyticsData.length && (
                    <Table bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Language</th>
                                <th>Repositories</th>
                            </tr>
                        </thead>
                        <tbody>
                            {analyticsData.length === 0 ? (
                                <tr>
                                    <td>No data to show</td>
                                </tr>
                            ) : (
                                analyticsData.map((lang, index) => (
                                    <tr key={index + 1}>
                                        <td>{index + 1}</td>
                                        <td className="text-left">
                                            {lang.key}
                                        </td>
                                        <td className="text-right pr-3">
                                            {lang.value}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                )}
            </Col>
            <Col sm={6} className="mb-3 bg-lite-dark">
                {analyticsData && <PieChart chartData={analyticsData} />}
            </Col>
        </Row>
    );
};

Analytics.propTypes = {
    repoData: PropTypes.array.isRequired
};

export default Analytics;
