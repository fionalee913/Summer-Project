import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, LinkProps
} from 'react-router-dom';
import './App.css';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import { fade, makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import {Divider, ListItem, ListItemIcon, ListItemText,
  Toolbar, Typography, Drawer, List,
   AppBar, Paper, Fab, Tooltip,
   Card, CardContent, Button, Checkbox} from '@material-ui/core/'
import AddIcon from '@material-ui/icons/Add';
import { Omit } from '@material-ui/types';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import ScaleLoader from "react-spinners/ScaleLoader";

export class ListContent extends React.Component<{ id: string }>{
  state = {
    data: [],
  }

  updateListData() {
    const id = this.props.id;
    axios.get('/list/' + id)
      .then(res => {
        const data = res.data;
        this.setState({ data });
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  async componentDidMount() {
    await this.updateListData();

  }

  async componentDidUpdate(prevProps: { id: string }) {
    if (this.props.id != prevProps.id) {
      await this.updateListData();
    }
  }

  render() {
    return (
      <ul>
        <li>list content</li>
      </ul>
    )
  }
}

export class ShowList extends React.Component {
  state = {
    data: [],
    loading: false,
  }

  componentDidMount() {
    this.setState({ loading: true }, () => {
      axios.get('/list')
        .then(res => {
          console.log(res);
          const data = res.data;
          this.setState({ data });
          res.data.forEach((item: { title: string }) => {
            console.log(item.title);
          });
        }).catch(err => {
          console.log(err);
        })
        .finally(() =>
          this.setState({ loading: false })
        )
    })

  }

  render() {
    return (
      <>
        <ScaleLoader
          color={"#3F51B5"}
          loading={this.state.loading}
        />
        {
          this.state.data.map((item: { title: string, id: any }) =>
            <ListItemLink key={item.id} to={'/list/' + item.id} primary={item.title} />
          )
        }
      </>
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
            <Route path="/list/:id" children={<ShowResponse />}></Route>
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

function ButtonAppBar() {
  const classes = useStyles();
  const theme = useTheme();

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

export default App;