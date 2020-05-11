import React from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Box";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from "@material-ui/icons/Close";


const useStyles = makeStyles((theme) => ({
   container: {
      background: "lightgrey",display: "flex",
      flexDirection: "column",
      width: " 220px",
      padding: "5px",
      margin: "10px",
  },
  textField: {
      width: "240px",
      height: "40px",
      margin: "0px",
  },
  input: {
    height: "40px",
  },
  inputName: {
    fontSize: 18,
  },
  inputRoot: {
    fontSize: 20,
    height: "40px",

  },
  labelRoot: {
    fontSize: 20,
  },
  labelFocused: {
  },
}));

export default function CustomVariablesSubComponent(props) {
  const classes = useStyles();

  return (
      <>
      <div className={classes.container}>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center",}}>
      <div style={{width: "200px", padding: "0", margin: "0"}}>
        <TextField 
        className={classes.textFieldName} 
        id="name" 
        //defaultValue = "Variabe Name"
        value={props.input.name}  
        onChange = {(event) => {props.customSystemVariableNameChangedHandler(event, props.input.variableId)}}
        //variant="filled" 
        InputProps={{ 
          className: classes.inputName
        }}/>
      </div>
      <div style={{display: "flex", width: "30px", }}>  
      <IconButton aria-label="delete table" onClick={() => {props.deleteCustomSystemVariableHandler(props.input.variableId)}}> 
        <CloseIcon />
      </IconButton> 
      </div>
      </div>  
      <TextField 
        className={classes.textField} 
        id="value" 
        //defaultValue = "Variable Value" 
        value = {props.input.value}
        onChange = {(event) => {props.customSystemVariableValueChangedHandler(event, props.input.variableId)}}
        //variant="filled" 
        InputProps={{ 
          className: classes.input
        }}/>
      <TextField 
        className={classes.textField} 
        id="type" 
        //defaultValue = "Variable Type" 
        value = {props.input.type}
        onChange = {(event) => {props.customSystemVariableTypeChangedHandler(event, props.input.variableId)}}
        //variant="filled" 
        InputProps={{ 
          className: classes.input
        }}/>
      </div>
      </>
  );
}