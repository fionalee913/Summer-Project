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

interface ListItemLinkProps {
    icon?: React.ReactElement;
    primary: string;
    to: string;
  }
  
export default function ListItemLink(props: ListItemLinkProps) {
    const { icon, primary, to } = props;
  
    const renderLink = React.useMemo(
      () =>
        React.forwardRef<any, Omit<LinkProps, 'to'>>((itemProps, ref) => (
          <Link to={to} ref={ref} {...itemProps} />
        )),
      [to],
    );
  
    return (
      <li>
        <ListItem button component={renderLink}>
          {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
          <ListItemText primary={primary} />
        </ListItem>
      </li>
    );
  }