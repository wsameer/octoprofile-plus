import React from 'react';
import PropTypes from 'prop-types';
import ProfileWidget from './ProfileWidget';
import AccountStats from './AccountStats';
import PersonalDetails from './PersonalDetails';
import Branding from './Branding';
import ListGroup from 'react-bootstrap/ListGroup';

const Sidenav = (props) => {

  return (
    <>
      <Branding
        hireable={props.userData.hireable}
      />

      <ProfileWidget
        userData={props.userData}
      />

      <AccountStats
        followers={props.userData.followers}
        following={props.userData.following}
        publicRepos={props.userData.public_repos}
      />

      <PersonalDetails
        createdAt={props.userData.created_at}
        email={props.userData.email}
        company={props.userData.company}
        blog={props.userData.blog}
        location={props.userData.location}
      />

      <hr />

      <ListGroup variant="flush" className="sidenav-footer col-sm-12">
        <ListGroup.Item>
          <i className="fa fa-ticket pr-3" aria-hidden="true"></i>
          <span>Support</span>
        </ListGroup.Item>
      </ListGroup>
    </>
  )
}

Sidenav.propTypes = {
  userData: PropTypes.object.isRequired
}

export default Sidenav
