import React from 'react';
import { useStyles } from '../styles';
import Avatar from '@material-ui/core/Avatar';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Button, Typography } from '@material-ui/core';

interface PlayerProps {
  playerProp: {
    first_name: string;
    last_name: string;
    rating: number;
    handedness: string;
    id: number;
  };
  handleDeletePlayer:
    | (React.MouseEventHandler<HTMLTableHeaderCellElement> &
        React.MouseEventHandler<HTMLTableDataCellElement>)
    | undefined;
  index: number;
  key?: React.Key | number | null | undefined;
}

export const Player = ({
  playerProp,
  handleDeletePlayer,
  index
}: PlayerProps): JSX.Element => {
  const classes = useStyles();
  // Using the last name as a key to delete from table
  return (
    <React.Fragment>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            {playerProp.first_name + ' ' + playerProp.last_name}
          </Typography>
          <Typography variant="body1" component="p">
            Rated {playerProp.rating}
          </Typography>
          <Typography className={classes.title} color="primary" gutterBottom>
            Handedness: {playerProp.handedness}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            ID: {playerProp.id}
          </Typography>
        </CardContent>
        <CardActions>
          <Avatar onClick={handleDeletePlayer}>
            <DeleteOutlineOutlinedIcon />
          </Avatar>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};
