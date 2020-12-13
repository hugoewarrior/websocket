import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Slide, Typography, Grid } from '@material-ui/core';
import { ChatBar } from '../_utils/chatbar';
import { MessageInput } from '../_utils/messageInput';
import { ChatBody } from '../_utils/chatBody';

import { ENDPOINT } from './_consts';


const socket = socketIOClient(ENDPOINT);


export const ChatRoom = () => {

    const classes = useStyles();
    const [messages, setMessages] = useState(null);

    useEffect(() => {
        listen_for_websocket();
    }, [])

    const listen_for_websocket = () => {
        socket.on("chat", (response) => update_chat(response))
    }


    const update_chat = (resp) => {
        console.log(messages, "FROM SERVER");
        setMessages((l) => resp);
    }


    /**
     * Send message
     */

    const submit_chat = (message) => {
        console.log("sending chat")
        socket.emit("chat", message);
    }


    return (
        <Slide in={true} direction="left">


            <Grid container spacing={0} justify="center" alignContent="center">

                <Grid item xs={12} sm={12} xl={8} md={8} lg={8}>
                    <div className={classes.chat_layout}>
                        <ChatBar />
                        <ChatBody mss={messages} />
                        <MessageInput submit_chat={submit_chat} />
                    </div>
                </Grid>







            </Grid>

        </Slide>


    );
}

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
        },
        users_status: {
            //padding: theme.spacing(2),
            minWidth: 300,
            maxWidth: "100%",

            minHeight: "18vh",
            maxHeight: "18vh",
            backgroundColor: "grey",


            overflowY: 'scroll'


        },
        chat_layout: {
            minWidth: 300,
            maxWidth: "100%",
            height: "90vh",
            display: 'flex',
            flexDirection: 'column'

        },

    }),
);