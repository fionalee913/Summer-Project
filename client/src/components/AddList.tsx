import React from 'react';
import { render } from '@testing-library/react';
import axios from 'axios';
import {Divider, ListItem, ListItemIcon, ListItemText,
    Toolbar, Typography, Drawer, List, Dialog, DialogContent, DialogTitle, DialogActions,
     AppBar, Paper, Fab, Tooltip, TextField,
     Card, CardContent, Button, Checkbox, ListItemSecondaryAction} from '@material-ui/core/';
import App from '../App';
import ScaleLoader from "react-spinners/ScaleLoader";
import ListItemLink from './ListItemLink';

export default class AddList extends React.Component {
    state = {
      title: "",
      open:true,
    }
  
    handleClose = () => {
      this.setState({open: false});
    };
      
      handleSubmit = () => {
        const newList = {
          title: this.state.title,
        };
        axios.post('/list/add', newList)
        .then(res =>{
          console.log(res.data);
          this.handleClose();
        })
        .catch(err => {
          console.log(newList.title);
          console.log(err);
          this.handleClose();
        })
      };
    
      render() {
      return (
      <>
        <Dialog open={this.state.open} onClose={this.handleClose}>
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