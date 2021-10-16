import React, { useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import ProfileWidget from './ProfileWidget';
import AccountStats from './AccountStats';
import PersonalDetails from './PersonalDetails';
import Branding from './Branding';
import ListGroup from 'react-bootstrap/ListGroup';

const Sidenav = ({ userData }) => {
    const [collapse, setCollapse] = useState(true);

    const toggleCollapse = () => {
        if (window.innerWidth > 575) {
            return setCollapse(true);
        }
        return setCollapse(prevState => !prevState);
    };

    const handleWindowResizeEvent = () => {
        if (window.innerWidth > 575) {
            setCollapse(true);
        }
    };

    useLayoutEffect(() => {
        window.addEventListener('resize', handleWindowResizeEvent);
        handleWindowResizeEvent();
        return () => {
            window.removeEventListener('resize', handleWindowResizeEvent);
        };
    }, []);

    return (
        <>
            <Branding
                hireable={userData.hireable}
                toggleCollapse={toggleCollapse}
                collapse={collapse}
            />

            <div className={'collapse' + (collapse ? ' in' : '')}>
                <ProfileWidget userData={userData} />

                <AccountStats
                    followers={userData.followers}
                    following={userData.following}
                    publicRepos={userData.public_repos}
                />

                <PersonalDetails
                    createdAt={userData.created_at}
                    email={userData.email}
                    company={userData.company}
                    blog={userData.blog}
                    location={userData.location}
                />

                <hr />

                <ListGroup variant="flush" className="sidenav-footer col-sm-12">
                    <ListGroup.Item>
                        <i className="fa fa-ticket pr-3" aria-hidden="true"></i>
                        <a href="mailto:dev.wsameer@gmail.com">
                            <span>Support</span>
                        </a>
                    </ListGroup.Item>
                </ListGroup>
            </div>
        </>
    );
};

Sidenav.propTypes = {
    userData: PropTypes.object.isRequired
};

export default Sidenav;
