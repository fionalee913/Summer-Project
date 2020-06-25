import React from 'react';
import { render } from '@testing-library/react';
import axios from 'axios';
import App from './App';
import {Divider, ListItem, ListItemIcon, ListItemText,
    Toolbar, Typography, Drawer, List, Dialog, DialogContent, DialogTitle, DialogActions,
     AppBar, Paper, Fab, Tooltip, TextField, Snackbar,
     Card, CardContent, Button, Checkbox, ListItemSecondaryAction} from '@material-ui/core/';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import AddIcon from '@material-ui/icons/Add';
import {withStyle} from './UseStyles';

class Alert extends React.Component<any> {
    render(){
        return <MuiAlert elevation={6} variant="filled" {...this.props} />;
    }
}

class AddItem extends React.Component<{listID: any, classes: any}, {listID: string, title: string, open: boolean, success: boolean, fail: boolean}>{

    constructor (props: {listID: any, classes: any}) {
      super(props);
      let {listID} = this.props;
      this.state = {
        listID: listID,
        title: "",
        open: false,
        success: false,
        fail: false,
      }
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
        this.handleClose();
        this.setState({success: true});
      })
      .catch(err => {
        console.log(newItem.listID);
        console.log(err);
        this.handleClose();
        this.setState({fail: true});
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
      <Snackbar open={this.state.success} autoHideDuration={6000} >
        <Alert severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
      <Snackbar open={this.state.fail} autoHideDuration={6000} onClose={() => {this.setState({fail:false})} }>
        <Alert onClose={() => {this.setState({fail:false})}} severity="error">
          Error! Try again.
        </Alert>
      </Snackbar>
    </>
    )
    }
  }

  export default withStyle(AddItem);
