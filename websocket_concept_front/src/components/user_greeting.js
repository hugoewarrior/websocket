import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Slide, Typography, Paper, FormControl, FormGroup, InputLabel, Button, Input, Grid } from '@material-ui/core';
import { ENDPOINT } from './_consts';


const socket = socketIOClient(ENDPOINT);


export const UserGreeting = () => {

  const classes = useStyles();
  const [cuponNumber, setCuponNumber] = useState();
  const history = useHistory();

  return (
    <Slide in={true} direction="left">


      <Grid container spacing={0}>

        <Grid item xs={12} sm={12} xl={12} md={12} lg={12}>
          <div className={classes.paper} style={{ marginTop: 20 }}>
            <Typography align="center" variant="h3" component="h3">
              Webtest
            </Typography>
          </div>
        </Grid>


        <Grid item xs={12} sm={12} xl={12} md={12} lg={12}>
          <Paper className={classes.paper} elevation={1}>
            <FormControl>
              <FormGroup>
                <Typography variant="caption" className={classes.title} component="p">
                  
                  Hola, si estás acá puede ser por dos razones: sentíste curiosidad de saber como funcionan los 
                  Websockets o estás intentando dañarme el server.
                  
                  </Typography>

                  <Typography variant="caption" className={classes.title} component="b">
                  Cual sea el motivo, ¡Suerte!
                  </Typography>                  
              </FormGroup>
            </FormControl>
            <FormControl margin="normal" fullWidth={true}>
              <InputLabel htmlFor="name">Nombre</InputLabel>
              <Input
                onChange={(e) => setCuponNumber(e.target.value)}
                value={cuponNumber} />
            </FormControl>
            <FormControl margin="normal" fullWidth={true}>
              <FormGroup>
                <Button
                  disabled={!cuponNumber}
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={() => history.push("/chatroom")}
                  >
                  Entrar a la sala
                  </Button>
              </FormGroup>
            </FormControl>
          </Paper>
        </Grid>


      </Grid>

    </Slide>


  );
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
    },
    header: {
      textAlign: "center",
      margin: theme.spacing(2) * 2,
    },
    title: {
      marginTop: theme.spacing(2) * 3
    },
    textField: {
      width: 300
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      minWidth: 300,
      maxWidth: 400
    },
    button: {
      marginTop: theme.spacing(2) * 2
    },
  }),
);