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
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";


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



export default function DefaultVariablesComponent(props){
    const classes = useStyles();
    
    return (
        <div>
            <Box className={classes.container} boxShadow={3}>
                    <Typography 
                      className={classes.containerLabel}>
                        Default System Variables
                    </Typography>
                    
                    {props.variables.defaultVariables.map((variable)=>{ return <TextField 
                                                                                  key={variable.variableId}
                                                                                  className={classes.textField} 
                                                                                  id="outined-basic3" 
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

