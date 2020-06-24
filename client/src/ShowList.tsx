import React from 'react';
import { render } from '@testing-library/react';
import axios from 'axios';
import App from './App';
import ScaleLoader from "react-spinners/ScaleLoader";
import ListItemLink from './ListItemLink';

export default class ShowList extends React.Component {
    state = {
      data: [],
      loading: false,
    }
  
    componentDidMount() {
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
  
    render() {
      return (
        <>
          <ScaleLoader
            color={"#3F51B5"}
            loading={this.state.loading}
          />
          {
            this.state.data.map((item: { title: string, id: any }) =>
              <ListItemLink key={item.id} to={'/list/' + item.id} primary={item.title} />
            )
          }
        </>
      )
    }
  
  }