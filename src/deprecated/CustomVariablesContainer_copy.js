import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import CustomVariablesSubComponent from "../CustomVariablesSubComponent";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import "./CustomScrollbar.css";


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
      overflow: "auto",
    },
    containerLabel: {
      position: "relative",
      top: "0px",
      fontSize: 21,
      fontWeight: 500,
    },
    actionLink: {
      color: "grey",
      '&:hover': {
        color: "blue",
      }
    },
  }));



export default function CustomVariablesContainer(props){
    const classes = useStyles();
    
    return (
        <div>
        <Box className={classes.container} boxShadow={3}>
                <Typography className={classes.containerLabel}>Custom System Variables</Typography>  
                <div>
                {props.variables.customVariables.variableItems.map(element => {return <CustomVariablesSubComponent 
                                                                          key = {element.variableId}
                                                                          input = {element} 
                                                                          customSystemVariableNameChangedHandler={props.customSystemVariableNameChangedHandler}
                                                                          customSystemVariableValueChangedHandler={props.customSystemVariableValueChangedHandler}
                                                                          customSystemVariableTypeChangedHandler={props.customSystemVariableTypeChangedHandler}
                                                                          deleteCustomSystemVariableHandler ={props.deleteCustomSystemVariableHandler}                                                                        
                                                                          />})}
                </div> 
                <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center",}}>
                  <IconButton onClick={() => {props.addCustomVariableHandler()}}>
                    <AddCircleIcon/>
                  </IconButton>
                  <Typography 
                    className={classes.actionLink} 
                    onClick={() => {props.addCustomVariableHandler()}}>Insert Variable</Typography>
                </div>  
        </Box>
        </div>
    )
}