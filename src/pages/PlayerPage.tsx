/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { create } from '../actions';
import { Header } from '../components';
import { Copyright } from '../components';
import { useStyles } from '../styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

interface PlayerState {
  first_name: string;
  last_name: string;
  rating: number | string;
  handedness: string;
  submitted: boolean;
  id?: number;
}

const PlayerPage = (props: { dispatch?: any; addingPlayer?: any }) => {
  const [players, setPlayer] = useState<PlayerState>({
    first_name: '',
    last_name: '',
    rating: '',
    handedness: '',
    submitted: false
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPlayer((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setPlayer((prevState) => ({
      ...prevState,
      submitted: true
    }));
    const { dispatch } = props;
    if (
      players.first_name &&
      players.last_name &&
      players.rating &&
      players.handedness
    ) {
      dispatch(create(players));
    }
  };

  const classes = useStyles();
  const { addingPlayer } = props;
  return (
    <React.Fragment>
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar
            className={classes.avatar}
            style={{ backgroundColor: '#3f51b5' }}
          >
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add New Player
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="first_name"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={players.first_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="last_name"
                  autoComplete="lname"
                  value={players.last_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="rating"
                  label="Rating"
                  name="rating"
                  autoComplete="rating"
                  value={players.rating}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="handedness"
                  label="Handedness"
                  name="handedness"
                  autoComplete="handedness"
                  value={players.handedness}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Add
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/roster" id="roster">
                  Back
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
};

const mapStateToProps = (state: { players: { addingPlayer: any } }) => {
  const { addingPlayer } = state.players;
  return {
    addingPlayer
  };
};

const connectedPlayerPage = connect(mapStateToProps)(PlayerPage);
export { connectedPlayerPage as PlayerPage };
