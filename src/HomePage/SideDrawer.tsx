import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/icons/Menu';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Build from '@material-ui/icons/Build';
import Store from '@material-ui/icons/Store';
import Work from '@material-ui/icons/Work';
import Assignment from '@material-ui/icons/Assignment';
import { withRouter } from 'react-router-dom';
import Inventory from '../Inventory/Inventory';
import Orders from '../Orders/Orders';
import SelectUIView from './SelectUIView';
import { useAuth0 } from "../react-auth0-wrapper";
import { Grid, Button } from '@material-ui/core';
import Production from '../Production/Production';
import { useFormControl } from '@material-ui/core/FormControl';
import ToolsList from '../Inventory/ToolsList';
import Projects from '../Production/Projects/Projects';



const drawerWidth = 400; //240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: '#0456DD'
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'row-reverse', //flex
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },

    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    logOutButton: {
      marginBottom: '10px',
      textTransform: 'capitalize',
      color: 'white',
      border: '1px solid white'
    }
  }),
);

function SideDrawer(props: any) {

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { userUIView, handleUserUIViewChange } = props
  const { logout } = useAuth0()


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onClickUpdateView = (text: String) => {
    const userCategoryView = text
    handleUserUIViewChange(userCategoryView)
  }

  // Handling all the different UI view to display
  const handleUserUIView = (userUIView: string) => {
    if(userUIView === 'Inventory'){
      return <Inventory handleUserUIViewChange={handleUserUIViewChange} />
    }
    else if(userUIView === 'Orders'){
      return <Orders userUIView={userUIView} handleUserUIViewChange={handleUserUIViewChange} />
    }
    else if(userUIView === 'Production'){
      return <Production userUIView={userUIView} handleUserUIViewChange={handleUserUIViewChange} />
    }
    else if(userUIView === 'ToolsList'){
      return <ToolsList handleUserUIViewChange={handleUserUIViewChange} />
    }
    else if(userUIView === 'Projects'){
      return <Projects handleUserUIViewChange={handleUserUIViewChange} />
    }
    else 
      return <SelectUIView userUIView={userUIView} handleUserUIViewChange={handleUserUIViewChange} />
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="baseline"
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <Menu />
            </IconButton>

            <Typography style={{marginBottom: '10px', cursor: 'pointer'}} variant="h6" noWrap onClick={() => handleUserUIViewChange("Home")}>
              ShopFlo
            </Typography>

            <Button className={classes.logOutButton} variant="outlined" onClick={() => logout({ returnTo: 'http://localhost:3000/' })}> 
              Log out
            </Button>

          </Grid>

        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? 
            <ChevronRight /> : <ChevronLeft />
            }
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Inventory', 'Orders', 'Production'].map((text, index) => (
            <ListItem button onClick={() => onClickUpdateView(text)} key={text}>
              <ListItemIcon>
              {index === 0 ? <Build /> : 
                index === 1 ? <Store /> :
                    <Assignment /> }
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>

          ))}
        </List>

      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        { handleUserUIView(userUIView) }
      </main>
    </div>
  );
}

export default withRouter(SideDrawer)
