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
   Card, CardContent, Button, IconButton, Checkbox, ListItemSecondaryAction} from '@material-ui/core/'
import AddIcon from '@material-ui/icons/Add';
import { Omit } from '@material-ui/types';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import ScaleLoader from "react-spinners/ScaleLoader";
import ListContent from './components/ListContent';
import ShowList from './components/ShowList';
import AddItem from './components/AddItem';
import AddList from './components/AddList';
import ListItemLink from './components/ListItemLink';
import { useStyles, withStyle } from './styles/UseStyles';

class App extends React.Component<{classes: any}, {}> {
  render() {
    const theme = unstable_createMuiStrictModeTheme();
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <Router>
            <ButtonAppBar />
            <Switch>
              <Route path="/list/:id" children={<ShowResponse />} />
              <Route path="/" children={<Home />} />
            </Switch>
          </Router>
          </ThemeProvider>
      </div>
    );
  }
}

function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <nav>
        <Drawer classes={{ paper: classes.drawerPaper, }}
          variant="permanent"
          open>
          <ShowList />
        </Drawer>
      </nav>
      <main className={classes.content} >
        <div className={classes.toolbar} >
        <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title} align='left'>
            To-Do List
          </Typography>
        </Toolbar>
      </AppBar>
      </div>
      </main>
    </div>
  );
}

function ShowResponse() {
  let { id } = useParams();
  axios.get(`/list/${id}`)
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