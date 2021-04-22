/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from 'react-redux';
import { del, getAll } from '../actions';
import { Header } from '../components';
import { useStyles } from '../styles';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import PeopleOutlineOutlinedIcon from '@material-ui/icons/PeopleOutlineOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';

import { htmlToText } from 'html-to-text';

const RosterPage = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Header />
      <Container component="main">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar
            className={classes.avatar}
            style={{ backgroundColor: '#3f51b5' }}
          >
            <PeopleOutlineOutlinedIcon />
          </Avatar>
          <Typography
            className={classes.typography}
            component="h1"
            variant="h4"
          >
            Top Posts
          </Typography>
          <HackerPosts />
        </div>
      </Container>
    </React.Fragment>
  );
};

function DisplayPost({ postID }) {
  const [status, setStatus] = useState('idle');
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [titles, setTitles] = useState(false);
  const classes = useStyles();
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    setStatus('pending');
    setFetched(true);
    fetchPost(postID).then(
      (post) => {
        setStatus('resolved');
        setPost(post);
      },
      (errorData) => {
        setStatus('rejected');
        setError(errorData);
        console.log('Error: ' + error);
      }
    );
  }, []);

  if (status === 'rejected') {
    return <div>{'Oh no...rejected getting post'}</div>;
  }

  if (!post) {
    return <div>{'Could not get post'}</div>;
  }

  if (status === 'pending') {
    return <div>{'Loading...'}</div>;
  }

  if (status === 'resolved') {
    return (
      <React.Fragment>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography variant="h8" component="h2">
              {post.title}
              {console.log(post)}
            </Typography>
            <Typography variant="body1" component="p">
              By {post.by}
            </Typography>
            <Typography className={classes.title} color="primary" gutterBottom>
              Score: {post.score}
            </Typography>

            {post.kids && (
              <React.Fragment>
                {post.kids.slice(0, 3).map((commentID) => (
                  <Grid
                    item
                    key={commentID}
                    direction="column"
                    justify="flex-start"
                  >
                    <DisplayComment key={commentID} commentID={commentID} />
                  </Grid>
                ))}
              </React.Fragment>
            )}
          </CardContent>
          <CardActions>
            {/* <Avatar>
              <DeleteOutlineOutlinedIcon />
            </Avatar> */}
          </CardActions>
        </Card>
      </React.Fragment>
    );
  }
}

function DisplayComment({ commentID }) {
  const [status, setStatus] = useState('idle');
  const [comment, setComment] = useState(null);
  const [error, setError] = useState(null);
  const [titles, setTitles] = useState(false);
  const classes = useStyles();
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    setStatus('pending');
    setFetched(true);
    fetchComment(commentID).then(
      (comment) => {
        setStatus('resolved');
        setComment(comment);
      },
      (errorData) => {
        setStatus('rejected');
        setError(errorData);
        console.log('Error: ' + error);
      }
    );
  }, []);

  if (status === 'rejected') {
    return <div>{'Oh no...rejected getting comment'}</div>;
  }

  if (!comment) {
    return <div>{'.'}</div>;
  }

  if (status === 'pending') {
    return <div>{'Loading...'}</div>;
  }

  if (status === 'resolved') {
    return (
      <React.Fragment>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography variant="h8" component="h2">
              {comment.by}
            </Typography>
            <Typography className={classes.title} color="primary" gutterBottom>
              {comment.text && (
                <React.Fragment>
                  {htmlToText(comment.text, { wordwrap: null })}
                </React.Fragment>
              )}
            </Typography>
            {comment.kids && (
              <React.Fragment>
                {comment.kids.slice(0, 2).map((commentID) => (
                  <Grid
                    item
                    key={commentID}
                    direction="column"
                    justify="flex-start"
                  >
                    <DisplayComment key={commentID} commentID={commentID} />
                  </Grid>
                ))}
              </React.Fragment>
            )}
          </CardContent>
        </Card>
      </React.Fragment>
    );
  }
}

function HackerPosts() {
  const [status, setStatus] = useState('idle');
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [fetched, setFetched] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    setFetched(true);
    fetchTopPosts().then(
      (posts) => {
        setStatus('resolved');
        setPosts(posts);
      },
      (errorData) => {
        setStatus('rejected');
        setError(errorData);
        console.log('Error: ' + error);
      }
    );
  }, [fetched]);

  if (status === 'rejected') {
    return 'Oh no...rejected getting top posts';
  }

  if (!posts) {
    return '.';
  }

  if (status === 'pending') {
    return 'Loading...';
  }

  if (status === 'resolved') {
    return (
      <Container className={classes.cardGrid}>
        <Grid container spacing={3} direction="column" justify="center">
          {posts && (
            <React.Fragment>
              {posts.slice(0, 10).map((postID) => (
                <Grid item key={postID}>
                  <DisplayPost key={postID} postID={postID} />
                </Grid>
              ))}
            </React.Fragment>
          )}
        </Grid>
      </Container>
    );
  }
}

function fetchPost(id) {
  return window
    .fetch(
      'https://hacker-news.firebaseio.com/v0/item/' + id + '.json?print=pretty'
    )
    .then((r) => r.json());
}

function fetchComment(id) {
  return window
    .fetch(
      'https://hacker-news.firebaseio.com/v0/item/' + id + '.json?print=pretty'
    )
    .then((r) => r.json());
}

function fetchTopPosts() {
  return window
    .fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
    .then((r) => r.json());
}

const mapStateToProps = (state: { players: any }) => {
  const { players } = state;
  return {
    players
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleDeletePlayer: (id: number) => {
      dispatch(del(id));
    },
    getAllPlayers: () => {
      dispatch(getAll());
    }
  };
};

const connectedRosterPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(RosterPage);
export { connectedRosterPage as RosterPage };
