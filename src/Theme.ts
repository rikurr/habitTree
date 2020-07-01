import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
         palette: {
           primary: {
             dark: '#00796b',
             main: '#009688',
             light: '#80cbc4',
             contrastText: '#fff',
           },
           secondary: {
             dark: '#c2185b',
             main: '#e91e63',
             light: '#f48fb1',
             contrastText: '#fff',
           },
         },
         typography: {
           fontSize: 14,
           fontFamily: [
             'Roboto',
             '"Helvetica Neue"',
             'Arial',
             'sans-serif',
             'Work Sans',
           ].join(','),
           button: {
             textTransform: 'none',
             fontWeight: 'bold',
             height: 40,
           },
           h1: {
             fontWeight: 'bold',
             fontSize: '2rem',
             fontFamily: 'Montserrat',
             '@media (min-width:600px)': {
               fontSize: '3rem',
             },
           },
           h2: {
             fontWeight: 'bold',
             fontSize: '1.4rem',
             fontFamily: 'Montserrat',
             '@media (min-width:600px)': {
               fontSize: '2.2rem',
             },
           },
           h3: {
             fontWeight: 'bold',
             fontSize: '1.2rem',
             fontFamily: 'Montserrat',
             '@media (min-width:600px)': {
               fontSize: '1.8rem',
             },
           },
           h4: {
             fontWeight: 'bold',
             fontSize: '1rem',
             fontFamily: 'Montserrat',
             borderBottom: '2px solid #26a69a',
             display: 'inline',
             paddingBottom: 8,
             '@media (min-width:600px)': {
               fontSize: '1.5rem',
             },
           },
           h5: {
             fontSize: '1.5rem',
             fontFamily: 'Montserrat',
             color: '#333',
             '@media (min-width:600px)': {
               fontSize: '2.2rem',
             },
           },
           h6: {
             fontSize: '1.5rem',
             fontFamily: 'Montserrat',
             color: '#444',
             '@media (min-width:600px)': {
               fontSize: '1.5rem',
             },
           },
         },
         shape: {
           borderRadius: 25,
         },
       });
