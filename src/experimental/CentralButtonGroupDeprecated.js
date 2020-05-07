import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AlarmIcon from "@material-ui/icons/Alarm";
import AppleIcon from "@material-ui/icons/Apple";
import AllInboxIcon from "@material-ui/icons/AllInbox";



const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(3),
      padding: "auto"
    },
    outerContainer: {
        width: "1000px",
        height: "700px",
    },
  }));

export default function CentralButtonGroup(){
    const classes = makeStyles();

    return(
        <div style={{background: "green", height: "90vh", display: "flex", justify: "center"}}>
            <Grid  style={{background: "red", height: "90vh", margin: "auto"}} container item direction="column" justify="center">
                
                <Grid item style={{background: "yellow", height: "200px", width: "500px", padding: "30px"}}>
                    <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<AppleIcon />}
                    >
                        Load Schema from Repo
                    </Button>
                </Grid>
                <Grid item style={{background: "orange", height: "200px", width: "500px", padding: "30px"}}>
                    <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<AllInboxIcon />}
                    >
                        Load Schema from Disc
                    </Button>
                </Grid>
                <Grid item style={{background: "brown",  height: "200px", width: "500px", padding: "30px"}}>
                    <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<AlarmIcon />}
                    >
                        Create Schema with Editor
                    </Button>
                </Grid>
            </Grid>
         </div>   
    )
    
};