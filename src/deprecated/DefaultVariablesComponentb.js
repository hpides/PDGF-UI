import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import DefaultVariablesSubComponent from "../DefaultVariablesSubComponent";


const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex", 
    flexDirection: "column", 
    width: "300px",
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
    fontWeight: 500,
    marginBottom: 20,
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



export default function DefaultVariablesComponent(props){
    const classes = useStyles();
    
    return (

        <Grid 
            container 
            item
            className="variablesSubContainer" 
            display="flex" 
            flexDirection="column" 
            justify="center" 
            alignContent="flex-start"
            style={{ 
                height: "40%", 
                width: "350px", 
                backgroundColor: "pink", 
                padding: "10px", 
                paddingTop: "5px",
                borderColor: "white", 
                borderStyle: "dashed", 
                borderWidth: "1px", 
                }}>   
                
                    <Box className={classes.container} boxShadow={3}>
                        <Typography 
                            variant="h4"
                            className={classes.containerLabel}>
                                Default Variables
                        </Typography>


                            <div 
                                className="variablesSubContainer1"
                                style={{
                                    height: "80%",
                                    overflow: "auto",
                                    display: "flex",
                                    flexDirection: "column",
                                    justify: "flex-start",
                                    alignContent: "center",
                                }}>
              
                                        {props.variables.defaultVariables.map((variable)=>{ return <DefaultVariablesSubComponent 
                                                                                                        defaultVariable={variable} 
                                                                                                        defaultVariableValueChangedHandler = {props.defaultSystemVariableValueChangedHandler}
                                                                                                    /> 
                                                                                                })} 
                            </div>    

                    </Box>
        </Grid>
       
    )
}

