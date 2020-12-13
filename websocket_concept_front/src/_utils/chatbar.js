import React, { useState, useEffect } from "react";
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import { AppBar, Toolbar, IconButton, Fab } from '@material-ui/core';
import clsx from 'clsx';
import { UsersList } from "../components/userslist";





export const ChatBar = (props) => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const { socket, local_user } = props;

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            <AppBar position="relative" color="primary" className={classes.appBar}
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}

            >
                <Toolbar>
                    <IconButton
                        className={clsx(classes.menuButton, open && classes.hide)}
                        edge="start" color="inherit" aria-label="open drawer"
                        onClick={handleDrawerOpen}
                    >
                        <AccountBoxIcon />
                    </IconButton>
                    <div className={classes.grow} />
                    <IconButton color="inherit">
                        <SearchIcon />
                    </IconButton>
                    <IconButton edge="end" color="inherit">
                        <MoreIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <UsersList local_user={local_user.user} socket={socket} open={open} hide={handleDrawerClose} />

        </>

    );
}

const useStyles = makeStyles((theme) =>
    createStyles({

        text: {
            padding: theme.spacing(2, 2, 0),
        },
        list: {
            marginBottom: theme.spacing(2),
        },
        subheader: {
            backgroundColor: theme.palette.background.paper,
        },
        appBar: {
            top: 'auto',
            bottom: 0,
        },
        grow: {
            flexGrow: 1,
        },
    }),
);