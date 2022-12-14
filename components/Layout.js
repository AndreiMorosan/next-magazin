import React, {useContext} from 'react';
import Head from 'next/head';
import {AppBar, Toolbar, Typography,Container, Link, createMuiTheme,ThemeProvider, CssBaseline,Switch} from '@material-ui/core';
import useStyles from '../utils/styles';
import { createTheme } from '@material-ui/core/styles';
import NextLink from 'next/link';
import {Store} from '../utils/Store';

export default function Layout({title,description,children}){
    const {state,dispatch} = useContext(Store);
    const {darkMode} = state;

    const theme =createTheme({
        typography:{
            h1:{
                fontSize: '1.6rem',
                fontWeight: 400,
                margin: '1rem 0',
            },
            h2:{
                fontSize: '1.4rem',
                fontWeight: 400,
                margin: '1rem 0',
            },
            palette:{
                type: darkMode? 'dark' : 'light',
                primary: {
                    main: '#f0c000',
                },
                secondary: {
                    main: '#208080',
                }
            }
        },
    });
    const classes = useStyles();
    const darkModeChangeHandler = () =>{
        dispatch({type: darkMode ? 'DARK_MODE_OFF': 'DARK_MODE_ON'});
    }
    return(
        <div>
            <Head>
                <title>{title? `${title} - Magazin Online`: 'Magazin Online'}</title >
                {description && <meta name="description" content={description}></meta>}
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
            <AppBar position="static" className={classes.navbar}>
                <Toolbar>
                <NextLink href='/' passHref>
                    <Link>
                    <Typography className={classes.brand}>Magazin</Typography>
                    </Link>
                </NextLink>
                   <div className={classes.grow}></div>
                   {/* <Switch checked={darkMode} onChange={darkModeChangeHandler}></Switch> */}
                   <NextLink href="/cart" passHref>
                    <Link>Cart</Link>
                   </NextLink>
                   <NextLink href="/login" passHref>
                    <Link>Login</Link>
                   </NextLink>
                </Toolbar>
            </AppBar>
            </ThemeProvider>
            
            <Container  className={classes.main}>
                {children}
            </Container>
            <footer className={classes.footer}>
                <Typography>All rights reserved.Next Magazin</Typography>
            </footer>    

        </div>
    )
}