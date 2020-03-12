import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const ProfileEdu = ({
  edu: { school, degree, fieldofstudy, from, to, description, current },
}) => {
  return (
    <div>
      <h3>{school}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> -{' '}
        {current ? 'Now' : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </p>
      <p>
        <strong>Degree: </strong>
        {degree}
      </p>
      <p>
        <strong>Field Of Study: </strong>
        {fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    </div>
  );
};

ProfileEdu.propTypes = {
  edu: PropTypes.object.isRequired,
};

export default ProfileEdu;
