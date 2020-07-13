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
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddList from './AddList';

export default class ShowList extends React.Component {
    state = {
      data: [],
      loading: false,
      dialogOpen: false,
      deleteList: false,
      edit: false,
    }
  
    update = () => {
      this.setState({ loading: true }, () => {
        axios.get('/list')
          .then(res => {
            console.log(res);
            this.setState({ data: res.data });
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

    handleDone = () => {
      this.setState({deleteList: false});
      this.setState({edit: false});
    }
  
    render() {
      return (
        <>
          <AddList dialogOpen={this.state.dialogOpen} update={this.update} closeDialog={this.closeDialog}></AddList>
          <List>
              <ListItem button onClick={() => {this.setState({dialogOpen: true})}}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add List" />
              </ListItem>
          </List>
          <Divider />
          <ScaleLoader
            color={"#3F51B5"}
            loading={this.state.loading}
          />
          <List>
          {
            this.state.data.map((item: { title: string, id: any }) =>
              <ListItemLink key={item.id} id={item.id} title={item.title} delete={this.state.deleteList} edit={this.state.edit} update={this.update} />
            )
          }
          <ListItemIcon>
          <DeleteIcon onClick={() => {this.setState({deleteList: true})}} />
          </ListItemIcon>
          <ListItemIcon>
          <EditIcon onClick={() => {this.setState({edit: true})}}/>
          </ListItemIcon>
          {(this.state.deleteList || this.state.edit) ? <Button onClick={this.handleDone}>Done</Button> : null}
          </List>
        </>
      )
    }
  
  }