import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, fade } from '@material-ui/core/styles';
import { AppBar, Toolbar, TextField, IconButton, Fab } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';





export const MessageInput = (props) => {

    const classes = useStyles();
    const [message, setMessage] = useState("");

    const { submit_chat } = props;


    const onTyping = (e) => {
        setMessage(() => e.target.value)
    }


    const sendMessage = () => {
        let currentMessage = String(message);
        submit_chat(currentMessage)
        setMessage(() => "");
    }



    return (
        <Toolbar className={classes.root}>
            <TextField
                className={classes.input}
                id="outlined-multiline-flexible"
                label="Write some message"
                multiline
                rowsMax={4}
                value={message}
                onChange={onTyping}
                variant="outlined"
            />
            <div className={classes.sendButton}>
                <Fab
                    color="primary"
                    aria-label="add"
                    disabled={message.length < 1}
                    onClick={sendMessage}
                >
                    <CheckIcon />
                </Fab>
            </div>
        </Toolbar>


    );
}

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            marginTop: 'auto',
            bottom: 0

        },
        input: {
            width: "100%"
        },
        sendButton: {
            padding: theme.spacing(2),
        }



    }),
);