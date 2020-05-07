import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import BuildIcon from "@material-ui/icons/Build";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CloseIcon from "@material-ui/icons/Close";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "row",
        height: "60px",
        width: " 400px",
    },
    button: {
        height: "50px",
        width: "50px",
    },
    textField01: {
    },
    textField02: {
        width: "80px",
    },
  }));



export default function TableSubComponent(){
    const classes = useStyles();

    return(
    <div className={classes.container}>
      
        <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<VpnKeyIcon />}
        />
    
        <TextField 
            fullWidth
            id="standard-basic" 
            label="Field Name" 
            classes={classes.textField01}
        />

        <TextField 
            id="standard-basic"     
            label="Generator"
            classes={classes.textField02}
            />

        <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<BuildIcon />}
        />

        <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<DeleteIcon />}
        />


               
    </div>
    )
}