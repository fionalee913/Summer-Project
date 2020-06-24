import React from 'react';
import { render } from '@testing-library/react';
import axios from 'axios';
import App from './App';
import {Divider, ListItem, ListItemIcon, ListItemText,
    Toolbar, Typography, Drawer, List, Dialog, DialogContent, DialogTitle, DialogActions,
     AppBar, Paper, Fab, Tooltip, TextField,
     Card, CardContent, Button, Checkbox, ListItemSecondaryAction} from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';

export default class AddItem extends React.Component<{listID: any}, {listID: string, title: string, open: boolean}>{

    constructor (props: {listID: any}) {
      super(props);
      let {listID} = this.props;
      this.state = {
        listID: listID,
        title: "",
        open: false,
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
      })
      .catch(err => {
        console.log(newItem.listID);
        console.log(err);
      })
    };
  
    render() {
    return (
    <>
      <Tooltip title="Add" aria-label="add" >
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
    </>
    )
    }
  }