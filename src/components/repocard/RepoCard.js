import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import RepoFooter from './RepoFooter';
import Topics from './Topics';

const RepoCard = ({ repo }) => {
    return (
        <Col sm={12} className="mb-3">
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
                    </Card.Title>
                    {repo.description && (
                        <Card.Text className="text-semi-muted repo-desc">
                            {repo.description}
                        </Card.Text>
                    )}
                    {repo.topics && <Topics topics={repo.topics} />}
                </Card.Body>
                <Card.Footer>
                    <RepoFooter
                        updatedAt={repo.updated_at}
                        stargazersCount={repo.stargazers_count}
                        language={repo.language}
                        forksCount={repo.forks_count}
                        stargazersUrl={repo.stargazers_url}
                        forksUrl={repo.forks_url}
                    />
                </Card.Footer>
            </Card>
        </Col>
    );
};

RepoCard.propTypes = {
    repo: PropTypes.object.isRequired
};

export default RepoCard;
