import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Col, Row, Tabs, Tab } from 'react-bootstrap';
import Sidenav from '../components/shared/Sidenav';
import Repositories from '../components/Repositories';
import Analytics from '../components/Analytics';
import { mockUserData } from '../utils/mockdata';
import { mockRepoData } from '../utils/mockdata';
import Overview from '../components/Overview';

const Home = (props) => {
  const history = useHistory();
  const LIMIT = 60;
  const userName = props.location.state.id;

  // hooks
  const [userData, setUserData] = useState(null);
  // const [error, setError] = useState({});
  const [repoData, setRepoData] = useState(null);

  // async function fetchRepoData() {
  //   const url = `https://api.github.com/users/${userName}/repos?per_page=${LIMIT}`;
  //   const response = await fetch(url, {
  //     headers: new Headers({
  //       'Accept': 'application/vnd.github.mercy-preview+json'
  //     })
  //   });
  //   response
  //     .json()
  //     .then(res => {
  //       setRepoData(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  // async function fetchUserData() {
  //   const response = await fetch(`https://api.github.com/users/${userName}`);
  //   response
  //     .json()
  //     .then(res => {
  //       console.log(res);
  //       setUserData(res);
  //       fetchRepoData();
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  useEffect(() => {
    if (userName === '') {
      history.push('/');
    } else {
      // get data
      // fetchUserData();

      // mocks
      setUserData(mockUserData);
      setRepoData(mockRepoData);
    }
  }, []);

  if (userData == null || !repoData) {
    return <div>Loading...</div>
  };

  return (
    <>
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
              <Row className="analytics mt-4 m-2">
                <Analytics />
              </Row>
            </Tab>
          </Tabs>
        </Row>
      </Col>
    </>
  )
}

export default Home
