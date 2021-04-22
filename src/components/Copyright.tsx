import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export const Copyright = (): JSX.Element => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/khite95/roster-app">
        Kenny Hite
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
};
