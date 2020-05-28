import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    
  }));

export default function Header(){
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar  display="flex" justifycontent="space-between">
                    <Typography variant="h6" >
                    Bankmark - PDGF-Online
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}



