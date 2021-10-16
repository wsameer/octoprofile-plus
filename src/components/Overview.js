import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card } from 'react-bootstrap';
import RepoFooter from './repocard/RepoFooter';
import Topics from './repocard/Topics';
import Filters from './shared/Filters';
import { relativeTimeConvertor } from '../utils/commonfunctions';
import RepoDesc from './repocard/RepoDesc';

const Overview = ({ repoData }) => {
    const sortTypes = ['stars', 'forks', 'size'],
        viewTypes = ['grid', 'list'],
        LIMIT = 9;

    const [sortType, setSortType] = useState(sortTypes[0]),
        [topRepos, setTopRepos] = useState([]),
        [viewType, setViewType] = useState(viewTypes[0]);

    const sortRepos = useCallback(
            type => {
                if (!repoData || repoData.length === 0) {
                    return;
                }

                const sortMap = {
                    stars: 'stargazers_count',
                    forks: 'forks_count',
                    size: 'size'
                };

                const sortBy = sortMap[type];
                const sortedData = repoData
                    .filter(repo => !repo.fork)
                    .sort((a, b) => b[sortBy] - a[sortBy])
                    .slice(0, LIMIT);

                setTopRepos(sortedData);
            },
            [repoData, setTopRepos]
        ),
        changeViewType = value => setViewType(value || viewTypes[0]),
        changeSortType = value => setSortType(value || sortTypes[0]);

    useEffect(() => {
        sortRepos(sortType);
    }, [sortType, sortRepos]);

    if (!topRepos) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <Row className="repositories pt-4">
            <Col sm={12} className="mb-3">
                <h5 className="mt-1 float-left d-none d-md-block">
                    Top Repositories
                </h5>
                <h5 className="mb-3 d-block d-md-none text-center">
                    Top Repositories
                </h5>

                {/* Filters */}
                <Filters
                    sortTypes={sortTypes}
                    viewTypes={viewTypes}
                    sortType={sortType}
                    viewType={viewType}
                    changeSortType={changeSortType}
                    changeViewType={changeViewType}
                />
            </Col>

            {topRepos.length === 0 ? (
                <p>No repositories.</p>
            ) : (
                topRepos.map((repo, i) => (
                    <Col
                        sm={viewType === viewTypes[0] ? 4 : 12}
                        xs={viewType === viewTypes[0] ? 6 : 12}
                        key={i}
                        className="mb-4"
                    >
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <i
                                        className="fa fa-folder-open-o pr-2"
                                        aria-hidden="true"
                                    ></i>
                                    <a
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {repo.name}
                                    </a>
                                    {viewType === viewTypes[1] && (
                                        <small className="float-right">
                                            Updated{' '}
                                            {relativeTimeConvertor(
                                                repo.updated_at
                                            )}
                                        </small>
                                    )}
                                </Card.Title>

                                {repo.description && (
                                    <Card.Text
                                        title={repo.description}
                                        className={`text-semi-muted repo-desc ${
                                            viewType === viewTypes[0]
                                                ? 'height-50'
                                                : ''
                                        }`}
                                    >
                                        <RepoDesc
                                            description={repo.description}
                                            viewType={viewType}
                                        />
                                    </Card.Text>
                                )}

                                {repo.topics && viewType === viewTypes[1] && (
                                    <Topics topics={repo.topics} />
                                )}
                            </Card.Body>

                            <Card.Footer>
                                <RepoFooter
                                    viewType={viewType}
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
            )}
        </Row>
    );
};

Overview.propTypes = {
    repoData: PropTypes.array.isRequired
};

export default Overview;
