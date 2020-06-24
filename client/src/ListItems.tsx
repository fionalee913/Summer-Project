import React from 'react';
import { render } from '@testing-library/react';
import axios from 'axios';
import App from './App';
import {Divider, ListItem, ListItemIcon, ListItemText,
    Toolbar, Typography, Drawer, List, Dialog, DialogContent, DialogTitle, DialogActions,
     AppBar, Paper, Fab, Tooltip, TextField,
     Card, CardContent, Button, Checkbox, ListItemSecondaryAction} from '@material-ui/core/';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import {useStyles} from './UseStyles';

// pass item title, iscompleted
export default function ListItems(props: {title: string, isCompleted: boolean, id: any, listID: any}){
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
    )
  }