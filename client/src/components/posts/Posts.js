import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
//ACTION
import { getPosts, createPost } from '../../actions/post';

const Posts = ({ getPosts, createPost, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  const [textPost, setText] = useState('');

  const onChange = e => {
    setText(e.target.value);
  };
  const onSubmit = e => {
    e.preventDefault();
    createPost(textPost);
    setText('');
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community!
      </p>

      <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form className="form my-1" onSubmit={e => onSubmit(e)}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Write something here..."
            required
            onChange={e => onChange(e)}
            value={textPost}
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {posts.length > 0 ? (
            <div className="posts">
              {posts.map(post => (
                <PostItem key={post._id} post={post} />
              ))}
            </div>
          ) : (
            'No post here'
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

Posts.propTypes = {
  post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  post: state.post,
});
export default connect(mapStateToProps, { getPosts, createPost })(Posts);
