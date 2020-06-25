import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, LinkProps
} from 'react-router-dom';
import './App.css';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import { fade, makeStyles, withStyles, Theme, createStyles, unstable_createMuiStrictModeTheme, ThemeProvider } from '@material-ui/core/styles';
import {Divider, ListItem, ListItemIcon, ListItemText,
  Toolbar, Typography, Drawer, List, Dialog, DialogContent, DialogTitle, DialogActions,
   AppBar, Paper, Fab, Tooltip, TextField,
   Card, CardContent, Button, Checkbox, ListItemSecondaryAction} from '@material-ui/core/'
import AddIcon from '@material-ui/icons/Add';
import { Omit } from '@material-ui/types';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import ScaleLoader from "react-spinners/ScaleLoader";
import ListContent from './ListContent';
import ShowList from './ShowList';
import AddItem from './AddItem';
import ListItemLink from './ListItemLink';
import { useStyles, withStyle } from './UseStyles';

class App extends React.Component<{classes: any}, {}> {
  render() {
    const theme = unstable_createMuiStrictModeTheme();
    const {classes} = this.props;
    return (
      <div className="App">
        <header>
        <ThemeProvider theme={theme}>
          <Router>
            <ButtonAppBar />
            <main className={classes.content} />
            <Switch>
              <Route path="/add">
                <Home />
              </Route>
              <Route path="/list/:id" children={<ShowResponse />}></Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Router>
          </ThemeProvider>
        </header>
      </div>
    );
  }
}

function ButtonAppBar() {
  const classes = useStyles();

  const drawer = (
    <div>
      <List>
        <ListItemLink to="/add" primary="Add List" icon={<AddIcon />} />
      </List>
      <Divider />
      <List>
        <ShowList />
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title} align='left'>
            To-Do List
          </Typography>
          <Tooltip title="Delete List" aria-label="delete">
            <DeleteIcon />
          </Tooltip>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  );
}

function ShowResponse() {
  let { id } = useParams();
  axios.get('/list/' + id)
    .then(res => {
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    })
  return <ListContent id={id} />;
}

function Home() {
  return <h2>Home</h2>;
}

export default withStyle(App);