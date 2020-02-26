import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <Fragment>
      <Link to='/edit-profile' className='btn btn-primary my-1'>
        <i className='fa fa-user-circle' aria-hidden='true'></i> Edit profile
      </Link>
      <Link to='/add-experience' className='btn btn-primary my-1'>
        <i className='fa fa-briefcase' aria-hidden='true'></i> Add experience
      </Link>
      <Link to='/add-education' className='btn btn-primary my-1'>
        <i className='fa fa-graduation-cap' aria-hidden='true'></i> Add
        education
      </Link>
    </Fragment>
  );
};

export default DashboardActions;
