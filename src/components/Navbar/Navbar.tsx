import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import MobilRightMenuSlider from '@material-ui/core/Drawer';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  List,
  ListItem,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { ArrowBack, AccountCircle, Home, Search } from '@material-ui/icons';
import SortIcon from '@material-ui/icons/Sort';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles({
  menuSliderWrap: {
    width: 250,
    height: '100%',
  },
  navInner: {
    maxWidth: 960,
    width: '100%',
    margin: '0 auto',
  },
  serach: {
    borderBottom: '1px solid #aaa',
  },
});

type NavbarState = {
  right: boolean;
};

const Navbar = () => {
  const history = useHistory();
  const [state, setState] = useState<NavbarState>({
    right: false,
  });

  // const toggleAuth = (login: boolean): any => {
  //   if (login) {
  //     auth.signOut();
  //     history.push('/');
  //   } else {
  //     history.push('/login');
  //   }
  // };

  const toggleSlider = (slider: string, open: boolean) => () => {
    setState({ ...state, [slider]: open });
  };
  const classes = useStyles();
  const sideList = (slider: string) => (
    <Box
      onClick={toggleSlider('slider', false)}
      className={classes.menuSliderWrap}
      component='div'
    >
      <List>
        <ListItem button>
          <ListItemIcon>
            {' '}
            <Search />
          </ListItemIcon>
          <ListItemText className={classes.serach} secondary='検索' />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem onClick={() => history.push('/')} button>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary='ホーム' />
        </ListItem>
        <ListItem onClick={() => history.push('/feed')} button>
          <ListItemIcon>
            <SortIcon />
          </ListItemIcon>
          <ListItemText primary='フィード' />
        </ListItem>
        <ListItem onClick={() => history.push('/counter')} button>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary='ログアウト' />
        </ListItem>
      </List>
    </Box>
  );
  return (
    <>
      <Box component='nav'>
        <AppBar
          style={{
            boxShadow: '0 2px 16px rgba(0, 0, 0, 0.1)',
            background: '#fff ',
          }}
          position='fixed'
        >
          <Toolbar className={classes.navInner}>
            <IconButton onClick={() => history.goBack()}>
              <ArrowBack />
            </IconButton>
            <Typography
              to='/'
              component={Link}
              style={{ textDecoration: 'none', flexGrow: 1 }}
              variant='h5'
            >
              habit<span style={{ color: '#00796b' }}>Tree</span>
            </Typography>
            <IconButton onClick={toggleSlider('right', true)}>
              <MenuIcon />
            </IconButton>
            <MobilRightMenuSlider
              onClose={toggleSlider('right', false)}
              anchor='right'
              open={state.right}
            >
              {sideList('right')}
            </MobilRightMenuSlider>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export { Navbar };
