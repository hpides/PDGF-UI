import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '50ch',
      },
    },
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    inputRoot: {
        fontSize: 24,
    },
    labelRoot: {
        fontSize: 20,
        color: "lightgrey",
        "&$labelFocused": {
          color: "black"
        }
    },
    
    labelFocused: {},
  }));



export default function SchemaNameElement(props){
    const classes = useStyles();
    return(
        <Grid className={classes.container}>
            {/* <Grid item>
            <Typography variant="h5">
                Schema Name: 
            </Typography>
            </Grid>
            */}
            <Grid item>
            <form className={classes.root} noValidate autoComplete="off">
            <TextField 
                className={classes.textField} 
                variant="outlined" 
                label="Schema Name"
                value={props.schemaName}
                onChange = {(event) => {props.schemaNameChangedHandler(event)}}
                InputProps={{ classes: { root: classes.inputRoot } }}
                InputLabelProps={{
                    classes: {
                      root: classes.labelRoot,
                      focused: classes.labelFocused
                    }
                }}
            />
            </form>
            </Grid>
        </Grid>
    )
}