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
import DeleteIcon from "@material-ui/icons/Delete";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import cloneDeep from 'lodash/cloneDeep';

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "row",
        height: "40px",
        width: " 600px",
        background: "inherit",
    },
    textField01: {
    },
    textField02: {
        width: "80px",
    },
    framed: {
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "black",
    },
    buttonGrid: {
        width: "60px",
    },
    icon: {
        width: 25,
        height: 25,
        margin: "auto",
    },

  }));





export default function ProbabilityValueInputComponent(props){
    const classes = useStyles();


       
    const valueChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        let index = newGenerator.valueProbabilitySets.findIndex(x => x.id === props.id);
        newGenerator.valueProbabilitySets[index].value = event.target.value;
        props.setGeneratorObject(newGenerator);
    };
    
    
    const probabilityChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        let index = newGenerator.valueProbabilitySets.findIndex(x => x.id === props.id);
        newGenerator.valueProbabilitySets[index].probability = event.target.value;
        props.setGeneratorObject(newGenerator);
    };
    
    
    const deleteValueProbabilitySet = () => {
        const newGenerator = cloneDeep(props.generatorObject);
        let index = newGenerator.valueProbabilitySets.findIndex(x => x.id === props.id);
        newGenerator.valueProbabilitySets.splice(index, 1);
        props.setObjectGenerator(newGenerator);
    }


    return(
    <Grid 
        container className={classes.container} 
        justify = "flex-start"
        styles={{display: "flex", flexDirection: "row", alignItems: "center"}} 
        xs={12}>
            
        <Grid  item className={classes.framed} xs={2}>
        <div style={{display: "flex", justifycontent: "center", width: "40px", height: "40px" }}>
            <Input 
                value={props.id} 
                readOnly="readOnly"
                maxLength={3}
            />
        </div>
        </Grid>

        <Grid  item className={classes.framed}xs={7}>
            <Input 
                defaultValue="Enter Value" 
                value={props.value} 
                onChange={(event) =>
                {valueChangedHandler(event)}}
            />
        </Grid>

        <Grid item className={classes.framed}xs={2}>
            <Input 
                defaultValue="Enter Probability" 
                value={props.probability} 
                onChange={(event) =>
                {probabilityChangedHandler(event)}}
            />
        </Grid>

        <Grid item  className={classes.framed} xs={1}>
        <div style={{display: "flex", justifycontent: "center", width: "40px", height: "40px" }}>
            
            <IconButton onClick={() => {props.deleteValueProbabilitySet(props.data.tableId, props.data.rowId)}}>
                <DeleteIcon className={classes.icon}/>
            </IconButton>    
        </div>
        </Grid> 
               
    </Grid>



         
    )
}


