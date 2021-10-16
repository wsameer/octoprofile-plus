import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RepoCard from './repocard/RepoCard';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';

const Repositories = ({ repoData }) => {
    const LIMIT = 6;

    const [hideLoadMore, setHideLoadMore] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(LIMIT);

    const loadMoreRepos = () => {
        setItemsPerPage(prevLimit => prevLimit + LIMIT);
        if (itemsPerPage > repoData.length) {
            setHideLoadMore(true);
            return;
        }
    };

    if (!repoData) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <Row className="repositories pt-4">
            {repoData.length > 0 ? (
                repoData
                    .slice(0, itemsPerPage)
                    .map((e, i) => <RepoCard key={i} repo={e} />)
            ) : (
                <p>No repositories.</p>
            )}

            <Col sm={12} className="text-center mb-3 mt-2">
                {!hideLoadMore && (
                    <Button className="load-more-btn" onClick={loadMoreRepos}>
                        Load more
                    </Button>
                )}
            </Col>
        </Row>
    );
};

Repositories.propTypes = {
    repoData: PropTypes.array.isRequired
};

export default Repositories;
