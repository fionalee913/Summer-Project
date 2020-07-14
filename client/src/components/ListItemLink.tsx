import React from 'react';
import { render } from '@testing-library/react';
import axios from 'axios';
import App from '../App';
import {
    BrowserRouter as Router,
    Switch, Route, Link, useParams, LinkProps
  } from 'react-router-dom';
import {Divider, ListItem, ListItemIcon, ListItemText,
    Toolbar, Typography, Drawer, List, Dialog, DialogContent, DialogTitle, DialogActions,
     AppBar, Paper, Fab, Tooltip, TextField,
     Card, CardContent, Button, Checkbox, ListItemSecondaryAction} from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';

interface ListItemLinkProps {
    title: string;
    id: string;
    delete: boolean;
    edit: boolean;
    update: any;
  }

  export default class ListItemLink extends React.Component<ListItemLinkProps>{
    state = {
      title: this.props.title,
      id: this.props.id,
      dbclick: false,
    }

    handleDelete =() => {
      const clearList = {
        id: this.state.id,
      }
      axios.post('/list/delete', clearList)
      .then(res =>{
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.props.update();
      })
    }

    handleEdit = () => {
      this.setState({dbclick: false});
      const editList = {
        id: this.state.id,
        title: this.state.title,
      }
      axios.post('/list/update', editList)
        .then(res =>{
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.props.update();
        })
    }

    handleDoubleClick = () => {
      this.setState({dbclick: true});
    }

    render(){
      return (
        <li>
          {(this.props.delete || this.props.edit) ? 
          (<ListItem button>
            {this.state.dbclick ? 
            <>
            <TextField value={this.state.title} onChange={(evt) => {
              this.setState({ title: evt.target.value });
               }} />
              <Button onClick={this.handleEdit}><DoneIcon /></Button>
            </>
             : 
            <ListItemText onDoubleClick={this.handleDoubleClick} primary={this.state.title} />
            }
            {this.props.delete && <Button onClick={this.handleDelete}><DeleteIcon /></Button> }
              </ListItem>) : (
          <ListItem button component="a" href={`/list/${this.state.id}`}>
          <ListItemText primary={this.state.title} />
        </ListItem>)
          }
        </li>
      );
    }
  }