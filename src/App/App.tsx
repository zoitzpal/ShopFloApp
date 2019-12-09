import React from 'react';
import Login from '../Login/Login';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../HomePage/Home';
import { useAuth0 } from "../react-auth0-wrapper";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography, makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    centerItems: {
      textAlign: 'center',
      padding: '400px 0'
    },
    textMargin: {
      marginTop: "8px"
    },
    loaderIcon: {
      color: 'black'
    }
  }),
);


function App(props: any) {
  const { loading } = useAuth0();
  const classes = useStyles()

  if (loading) {
    return (
      <div className={classes.centerItems}>
        <CircularProgress className={classes.loaderIcon} />

        <Typography className={classes.textMargin} variant="h6">
          Loading....
        </Typography>
      </div>
    );
  }

  return (
    <Router>
      <Switch>

        <Route exact path='/' component={() => <Login />} /> 
        <Route path='/home' component={() => <Home />} />
        
      </Switch>
    </Router>
  );
}

export default App;
