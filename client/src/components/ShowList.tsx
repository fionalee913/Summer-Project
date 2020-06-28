import React from 'react';
import { render } from '@testing-library/react';
import axios from 'axios';
import App from '../App';
import ScaleLoader from "react-spinners/ScaleLoader";
import ListItemLink from './ListItemLink';
import {Divider, ListItem, ListItemIcon, ListItemText,
  Toolbar, Typography, Drawer, List, Dialog, DialogContent, DialogTitle, DialogActions,
   AppBar, Paper, Fab, Tooltip, TextField,
   Card, CardContent, Button, Checkbox, ListItemSecondaryAction} from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';
import AddList from './AddList';

export default class ShowList extends React.Component {
    state = {
      data: [],
      loading: false,
      dialogOpen: false,
    }
  
    update = () => {
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

    closeDialog = () => {
      this.setState({dialogOpen: false});
    }

    async componentDidMount() {
      await this.update();
    }
  
    render() {
      return (
        <>
          <AddList dialogOpen={this.state.dialogOpen} update={this.update} closeDialog={this.closeDialog}></AddList>
          <List>
            <li>
              <ListItem button onClick={() => {this.setState({dialogOpen: true})}}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add List" />
              </ListItem>
            </li>
          </List>
          <Divider />
          <ScaleLoader
            color={"#3F51B5"}
            loading={this.state.loading}
          />
          <List>
          {
            this.state.data.map((item: { title: string, id: any }) =>
              <ListItemLink key={item.id} to={'/list/' + item.id} primary={item.title} />
            )
          }
          </List>
        </>
      )
    }
  
  }