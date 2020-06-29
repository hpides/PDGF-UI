/*
 * WALT - A realistic load generator for web applications.
 *
 * Copyright 2020 Eric Ackermann <eric.ackermann@student.hpi.de>, Hendrik Bomhardt
 * <hendrik.bomhardt@student.hpi.de>, Benito Buchheim
 * <benito.buchheim@student.hpi.de>, Juergen Schlossbauer
 * <juergen.schlossbauer@student.hpi.de>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
                                                                          customSystemVariableDataTypeChangedHandler={props.customSystemVariableDataTypeChangedHandler}
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