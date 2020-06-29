import React from 'react';
import { render } from '@testing-library/react';
import axios from 'axios';
import App from '../App';
import {Divider, ListItem, ListItemIcon, ListItemText,
    Toolbar, Typography, Drawer, List, Dialog, DialogContent, DialogTitle, DialogActions,
     AppBar, Paper, Fab, Tooltip, TextField,
     Card, CardContent, Button, IconButton, Checkbox, ListItemSecondaryAction, withStyles} from '@material-ui/core/';
import ClearIcon from '@material-ui/icons/Clear';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import {useStyles} from '../styles/UseStyles';
import { withStyle } from '../styles/UseStyles';

type PropsType = {
  update: any, title: any, isCompleted: any, id: any, listID: any, classes: any,
}

// pass item title, iscompleted
class ListItems extends React.Component<PropsType, {checked: boolean}>{
  constructor(props: PropsType) {
    super(props);
    this.state = {
      checked: this.props.isCompleted,
    }
  } 
    
    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ checked: event.target.checked});
      const updateItem = {
         id: this.props.id,
         listID: this.props.listID,
         isCompleted: !this.props.isCompleted,
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
      this.props.update();
    };
  
    render(){
    return (
      <Grid item xs>
      <Card className={this.props.classes.card}>
        <CardContent>
        <Checkbox
          checked={this.state.checked}
          onChange={this.handleChange}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        {this.props.title}
        <IconButton onClick={this.handleClear} >
          <ClearIcon />
        </IconButton>
        </CardContent>
      </Card>
      </Grid>
    )
    }
  }

  export default withStyle(ListItems);