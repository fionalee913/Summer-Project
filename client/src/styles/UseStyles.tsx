import { makeStyles, withStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

// export const styles = (theme: any ) => ();

function style(theme: any): Record<any, any> {
  return {
    root: {
      display: 'flex',
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    hide: {
      display: 'none',
    },
    toolbar: theme.mixins.toolbar,
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    paper: {
      padding: theme.spacing(1),
      marginLeft: 280,
      textAlign: 'left',
      width: 800,
      color: theme.palette.text.primary,
    },
    card: {
      width: 800,
      textAlign: 'left',
      marginLeft: 280,
    },
    fab: {
      margin: theme.spacing(2),
    },
    absolute: {
      position: 'fixed',
      bottom: theme.spacing(3),
      right: theme.spacing(3),
    },
    
  }
}

// const style = (theme: any) => ()

export const useStyles = makeStyles(style);

export const withStyle = withStyles(style);