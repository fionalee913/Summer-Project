import React from 'react';
import { render } from '@testing-library/react';
import axios from 'axios';
import App from '../App';
import {
  Divider, ListItem, ListItemIcon, ListItemText,
  Toolbar, Typography, Drawer, List, Dialog, DialogContent, DialogTitle, DialogActions,
  AppBar, Paper, Fab, Tooltip, TextField, Snackbar,
  Card, CardContent, Button, Checkbox, ListItemSecondaryAction
} from '@material-ui/core/';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import AddIcon from '@material-ui/icons/Add';
import { withStyle } from '../styles/UseStyles';

class AddItem extends React.Component<{ listID: any, classes: any, updateList: any }, { listID: string, title: string, open: boolean, success: boolean, fail: boolean, showBar: boolean }>{

  constructor(props: { listID: any, classes: any, updateList: any }) {
    super(props);
    let { listID } = this.props;
    this.state = {
      listID: listID,
      title: "",
      open: false,
      success: false,
      fail: false,
      showBar: false
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  closeBar = () => {
    this.setState({ showBar: false });
    this.props.updateList();
  }

  handleSubmit = () => {
    const newItem = {
      listID: this.state.listID,
      title: this.state.title,
    };
    this.setState({ success: false, fail: false });
    axios.post('/item/add', newItem)
      .then(res => {
        console.log(res.data);
        this.setState({ success: true });
      })
      .catch(err => {
        console.log(newItem.listID);
        console.log(err);
        this.handleClose();
        this.setState({ fail: true });
      })
      .finally(() => {
        this.handleClose();
        this.setState({ showBar: true })
      })
  };

  render() {
    return (
      <>
        <Tooltip title="Add" aria-label="add" className={this.props.classes.absolute}>
          <Fab color="primary" onClick={this.handleClickOpen} >
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

export default withStyle(AddItem);
