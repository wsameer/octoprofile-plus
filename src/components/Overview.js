import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Card,
  ButtonToolbar,
  Button,
  ButtonGroup,
  InputGroup,
  FormControl
} from 'react-bootstrap';
import RepoFooter from './repocard/RepoFooter';
import Topics from './repocard/Topics';

const Overview = ({ repoData }) => {
  const sortTypes = ['stars', 'forks', 'size'];
  const viewTypes = ['grid', 'list'];
  const LIMIT = 9;

  // hooks
  const [sortType, setSortType] = useState(sortTypes[0]);
  const [topRepos, setTopRepos] = useState([]);
  const [viewType, setViewType] = useState(viewTypes[0]);

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
    setTopRepos(sortedData);
  };

  useEffect(() => {
    sortRepos(sortType);
  }, [sortType])


  if (!topRepos) {
    return <div className="text-center">Loading...</div>
  }

  return (
    <Row className="repositories pt-4">
      <Col sm={12} className="mb-3">
        <h5 className="mt-1 float-left">Top Repositories {viewType}</h5>

        {/* Filters */}
        <ButtonToolbar 
          className="filters float-right mb-3" 
          aria-label="Filter controls for the repos">
          <ButtonToolbar aria-label="Filter controls for the repos">
            <ButtonGroup aria-label="view as group" className="">
              <Button variant="secondary"
                className={viewType === viewTypes[1] ? 'active' : ''}
                onClick={() => setViewType(viewTypes[1])}>
                <i className="fa fa-list-ul" aria-hidden="true"></i>
              </Button>
              <Button variant="secondary"
                className={viewType === viewTypes[0] ? 'active' : ''}
                onClick={() => setViewType(viewTypes[0])}>
                <i className="fa fa-th" aria-hidden="true"></i>
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
          <InputGroup className="pl-4">
            <FormControl
              type="text"
              placeholder="Input group example"
              aria-label="Input group example"
              aria-describedby="btnGroupAddon"
            />
          </InputGroup>
        </ButtonToolbar>
      </Col>

      {topRepos.length === 0
        ? <p>No repositories.</p>
        : topRepos.map((repo, i) => (
          <Col
            sm={viewType === viewTypes[0] ? 4 : 12} key={i}
            className="pl-3 pr-1 mb-4">
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
                <Card.Text
                  className={`text-semi-muted repo-desc ${viewType === viewTypes[0] ? 'height-50' : ''}`}>
                  {repo.description}
                </Card.Text>
                {(repo.topics && viewType === viewTypes[1]) && <Topics topics={repo.topics} />}
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