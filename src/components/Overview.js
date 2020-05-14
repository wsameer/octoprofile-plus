import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card } from 'react-bootstrap';
import RepoFooter from './repocard/RepoFooter';

const Overview = ({ repoData }) => {
  const sortTypes = ['stars', 'forks', 'size'];
  const LIMIT = 9;

  // hooks
  const [sortType, setSortType] = useState(sortTypes[0]);
  const [topRepos, setTopRepos] = useState([]);

  const sortRepos = (type) => {
    if (!repoData || repoData.length === 0) {
      return;
    }

    const sortMap = {
      stars: 'stargazers_count',
      forks: 'forks_count',
      size: 'size',
    };

    const sortBy = sortMap[type];
    const sortedData = repoData
      .filter(repo => !repo.fork || !repo.description)
      .sort((a, b) => b[sortBy] - a[sortBy])
      .slice(0, LIMIT);
    console.log(sortedData);
    setTopRepos(sortedData);
  };

  useEffect(() => {
    sortRepos(sortType);
  }, [sortType])


  if (!topRepos) {
    return <div className="text-center">Loading...</div>
  }

  return (
    <Row className="repositories pt-4 m-2">
      <Col sm={12} className="mb-3">
        <h5>Top Repositories</h5>
      </Col>

      {topRepos.length === 0
        ? <p>No repositories.</p>
        : topRepos.map((repo, i) => (
          <Col sm={4} key={i} className="pl-3 pr-1 mb-4">
            <Card>
              <Card.Body>
                <Card.Title>
                  <i className="fa fa-folder-open-o pr-2" aria-hidden="true"></i>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer">
                    {repo.name}
                  </a>
                </Card.Title>
                <Card.Text className="text-semi-muted repo-desc height-50">{repo.description}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <RepoFooter
                  size={repo.size}
                  stargazersCount={repo.stargazers_count}
                  language={repo.language}
                  forksCount={repo.forks_count}
                  stargazersUrl={repo.stargazers_url}
                  forksUrl={repo.forks_url}
                />
              </Card.Footer>
            </Card>
          </Col>
        ))
      }
    </Row>
  )
};

Overview.propTypes = {
  repoData: PropTypes.array.isRequired
};

export default Overview;