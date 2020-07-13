import React from 'react';
import { render } from '@testing-library/react';
import axios from 'axios';
import App from '../App';
import {Divider, ListItem, ListItemIcon, ListItemText, 
    Toolbar, Typography, Drawer, List, Dialog, DialogContent, DialogTitle, DialogActions,
     AppBar, Paper, Fab, Tooltip, TextField, FormControlLabel,
     Card, CardContent, Button, IconButton, Checkbox, ListItemSecondaryAction, withStyles} from '@material-ui/core/';
import ClearIcon from '@material-ui/icons/Clear';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import {useStyles} from '../styles/UseStyles';
import { withStyle } from '../styles/UseStyles';
import DoneIcon from '@material-ui/icons/Done';

type PropsType = {
  update: any, title: any, isCompleted: any, id: any, listID: any, classes: any,
}

// pass item title, iscompleted
class ListItems extends React.Component<PropsType, {checked: boolean, title: string, dbclick: boolean}>{
  constructor(props: PropsType) {
    super(props);
    this.state = {
      checked: this.props.isCompleted,
      title: this.props.title,
      dbclick: false,
    }
  } 
    
    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const complete = event.target.checked;
      this.setState({checked: event.target.checked});
      const updateItem = {
         id: this.props.id,
         listID: this.props.listID,
         isCompleted: complete,
      };
      axios.post('/item/update', updateItem)
      .then(res =>{
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
    };

    handleClear = () => {
      const clearItem = {
        id: this.props.id,
        listID: this.props.listID,
      };
      console.log({clearItem});
      axios.post('/item/delete', clearItem)
      .then(res =>{
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.props.update();
      })
    };

    handleEdit = () => {
      this.setState({dbclick: false});
      const editItem = {
        id: this.props.id,
        listID: this.props.listID,
        isCompleted: this.state.checked,
        title: this.state.title,
      }
      axios.post('/item/update', editItem)
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
  
    render(){
    return (
    <Grid item xs> 
      <Paper className={this.props.classes.paper}>
        <ListItem>
        <Checkbox
          checked={this.state.checked}
          onChange={this.handleChange}
        />
        {this.state.dbclick ? 
        <>
          <TextField value={this.state.title} onChange={(evt) => {
          this.setState({ title: evt.target.value });
           }} />
          <Button onClick={this.handleEdit}><DoneIcon /></Button>
        </>
          : <ListItemText onDoubleClick={() => {this.setState({dbclick: true})}} primary={this.state.title} />
        }
        <IconButton onClick={this.handleClear} >
          <ClearIcon />
        </IconButton>
        </ListItem> 
        </Paper>
    </Grid>  
    )
    }
  }

  export default withStyle(ListItems);