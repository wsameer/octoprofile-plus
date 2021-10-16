import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const ProfileWidget = ({ userData }) => {
    return (
        <div className="profile-widget text-center">
            <Card>
                <Card.Body>
                    <img
                        className="img-lg mb-3"
                        src={userData.avatar_url}
                        alt="display pic"
                    />
                    <h4>{userData.name}</h4>
                    <a
                        href={userData.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        @{userData.login}
                    </a>
                    <p className="mb-0 bio">{userData.bio}</p>
                </Card.Body>
            </Card>
        </div>
    );
};

ProfileWidget.propTypes = {
    userData: PropTypes.object.isRequired
};

export default ProfileWidget;
