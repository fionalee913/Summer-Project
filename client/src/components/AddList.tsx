import React from 'react';
import { render } from '@testing-library/react';
import axios from 'axios';
import {Divider, ListItem, ListItemIcon, ListItemText,
    Toolbar, Typography, Drawer, List, Dialog, DialogContent, DialogTitle, DialogActions,
     AppBar, Paper, Fab, Tooltip, TextField, Snackbar,
     Card, CardContent, Button, Checkbox, ListItemSecondaryAction} from '@material-ui/core/';
import App from '../App';
import CircleLoader from "react-spinners/CircleLoader";
import ListItemLink from './ListItemLink';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import AddIcon from '@material-ui/icons/Add';
import { withRouter, RouteComponentProps  } from "react-router";

type PropsType = RouteComponentProps & {
  update: any, dialogOpen: any, closeDialog: any, history: any
}

class AddList extends React.Component<PropsType, { title: string, success: boolean, fail: boolean, showBar: boolean, newId: string, loading: boolean }>{
  constructor(props: PropsType) {
    super(props);
    this.state = {
      title: "",
      success: false,
      fail: false,
      showBar: false, 
      newId: "",
      loading: false
    }
  }
  
    closeBar = () => {
      this.setState({ showBar: false });
      this.props.update();
      this.props.history.push(`/list/${this.state.newId}`);
    }

    handleClose = () => {
      this.props.closeDialog();
    };
      
      handleSubmit = () => {
        const newList = {
          title: this.state.title,
        };
        this.setState({ loading: true }, () => {
          this.setState({success: false});
        axios.post('/list/add', newList)
        .then(res =>{
          console.log(res.data);
          this.setState({newId: res.data.id, success: true});
          this.handleClose();
        })
        .catch(err => {
          console.log(err);
          this.handleClose();
        })
        .finally(() => {
          this.setState({loading: false});
          setTimeout(this.handleClose, 5000);
          setTimeout(()=>this.setState({showBar: true}), 8000);
        })
        })
      };
    
      render() {
      return (
      <>
          <Dialog open={this.props.dialogOpen} onClose={this.handleClose}>
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
                this.setState({ title: evt.target.value });
              }}
              value={this.state.title}
            />
          </DialogContent>
          <DialogActions>
          <CircleLoader
            color={"#3F51B5"}
            loading={this.state.loading}
          />
          {
            !this.state.loading && 
            <Button onClick={this.handleSubmit} color="primary">
              Add
            </Button>
          }
          {
            !this.state.loading &&
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
          }
          </DialogActions>
        </Dialog>
        <Snackbar open={this.state.showBar} autoHideDuration={3500} onClose={this.closeBar} >
          <MuiAlert elevation={6} variant="filled" severity={this.state.success ? "success" : "error"} onClose={this.closeBar}>
            {this.state.success ? "Success!" : "Error! Try again."}
          </MuiAlert>
        </Snackbar>
      </>
      )
      }
    }

    export default withRouter(AddList);