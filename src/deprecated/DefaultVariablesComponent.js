import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex", 
    flexDirection: "column", 
    width: "240px",
    borderColor: "black", 
    borderWidth: "3px", 
    borderStyle: "dashed", 
    borderRadius: "15px", 
    background: "lightgrey",
    paddingTop: "0px",
    paddingRight: "5px",
    paddingBottom: "2px",
    paddingLeft: "5px",
    margin: "10px",
  },

  containerLabel: {
    position: "relative",
    top: "0px",
    fontSize: 20,
  },

  textField: {
    margin: "5px",
    width: "200px",
  },

  inputRoot: {
    fontSize: 20
  },

  labelRoot: {
    fontSize: 20,
    color: "red",
    "&$labelFocused": {
      color: "black"
    }
  },

  labelFocused: {},
  }));



export default function DefaultVariablesComponent(){
    const classes = useStyles();
    
    return (
        <div>
        <Box className={classes.container} style={{ }}>
                <Typography 
                  className={classes.containerLabel}>
                    Default System Variables
                </Typography>
                <TextField 
                  className={classes.textField} 
                  id="outlined-basic1" 
                  label="Root-Seed" 
                  variant="outlined" 
                  InputProps={{ classes: { root: classes.inputRoot } }}
                  InputLabelProps={{
                    classes: {
                      root: classes.labelRoot,
                      focused: classes.labelFocused
                    }
                  }}/>
                <TextField 
                  className={classes.textField} 
                  id="outlined-basic2" 
                  label="Scale Factor" 
                  variant="outlined" 
                  InputProps={{ 
                    classes: { root: classes.inputRoot } }}
                  InputLabelProps={{
                    classes: {
                      root: classes.labelRoot,
                      focused: classes.labelFocused
                    }
                  }}/>

        </Box>
        </div>
    )
}