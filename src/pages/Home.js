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
  const languageMap = new Map();

  // hooks
  const [languageStats, setLanguageStats] = useState(languageMap);
  const [userData, setUserData] = useState(null);
  // const [error, setError] = useState({});
  const [repoData, setRepoData] = useState(null);

  // TODO: For future 
  // const mapTopics = new Map();
  // const calculateTopicStats = (repo) => {
  //   repo.forEach(element => {
  //     // check if key exists in map
  //     if (mapTopics.get(element)) {
  //       mapTopics.set(element, mapTopics.get(element) + 1);
  //     } else {
  //       mapTopics.set(element, 1)
  //     }
  //   });
  //   // console.log(mapTopics);
  // };

  const calculateLanguageStats = (repo) => {
    if (!repo) {
      return false;
    }

    return languageMap.get(repo)
      ? languageMap.set(repo, languageMap.get(repo) + 1)
      : languageMap.set(repo, 1);
  };

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
        for (let index = 0; index < repos.length; index++) {
          const repo = repos[index];
          if (repo.language) {
            console.log(repo.language);
            setLanguageStats(calculateLanguageStats(repo.language));
          }
        }
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
        console.log(res);
        setUserData(res);
        fetchRepoData();
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

      // mocks
      // for (let index = 0; index < mockRepoData.length; index++) {
      //   const repo = mockRepoData[index];
      //   setLanguageStats(calculateLanguageStats(repo.language));
      // }
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
              <Analytics languageStats={languageStats} />
            </Tab>
          </Tabs>
        </Row>
      </Col>
    </>
  )
}

export default Home
