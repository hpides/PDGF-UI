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

import React, {useContext} from 'react';
import {TooltipContext} from "./App";
import CustomTooltip from "./CustomTooltip";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";


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
  const tooltipVisible = useContext(TooltipContext);
  return (
      <>
 <div>

<Grid container display="flex" flexDirection="column" justify="flex-start" style={{marginBottom: "20px", border: "1px black solid", borderRadius: "5px", padding: 10,}}>
        <Grid container display="flex" justify="flex-start" style={{alignItems: "center"}} item xs={12}>
            <Grid item > 
                
            <CustomTooltip placement="left" arrow="true" title={tooltipVisible? "Here you can enter the name of your system variable. But please don't use special characters or blanks!": ""}>
                <input 
                                style={{fontSize: "24px", 
                                        width: "220px", 
                                        height: "38px", 
                                        outlineColor: "darkblue", 
                                        border: "none", 
                                        background: "white",
                                        boxShadow: "inset 2px 2px 3px rgba(0,0,0,0.2)", 
                                        paddingLeft: "10px",
                                        borderRadius: "4px",
                                        margin: "2px"}}
                                placeholder = "Enter_Name"
                                value={props.customVariable.name}
                                onChange={(event)=> {props.customSystemVariableNameChangedHandler(event, props.customVariable.variableId)}}
                            /> 
              </CustomTooltip>

            </Grid>

                   
            <Grid item>
                <div style={{display: "flex", width: "30px", paddingLeft: "10px"}}>  
                <CustomTooltip placement="left" arrow="true" title={tooltipVisible? "Press here to delete the variable.": ""}>  
                    <IconButton aria-label="delete table" onClick={() => {props.deleteCustomSystemVariableHandler(props.customVariable.variableId)}}> 
                      <DeleteIcon style={{width: "24px", height: "24px"}}/>
                    </IconButton> 
                </CustomTooltip>
                </div>
            </Grid>

        </Grid>

        <Grid container display="flex" flexDirection="row" justify="space-between" item xs={12}>
               
              <Grid item xs={3}>
                <CustomTooltip  placement="left" arrow="true" title={tooltipVisible? "Enter the value of your variable. You might also write an expression that refers to .... like for example: .....": ""}>  
                  <Typography variant="h6">
                       Value:
                  </Typography>
                </CustomTooltip>  
              </Grid>
               
              <Grid item xs={9}>
                  <input 
                          style={{fontSize: "16px", 
                                  width: "160px", 
                                  height: "22px", 
                                  outlineColor: "darkblue", 
                                  border: "none", 
                                  background: "white",
                                  boxShadow: "inset 2px 2px 3px rgba(0,0,0,0.2)", 
                                  paddingLeft: "10px",
                                  borderRadius: "4px",
                                  margin: "2px"}}
                          placeholder = "Enter_Value"
                          value={props.customVariable.value}
                          onChange={(event)=> {props.customSystemVariableValueChangedHandler(event, props.customVariable.variableId)}}
                      /> 
              </Grid>    
        </Grid>

        <Grid container display="flex" flexDirection="row" justify="space-between" item xs={12}>
               
               <Grid item xs={3}>
                <CustomTooltip placement="left" arrow="true" title={tooltipVisible? "Please specify here the type of your variable. If your variable always is a natural number, write LONG, if your number always is a floating number write DOUBLE, otherwise write VARCHAR.": ""}> 
                   <Typography variant="h6">
                       Type:
                   </Typography>
                </CustomTooltip>
              </Grid>
               
              <Grid item xs={9}>
                  <input 
                          style={{fontSize: "16px", 
                                  width: "160px", 
                                  height: "22px", 
                                  outlineColor: "darkblue", 
                                  border: "none", 
                                  background: "white",
                                  boxShadow: "inset 2px 2px 3px rgba(0,0,0,0.2)", 
                                  paddingLeft: "10px",
                                  borderRadius: "4px",
                                  margin: "2px"}}
                          placeholder = "Enter_Type"
                          value={props.customVariable.dataType}
                          onChange={(event)=> {props.customSystemVariableDataTypeChangedHandler(event, props.customVariable.variableId)}}
                      /> 
              </Grid>    
        </Grid>
</Grid>

</div>



</>
  );
}














      {/*}
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
        onChange = {(event) => {props.customSystemVariableDataTypeChangedHandler(event, props.input.variableId)}}
        //variant="filled" 
        InputProps={{ 
          className: classes.input
        }}/>
      </div>
      </>
  );
}


*/}