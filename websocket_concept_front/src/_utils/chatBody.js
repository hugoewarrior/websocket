import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, fade } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { Typography } from "@material-ui/core";



const test = "hdjkdfhkjdfhkjdhfkjhkfhd"

export const ChatBody = (props) => {

    const classes = useStyles();
    const [local_messages, setLocalMss] = useState([]);

    const { mss } = props


    useEffect(() => {
        console.log(mss, "from chat")
        show_new_message(mss);
    }, [mss])


    const show_new_message = (newMessage) => {
        console.log(local_messages, "HE")
        let old_messages = [...local_messages];
        old_messages.push(newMessage);
        let actual_messages = Object.assign(old_messages, []);
        setLocalMss(() => actual_messages);
    }


    const others_messages = (message, user, key) => (
        < ListItem key={key}>
            <ListItemAvatar>
                <Avatar>
                    {test.substring(0, 1).toUpperCase()}
                </Avatar>
            </ListItemAvatar>
            <ListItemText secondary={message} />
        </ListItem >
    )


    const my_messages = (message, user, key) => (
        < ListItem >
            <ListItemText style={{ textAlign: 'right', marginRight: 10 }} secondary={message} />
            <ListItemAvatar>
                <Avatar>
                    {test.substring(0, 1).toUpperCase()}
                </Avatar>
            </ListItemAvatar>
        </ListItem >
    )




    return (

        <List className={classes.root}>
            { local_messages.length > 1 ? local_messages.map((row, key) =>
                 row == null ? my_messages() : others_messages(row, " ", key)

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
            backgroundColor: 'green',
            overflowY: 'scroll'
        },

    }),
);