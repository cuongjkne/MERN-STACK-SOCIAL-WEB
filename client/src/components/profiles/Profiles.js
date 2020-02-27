import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';
const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, []);

  const allProfiles = profiles.map((profile) => (
    <ProfileItem key={profile._id} profile={profile} />
  ));

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 class='large text-primary'>Developers</h1>
      <p class='lead'>
        <i class='fab fa-connectdevelop'></i> Browse and connect with developers
      </p>
      <div class='profiles'>
        {profiles.length > 0 ? allProfiles : <h4>No profiles found...</h4>}
      </div>
    </Fragment>
  );
};

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
