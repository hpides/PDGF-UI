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

import React, {useContext} from "react";
import {TooltipContext} from "./App";
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from '@material-ui/icons/Info';
import CustomTooltip from "./CustomTooltip";
import {infoIconStyles} from "./styles";

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
        justifycontent: "flex-start",
    },
    inputRoot: {
        fontSize: "30px",
    },
    labelRoot: {
        fontSize: "30px",
        color: "lightgrey",
        "&$labelFocused": {
          color: "black"
        }
    },
    
    labelFocused: {},
  }));



export default function SchemaNameElement(props){
    const classes = useStyles();
    const tooltipVisible = useContext(TooltipContext);
    const toolTipSchemaName = `
        Here some infos about the Schema:
        Schema name:  ${props.schemaName}
        Schema author: ${props.author}. 
        Schema description: ${props.description}`

    return(
        <Grid container display="flex" direction="row" justify="flex-start" className={classes.container}>
            {/* <Grid item>
            <Typography variant="h5">
                Schema Name: 
            </Typography>
            </Grid>
            */}
            <Grid item >
            <CustomTooltip  placement="bottom" arrow="true" title={tooltipVisible? "Please enter a Name for your Schema. But remember not use special characters or blanks.": ""}>   
            <form className={classes.root} noValidate autoComplete="off">
            
                <TextField 
                    className={classes.textField} 
                    variant="outlined" 
                    label="Schema_Name"
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
            </CustomTooltip>
            </Grid>
            <Grid item  >
              <CustomTooltip title={toolTipSchemaName} placement="right-start">
                <IconButton>
                  <InfoIcon style={{color: "#385fe0"}}/>
                </IconButton>
              </CustomTooltip>
            </Grid>
        </Grid>
    )
}
