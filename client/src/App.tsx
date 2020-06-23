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
  Toolbar, Typography, Drawer, List, Dialog, DialogContent, DialogTitle, DialogActions,
   AppBar, Paper, Fab, Tooltip, TextField,
   Card, CardContent, Button, Checkbox, ListItemSecondaryAction} from '@material-ui/core/'
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
        const data = res.data.items;
        this.setState({ data });
        console.log(data);
        res.data.items.forEach((item: { title: string }) => {
            console.log(item.title);
          });
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
      <Grid container spacing={3}>
      {this.state.data.map((item: { title: string, isCompleted: boolean, id: any, listID: any}) =>
        <ListItems key={item.id} title={item.title} isCompleted={item.isCompleted} id={item.id} listID={item.listID} />
      )}
      </Grid>
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

// pass item title, iscompleted
function ListItems(props: {title: string, isCompleted: boolean, id: any, listID: any}){
  const { title, isCompleted, id, listID} = props;
  const classes = useStyles();
  const [checked, setChecked] = (isCompleted ? React.useState(true) : React.useState(false) );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    const updateItem = {
       id: id,
       listID: listID,
       isCompleted: !isCompleted,
    };
    console.log({updateItem});
    axios.post('/item/update', updateItem)
    .then(res =>{
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  };

  return (
    <main className={classes.content}>
    <Grid item xs>
    <Card className={classes.card}>
      <CardContent>
      <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      {title}</CardContent>
    </Card>
    </Grid>
    <AddItem listID={listID}/>
    </main>
  )
}

class AddItem extends React.Component<{listID: any}>{
  state = {
    listID: this.props.listID,
    title: "",
    open: false,
  }

  handleClickOpen = () => {
    this.setState({open: true});
  };
  handleClose = () => {
    this.setState({open: false});
  };
  
  handleSubmit = () => {
    const newItem = {
      listID: this.state.listID,
      title: this.state.title,
    };
    axios.post('/item/add', newItem)
    .then(res =>{
      console.log(res.data);
    })
    .catch(err => {
      console.log(newItem.listID);
      console.log(err);
    })
  };
  render() {
  return (
  <>
    <Tooltip title="Add" aria-label="add">
      <Fab color="primary" onClick={this.handleClickOpen}>
        <AddIcon />
      </Fab>
    </Tooltip>
    <Dialog open={this.state.open} onClose={this.handleClose}>
      <DialogContent>
        <DialogTitle>
          Add new item
        </DialogTitle>
        <TextField
            autoFocus
            margin="dense"
            label="new item"
            fullWidth
            onChange={(evt) => {
              console.log(evt.target.value);
              this.setState({title: evt.target.value});
            }}
            value={this.state.title}
          />
      </DialogContent>
      <DialogActions>
          <Button onClick={this.handleSubmit} color="primary">
            Add
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
    </Dialog>
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

  return (
    <div className="App">
      <header>
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
      </header>
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