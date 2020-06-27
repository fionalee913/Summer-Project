import React from 'react';
import { render } from '@testing-library/react';
import axios from 'axios';
import {Divider, ListItem, ListItemIcon, ListItemText,
    Toolbar, Typography, Drawer, List, Dialog, DialogContent, DialogTitle, DialogActions,
     AppBar, Paper, Fab, Tooltip, TextField, Snackbar,
     Card, CardContent, Button, Checkbox, ListItemSecondaryAction} from '@material-ui/core/';
import App from '../App';
import ScaleLoader from "react-spinners/ScaleLoader";
import ListItemLink from './ListItemLink';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import AddIcon from '@material-ui/icons/Add';
import { withStyle } from '../styles/UseStyles';
import { createBrowserHistory } from 'history';


class AddList extends React.Component<{ classes: any, update: any, dialogOpen: any, closeDialog: any }, { title: string, open: boolean, success: boolean, fail: boolean, showBar: boolean, newId: string }>{
  constructor(props: { classes: any, update: any, dialogOpen: any, closeDialog: any }) {
    super(props);
    this.state = {
      title: "",
      open: true,
      success: false,
      fail: false,
      showBar: false, 
      newId: ""
    }
  }
  

    closeBar = () => {
      const history = createBrowserHistory();
      this.setState({ showBar: false });
      this.props.update();
      history.push(`/list/${this.state.newId}`);
    }

    handleClose = () => {
      this.props.closeDialog();
    };
      
      handleSubmit = () => {
        const newList = {
          title: this.state.title,
        };
        this.setState({success: false});
        axios.post('/list/add', newList)
        .then(res =>{
          console.log(res.data);
          this.setState({newId: res.data.id, showBar: true, success: true});
          this.handleClose();
        })
        .catch(err => {
          console.log(newList.title);
          console.log(err);
          this.setState({showBar: true});
          this.handleClose();
        })
      };
    
      render() {
      return (
      <>
          <Dialog open={this.props.dialogOpen} onClose={this.handleClose}>
          <DialogContent>
            <DialogTitle>
              Add new list
          </DialogTitle>
            <TextField
              autoFocus
              margin="dense"
              label="new list"
              fullWidth
              onChange={(evt) => {
                console.log(evt.target.value);
                this.setState({ title: evt.target.value });
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
        <Snackbar open={this.state.showBar} autoHideDuration={3500} onClose={this.closeBar} >
          <MuiAlert elevation={6} variant="filled" severity={this.state.success ? "success" : "error"} onClose={this.closeBar}>
            {this.state.success ? "This is a success message!" : "Error! Try again."}
          </MuiAlert>
        </Snackbar>
      </>
      )
      }
    }

    export default withStyle(AddList);