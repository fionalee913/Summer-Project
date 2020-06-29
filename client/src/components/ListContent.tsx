import React from 'react';
import { render } from '@testing-library/react';
import axios from 'axios';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import App from '../App';
import AddItem from './AddItem';
import ListItems from './ListItems';
import PacmanLoader from "react-spinners/PacmanLoader";

export default class ListContent extends React.Component<{ id: string }>{
    state = {
      data: [],
      loading: false,
    }
  
    updateListData = () => {
      this.setState({loading: true});
      axios.get('/list/' + this.props.id)
        .then(res => {
          const data = res.data.items;
          this.setState({ data });
          console.log(data);
          res.data.items.forEach((item: { title: string }) => {
              console.log(item.title);
            });
        })
        .catch(err => {
          console.log(err);
        })
      this.setState({loading: false});
    }
  
    async componentDidMount() {
      await this.updateListData();
  
    }
  
    async componentDidUpdate(prevProps: { id: string }) {
      if (this.props.id != prevProps.id) {
        await this.updateListData();
      }
    }
  
    render() {
      return (
        <main>
        <PacmanLoader
            color={"#3F51B5"}
            loading={this.state.loading}
        />
        <Grid container spacing={3}>
        {this.state.data.map((item: { title: string, isCompleted: boolean, id: any, listID: any}) =>
          <ListItems key={item.id} title={item.title} isCompleted={item.isCompleted} id={item.id} listID={item.listID} update={this.updateListData}/>
        )}
        </Grid>
        <AddItem listID={this.props.id} updateList={this.updateListData}/>
        </main>
      )
    }
  }