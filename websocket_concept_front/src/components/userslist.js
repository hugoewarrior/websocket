import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


import Drawer from '@material-ui/core/Drawer';

const drawerWidth = 250;

export const UsersList = (props) => {

    const classes = useStyles();
    const theme = useTheme();

    const { socket, local_user } = props;
    const [update_users, setUsers] = useState([]);

    useEffect(() => {
        console.log("creating listener")
        listen_for_websocket();
    }, [])


    const listen_for_websocket = () => {

        socket.on("user", (response) => {
            let old_users = [...update_users];
            old_users.push(response);
            let actual_users = old_users;
            setUsers(actual_users)

        })
    }


    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={props.open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={props.hide}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <Divider />

            <List className={classes.root}>
                {update_users.map((row, key) =>
                    < ListItem key={key} >
                        <ListItemAvatar>
                            <Avatar>
                                {row.substring(0, 1).toUpperCase()}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={
                            row.length > 20 ? row.substring(0, 18) + "..." : row
                        } secondary="Online" />
                    </ListItem>
                )}
            </List>

        </Drawer >


    );
}

const useStyles = makeStyles((theme) => ({
    root: {

    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));