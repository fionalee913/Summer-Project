import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, LinkProps
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Grid, {GridSpacing} from '@material-ui/core/Grid';
import { fade, makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import ListIcon from '@material-ui/icons/List';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Paper from '@material-ui/core/Paper';
import { Omit } from '@material-ui/types';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';
import { threadId } from 'worker_threads';

export class ListContent extends React.Component{
  state = {
      data: [],
  }

  async componentDidMount(){
    const id = this.props.match.params.id;
    const res = await axios.get('/list/' + id);
    const data = res.data;
    this.setState({data});
    console.log(data);
  }

  render(){
    return (
      <ul>
        <li>list content</li>
      </ul>
    )
    }
}

export class ShowList extends React.Component{
  state = {
      data: [],
  }

  componentDidMount() {
  axios.get('/list')
  .then(res =>{
    console.log(res);
    const data = res.data;
    this.setState({data});
    res.data.forEach((item:{title:string}) => {
      console.log(item.title);
    });
  }).catch(err => {
    console.log(err);
  })
  }

  render(){
    return (
        this.state.data.map((item:{title:string, id:any}) => 
          <ListItemLink key={item.id} to={'/list/' + item.id} primary={item.title} />
        )
    )  
  }
}

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<LinkProps, 'to'>>((itemProps, ref) => (
        <Link to={to} ref={ref} {...itemProps} />
      )),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  toolbar: theme.mixins.toolbar,
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(1),
    marginLeft: 280,
    textAlign: 'left',
    width: 800,
    color: theme.palette.text.primary,
  },
  card: {
    width: 800,
    textAlign: 'left',
    marginLeft: 280,
  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
}));

const drawerWidth = 240;

function App() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="App">
      <header>
      <Router>
        <ButtonAppBar />
        <main className={classes.content}>
    <nav>   
	    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper} elevation={2}>
        <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />exmaple list item</Paper>
      </Grid>
      <Card className={classes.card}>
        <CardContent>
        <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
            example list item 2
        </CardContent>
      </Card>
      </Grid>
    </nav>
    </main>
    <Tooltip title="Add" aria-label="add">
        <Fab color="primary" className={classes.absolute}>
          <AddIcon />
        </Fab>
      </Tooltip>
	  <Switch>
          <Route path="/add">
            <Home />
          </Route>
          <Route path="/list/:id" children={<ListContent />}></Route>
          <Route path="/logout">
            <Home />
          </Route>
          <Route path="/">
            <Home />
          </Route>
    </Switch>
    </Router>
    </header>
      <Button variant="contained" color="secondary">
        Primary
      </Button>
      
    </div>
  );
}

function ButtonAppBar(){
  const classes = useStyles();
  const theme = useTheme();

  const drawer = (
    <div>
        <List>
          <ListItemLink to="/add" primary="Add List" icon={<AddIcon/>} />
        </List>
        <Divider />
        <List>
        <ShowList/>
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

/*function ShowResponse() {
  let { id } = useParams();
  axios.get('/list/' + id)
    .then(res =>{
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    })
  return <ListContent id = {id}/>;
}*/

function Home() {
  return <h2>Home</h2>;
}


export default App;