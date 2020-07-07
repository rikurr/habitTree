import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
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
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import { ArrowBack, AccountCircle, Home } from '@material-ui/icons';
import SortIcon from '@material-ui/icons/Sort';
import MenuIcon from '@material-ui/icons/Menu';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, signOut } from '../../redux/modules/users';
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
});

type NavbarState = {
  right: boolean;
};

const Navbar = () => {
  const user = useSelector(selectUser);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { hasHabit, level } = user.currentUser;
  const [path, setPath] = useState<string>('');
  const [state, setState] = useState<NavbarState>({
    right: false,
  });

  useEffect(() => {
    setPath(() => location.pathname);
  }, [location]);

  const toggleAuth = (login: boolean): any => {
    if (login) {
      dispatch(signOut());
      history.push('/homeguest');
    } else {
      history.push('/signin');
    }
  };

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
        <ListItem onClick={() => toggleAuth(user.isSignedIn)} button>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText
            primary={user.isSignedIn ? 'サインアウト' : 'サインイン'}
          />
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
            {path.replace('/', '') &&
            path !== 'create-habit' &&
            path !== 'homeguest' ? (
              <IconButton onClick={() => history.goBack()}>
                <ArrowBack />
              </IconButton>
            ) : null}
            <Typography
              to='/'
              component={Link}
              style={{ textDecoration: 'none', flexGrow: 1 }}
              variant='h5'
            >
              habit<span style={{ color: '#00796b' }}>Tree</span>
            </Typography>
            {hasHabit < level && (
              <Tooltip title='習慣を作成する' aria-label='add'>
                <Fab
                  onClick={() => history.push('/create-habit')}
                  size='small'
                  color='primary'
                >
                  <AddIcon />
                </Fab>
              </Tooltip>
            )}
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
