import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import CustomVariablesSubComponent from "./CustomVariablesSubComponent";
import {shadows} from "@material-ui/system";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";


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
      paddingLeft: "1px",
      margin: "10px",
    },
    containerLabel: {
      position: "relative",
      top: "0px",
      fontSize: 20,
    },
  }));



export default function CustomVariablesContainer(props){
    const classes = useStyles();
    const data = props.var;
    
    return (
        <div>
        <Box className={classes.container} boxShadow={3}>
                <Typography className={classes.containerLabel}>Custom System Variables</Typography>  
                <div>
                {props.variables.customVariables.map(element => {return <CustomVariablesSubComponent 
                                                                          input = {element} 
                                                                          customSystemVariableNameChangedHandler={props.customSystemVariableNameChangedHandler}
                                                                          customSystemVariableValueChangedHandler={props.customSystemVariableValueChangedHandler}
                                                                          customSystemVariableTypeChangedHandler={props.customSystemVariableTypeChangedHandler}
                                                                          deleteCustomSystemVariableHandler ={props.deleteCustomSystemVariableHandler}                                                                        
                                                                          />})}
                </div> 
                <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", alignContent: "flex-start",}}>
                  <IconButton onClick={() => {props.addCustomVariableHandler()}}>
                    <AddCircleIcon/>
                  </IconButton>
                  <Typography 
                    className={classes.actionLink} 
                    onClick={() => {props.addCustomVariableHandler()}}>InsertVariable</Typography>
                </div>  
        </Box>
        </div>
    )
}