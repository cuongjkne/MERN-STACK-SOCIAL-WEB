import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getProfileById } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileEx from './ProfileEx';
import ProfileEdu from './ProfileEdu';
import GitRe from './GitRe';

const Profile = ({
  match,
  auth,
  profile: { profile, loading },
  getProfileById,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match]);

  return profile === null || loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/profiles" className="btn btn-light">
        Back To Profiles
      </Link>
      {auth.isAuthenticated &&
        !auth.loading &&
        auth.user._id === profile.user._id && (
          <Link to="/edit-profile" className="btn btn-dark">
            Edit Profile
          </Link>
        )}
      <div className="profile-grid my-1">
        <ProfileTop profile={profile} />
        <ProfileAbout profile={profile} />
        {/* Experience */}
        <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>

          {profile.experience.length > 0 ? (
            <Fragment>
              {profile.experience.map(exp => (
                <ProfileEx key={exp._id} exp={exp} />
              ))}
            </Fragment>
          ) : (
            <h4>No experience </h4>
          )}
        </div>
        {/* Education */}
        <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Education</h2>
          {profile.education.length > 0 ? (
            <Fragment>
              {profile.education.map(edu => (
                <ProfileEdu key={edu._id} edu={edu} />
              ))}
            </Fragment>
          ) : (
            <h4>No education </h4>
          )}
        </div>

        {/* <!-- Github --> */}
        {profile.githubusername && <GitRe username={profile.githubusername} />}
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getProfileById })(Profile);
