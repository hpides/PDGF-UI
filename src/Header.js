import React from "react";
import AppBar from "@material-ui/core/AppBar";
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
                <Toolbar  display="flex" style={{paddingRight: "45px"}}>
                    
                    <Typography variant="h4" style={{flex: "1"}}>
                    Bankmark - PDGF-Online
                    </Typography>
                    <Typography variant="h6" >
                    Help 
                    </Typography>


                </Toolbar>
            </AppBar>
        </div>
    )
}



