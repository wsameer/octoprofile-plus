import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Row, Tabs, Tab } from 'react-bootstrap';
import { Repositories, Analytics, Overview, Error } from '../components';
import { Sidenav, ApiStatus, BusyIndicator } from '../components/shared';

// import { mockUserData, mockRepoData } from '../utils/mockdata';
// const mockLimit = { limit: "60", remaining: "47", reset: "1591507162" };

const HTTP_HEADERS = {
    headers: new Headers({
        Accept: 'application/vnd.github.mercy-preview+json'
    })
};

const Profile = props => {
    const history = useHistory();
    const LIMIT = 100;
    const userName = props.location.state.id;

    const [error, setError] = useState({ active: false, type: 200 });
    const [userData, setUserData] = useState(null);
    const [repoData, setRepoData] = useState(null);
    const [apiRateLimit, setApiRateLimit] = useState(null);
    const [apiStatus, setApiStatus] = useState(null);

    const fetchRepoData = useCallback(async () => {
        const response = await fetch(
            `https://api.github.com/users/${userName}/repos?sort=pushed&per_page=${LIMIT}`,
            HTTP_HEADERS
        );

        setApiRateLimit({
            limit: response.headers.get('X-Ratelimit-Limit'),
            remaining: response.headers.get('X-Ratelimit-Remaining'),
            reset: response.headers.get('X-Ratelimit-Reset')
        });

        if (response.status === 200) {
            response
                .json()
                .then(res => {
                    setRepoData(res);
                })
                .catch(err => {
                    setError({ active: true, type: 400 });
                });
        } else {
            setError({ active: true, type: response.status });
        }
    }, [setApiRateLimit, userName]);

    const fetchGitHubUser = useCallback(async () => {
        const response = await fetch(
            `https://api.github.com/users/${userName}`,
            HTTP_HEADERS
        );

        // capture headers
        setApiRateLimit({
            limit: response.headers.get('X-Ratelimit-Limit'),
            remaining: response.headers.get('X-Ratelimit-Remaining'),
            reset: response.headers.get('X-Ratelimit-Reset')
        });

        if (response.status === 200) {
            response
                .json()
                .then(res => setUserData(res))
                .catch(err => {
                    setError({ active: true, type: 400 });
                });
        } else {
            setError({ active: true, type: response.status });
        }
    }, [setApiRateLimit, setError, userName]);

    const fetchApiStatus = useCallback(async () => {
        const response = await fetch(
            'https://www.githubstatus.com/api/v2/status.json'
        );

        response
            .json()
            .then(({ status }) => setApiStatus(status))
            .catch(err => {
                setError({ active: true, type: response.status });
                setApiStatus({
                    indicator: 'critical',
                    description: 'Unable to get status'
                });
            });
    }, [setApiStatus]);

    // Doesn't work due to CORS restrictions :(
    // async function fetchGitHubApiLimit() {
    //   const response = await fetch(`https://api.github.com/rate_limit`, HTTP_HEADERS);
    //   response
    //     .json()
    //     .then(json => {
    //       setApiRateLimit(json.resources.core);
    //       if (json.resources.core.remaining < 1) {
    //         setError({ active: true, type: 403 });
    //       }
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // }

    useEffect(() => {
        if (userName === '') {
            history.push('/');
        } else {
            // gives errors even in PROD too
            // if (process.env.NODE_ENV === 'production') {
            // fetchGitHubApiLimit();
            // }

            // get data
            fetchApiStatus();
            fetchGitHubUser();
            fetchRepoData();

            // // mocks
            // setUserData(mockUserData);
            // setRepoData(mockRepoData);
            // setApiRateLimit({
            //   limit: mockLimit.limit,
            //   remaining: mockLimit.remaining - 2,
            //   reset: mockLimit.reset
            // });
        }
    }, [fetchApiStatus, fetchGitHubUser, fetchRepoData, history, userName]);

    if (error && error.active) {
        return (
            <Col sm={12}>
                <Error error={error} />
            </Col>
        );
    }

    if (userData == null || !repoData) {
        return <BusyIndicator />;
    }

    return (
        <>
            {apiRateLimit && apiStatus && (
                <ApiStatus apiRateLimit={apiRateLimit} apiStatus={apiStatus} />
            )}
            <Col sm={3} className="sidenav">
                <Sidenav userData={userData} />
            </Col>
            <Col sm={9} className="dashboard">
                <Row className="p-0">
                    <Tabs defaultActiveKey="overview" id="gp-tabs">
                        <Tab eventKey="overview" title="Overview">
                            <Overview repoData={repoData} />
                        </Tab>
                        <Tab eventKey="repositories" title="Repositories">
                            <Repositories repoData={repoData} />
                        </Tab>
                        <Tab eventKey="analytics" title="Analytics">
                            <Analytics repoData={repoData} />
                        </Tab>
                    </Tabs>
                </Row>
            </Col>
        </>
    );
};

export default Profile;
