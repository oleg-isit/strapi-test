import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import {Box, IconButton, Typography} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {resetAuth} from "../store/auth/reducer";
import {getHeaderContent} from "../store/content/actions";
import {headerContentSelector} from "../store/content/selectors";
import {userDataSelector} from "../store/auth/selectors";


export function Header() {
    const dispatch = useDispatch();
    const headerContent = useSelector(headerContentSelector);
    const userData = useSelector(userDataSelector);
    useEffect(() => {
        dispatch(getHeaderContent({}))
    }, [])
    const handleLogOut = () => {
        dispatch(resetAuth())
    }
    return (
        <AppBar position="static">
            <Container sx={{minWidth: "90vw"}}>
                {headerContent && <Toolbar disableGutters>
                    <img alt={"logo"} style={{height: "80px"}} src={process.env.REACT_APP_URL + headerContent.logoUrl}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            ml: 2,
                            display: 'flex',
                            fontSize: "30px",
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {headerContent.companyName}
                    </Typography>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: 'flex',
                            fontSize: "20px",
                            fontFamily: 'Arial',
                            fontWeight: 500,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            flexGrow: 1,
                            justifyContent: "center"
                        }}
                    >
                        {headerContent.description}
                    </Typography>
                    <Box sx={{minWidth: 270, width: "max-content", display: "flex", alignItems: "center"}}>
                        {
                            userData && <>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="a"
                                    href="/"
                                    sx={{
                                        mr: 2,
                                        display: {xs: 'none', md: 'flex'},
                                        fontSize: "20px",
                                        fontFamily: 'Arial',
                                        fontWeight: 500,
                                        letterSpacing: '.3rem',
                                        color: 'inherit',
                                        textDecoration: 'none',
                                    }}
                                >
                                    {userData.email}
                                </Typography>
                                <IconButton onClick={handleLogOut}>
                                    <LogoutIcon sx={{fill: "white"}}/>
                                </IconButton>
                            </>
                        }
                    </Box>
                </Toolbar>}

            </Container>
        </AppBar>
    );
}
