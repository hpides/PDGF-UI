import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import {shadow} from "@material-ui/system";


const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex", 
    flexDirection: "column", 
    width: "260px",
    //borderColor: "black", 
    //borderWidth: "3px", 
    //borderStyle: "dashed", 
    borderRadius: "5px", 
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
    fontSize: 21,
    fontWeight: 500,
  },

  textField: {
    marginTop: "5px",
    marginBottom: "5px",
    marginLeft: "auto",
    marginRight: "auto",
    width: "240px",
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



export default function DefaultVariablesComponent02(props){
    const classes = useStyles();
    
    return (
        <div>
            <Box className={classes.container} boxShadow={3}>
                    <Typography 
                      className={classes.containerLabel}>
                        Default System Variables
                    </Typography>
                    
                    {props.variables.defaultVariables.map((variable)=>{ return <TextField 
                                                                                  className={classes.textField} 
                                                                                  id="outlined-basic" 
                                                                                  label={variable.name}
                                                                                  value={variable.value}
                                                                                  onChange={(event) => {props.defaultSystemVariableValueChangedHandler(event, variable.variableId)}}
                                                                                  variant="outlined" 
                                                                                  InputProps={{ classes: { root: classes.inputRoot } }}
                                                                                  InputLabelProps={{
                                                                                    classes: {
                                                                                      root: classes.labelRoot,
                                                                                      focused: classes.labelFocused
                                                                                    }}}
                                                                                />
                                                                        }
                                                            )
                    }
                        

            </Box>
        </div>
    )
}

