import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, fade } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { Typography } from "@material-ui/core";


export const ChatBody = (props) => {

    const classes = useStyles();
    const [local_messages, setLocalMss] = useState([]);

    const { mss, local_user } = props


    useEffect(() => {
        console.log(mss, local_user, "from chat")
        if (mss) show_new_message(mss.message);
    }, [mss])

    useEffect(() => {
        scroll_down();
    }, [local_messages])

    const show_new_message = (newMessage) => {
        console.log(newMessage, "HE")
        let old_messages = [...local_messages];
        old_messages.push(newMessage);
        let actual_messages = old_messages;
        setLocalMss(() => actual_messages);
    }


    const scroll_down = () => {
        var objDiv = document.getElementById("test");
        objDiv.scrollTop = objDiv.scrollHeight;
    }


    const others_messages = (message, user, key) => (
        < ListItem key={key}>
            <ListItemAvatar>
                <Avatar>
                    {user.substring(0, 1).toUpperCase()}
                </Avatar>
            </ListItemAvatar>
            <ListItemText secondary={message} />
        </ListItem >
    )


    const my_messages = (message, user, key) => (
        < ListItem key={key}>
            <ListItemText style={{ textAlign: 'right', marginRight: 10 }} secondary={message} />
            <ListItemAvatar>
                <Avatar>
                    {user.substring(0, 1).toUpperCase()}
                </Avatar>
            </ListItemAvatar>
        </ListItem >
    )




    return (

        <List className={classes.root} id="test">
            { local_messages.length > 0 ? local_messages.map((row, key) =>
                row.user == local_user.user ? my_messages(row.message, row.user, key) : others_messages(row.message, row.user, key)

            )
                : <Typography>No messages yet</Typography>}
        </List>

    );
}

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto'
        },

    }),
);