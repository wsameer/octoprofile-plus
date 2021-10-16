import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

const AccountStats = ({ publicRepos, followers, following }) => {
    return (
        <Row className="account-stats text-center">
            <Col className="stats">
                <span>{publicRepos}</span>
                <p>Repositories</p>
            </Col>
            <Col className="stats">
                <span>{followers}</span>
                <p>Followers</p>
            </Col>
            <Col className="stats">
                <span>{following}</span>
                <p>Following</p>
            </Col>
        </Row>
    );
};

AccountStats.propTypes = {
    following: PropTypes.number.isRequired,
    followers: PropTypes.number.isRequired,
    publicRepos: PropTypes.number.isRequired
};

export default AccountStats;
