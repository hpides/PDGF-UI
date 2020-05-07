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
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "row",
        height: "40px",
        width: " 600px",
    },
    textField01: {
    },
    textField02: {
        width: "80px",
    },
    framed: {
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "black",
    },
    buttonGrid: {
        width: "60px",
    },
    icon: {
        width: 25,
        height: 25,
        margin: "auto",
    },

  }));



export default function TableSubComponent02(){
    const classes = useStyles();

    return(
    <Grid container className={classes.container}>
        <Grid container item style={{width: "40px", height: "40px"}} className={classes.framed}>
        <div style={{display: "flex", justifyContent: "center", width: "40px", height: "40px" }}>
            <VpnKeyIcon className={classes.icon}/>
        </div>
        </Grid>

        <Grid container item style={{width: "200px"}} className={classes.framed}>
        <TextField 
            fullWidth
            id="standard-basic" 
            label="Field Name" 
            classes={classes.textField01}
        />
        </Grid>

        <Grid container item style={{width: "150px"}} className={classes.framed}>
        <TextField 
            id="standard-basic"     
            label="Generator"
            classes={classes.textField02}
            />
        </Grid>


        <Grid container item style={{width: "40px", height: "40px"}} className={classes.framed}>
        <div style={{display: "flex", justifyContent: "center", width: "40px", height: "40px" }}>
            <BuildIcon className={classes.icon} />
        </div>
        </Grid>




        <Grid container item style={{width: "40px", height: "40px"}} className={classes.framed}>
        <div style={{display: "flex", justifyContent: "center", width: "40px", height: "40px" }}>
            <DeleteIcon className={classes.icon}/>
        </div>
        </Grid>

               
    </Grid>
    )
}