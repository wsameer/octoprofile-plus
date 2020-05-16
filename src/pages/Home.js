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
  const LIMIT = 100;
  const userName = props.location.state.id;

  // hooks
  const [userData, setUserData] = useState(null);
  const [repoData, setRepoData] = useState(null);

  async function fetchRepoData() {
    const url = `https://api.github.com/users/${userName}/repos?sort=pushed&per_page=${LIMIT}`;
    const response = await fetch(url, {
      headers: new Headers({
        'Accept': 'application/vnd.github.mercy-preview+json'
      })
    });
    response
      .json()
      .then((repos) => {
        setRepoData(repos);
      })
      .catch(err => {
        console.log(err);
      });
  }

  async function fetchUserData() {
    const response = await fetch(`https://api.github.com/users/${userName}`);
    response
      .json()
      .then(res => {
        setUserData(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (userName === '') {
      history.push('/');
    } else {
      // get data
      fetchUserData();
      fetchRepoData();

      // mocks
      // setUserData(mockUserData);
      // setRepoData(mockRepoData);
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
              <Analytics repoData={repoData} />
            </Tab>
          </Tabs>
        </Row>
      </Col>
    </>
  )
}

export default Home
