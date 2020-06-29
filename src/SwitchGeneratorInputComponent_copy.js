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





export default function SwitchGeneratorInputComponent(props){
    const classes = useStyles();


       
    const caseValueChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        let index = newGenerator.caseOutcomeSets.findIndex(x => x.id === props.id);
        newGenerator.caseOutcomeSets[index].caseValue = event.target.value;
        props.setGeneratorObject(newGenerator);
    };
    
    
    const outcomeGeneratorChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        let index = newGenerator.caseOutcomeSets.findIndex(x => x.id === props.id);
        newGenerator.caseOutcomeSets[index].staticValue = event.target.value;
        props.setGeneratorObject(newGenerator);
    };
    
    
    const deleteCaseOutcomeSet = () => {
        const newGenerator = cloneDeep(props.generatorObject);
        let index = newGenerator.caseOutcomeSets.findIndex(x => x.id === props.id);
        newGenerator.caseOutcomeSets.splice(index, 1);
        props.setGeneratorObject(newGenerator);
    }


    return(
    <Grid 
        container className={classes.container} 
        justify = "flex-start"
        styles={{display: "flex", flexDirection: "row", alignItems: "center"}} 
        >
            
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
                defaultValue="Enter Case" 
                value={props.caseValue} 
                onChange={(event)=>{caseValueChangedHandler(event)}}
            />
        </Grid>

        <Grid item className={classes.framed}xs={2}>
            <Input 
                defaultValue="Enter Outcome" 
                value={props.staticValue} 
                onChange={(event)=> {outcomeGeneratorChangedHandler(event)}}
            />
        </Grid>

        <Grid item  className={classes.framed} xs={1}>
        <div style={{display: "flex", justifycontent: "center", width: "40px", height: "40px" }}>
            
            <IconButton onClick={() => {deleteCaseOutcomeSet()}}>
                <DeleteIcon className={classes.icon}/>
            </IconButton>    
        </div>
        </Grid> 
               
    </Grid>



         
    )
}


