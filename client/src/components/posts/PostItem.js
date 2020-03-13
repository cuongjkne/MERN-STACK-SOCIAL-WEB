import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

//ACTION
import { likePost, deletePost } from '../../actions/post';

const PostItem = ({
  post: { _id, user, name, text, avatar, likes, comments, date },
  auth,
  likePost,
  deletePost,
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="img" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/DD/MM">{new Date(date)}</Moment>
        </p>
        <button
          type="button"
          className="btn btn-light"
          onClick={() => likePost(_id)}
        >
          <i className="fas fa-thumbs-up"></i> <span>{likes.length}</span>
        </button>

        <Link to="/" className="btn btn-primary">
          Discussion <span className="comment-count">{comments.length}</span>
        </Link>
        {user === auth.user._id ? (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => deletePost(_id)}
          >
            <i className="fas fa-times"></i>
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {};
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { likePost, deletePost })(PostItem);
