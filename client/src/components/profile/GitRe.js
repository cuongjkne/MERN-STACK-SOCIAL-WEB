import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRepos } from '../../actions/profile';

const GitRe = ({ username, getRepos, repos }) => {
  useEffect(() => {
    getRepos(username);
  }, [getRepos, username]);
  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">
        <i className="fab fa-github"></i> Github Repos
      </h2>
      {repos.length > 0 ? (
        <Fragment>
          {repos.map(repo => (
            <div key={repo.id} className="repo bg-white p-1 my-1">
              <div>
                <h4>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.name}
                  </a>
                </h4>
                <p>{repo.description}</p>
              </div>
              <div>
                <ul>
                  <li className="badge badge-primary">
                    {repo.stargazers_count}
                  </li>
                  <li className="badge badge-dark">{repo.watchers_count}</li>
                  <li className="badge badge-light">{repo.forks_count}</li>
                </ul>
              </div>
            </div>
          ))}
        </Fragment>
      ) : (
        'No repos'
      )}
    </div>
  );
};

GitRe.propTypes = {
  repos: PropTypes.array.isRequired,
  getRepos: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  repos: state.profile.repos,
});
export default connect(mapStateToProps, { getRepos })(GitRe);
