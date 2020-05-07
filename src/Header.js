import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";


export default function Header(){

    return(
        <AppBar position="static">
            <Toolbar  display="flex" justifyContent="space-between">
                <Typography variant="h6" >
                Bankmark - PDGF-Online
                </Typography>
            </Toolbar>
        </AppBar>
    )
}



