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

import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import IfGeneratorInputComponent from "./IfGeneratorInputComponent";
import cloneDeep from 'lodash/cloneDeep';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import TextField from "@material-ui/core/TextField";
import GeneratorSelectionField from "./GeneratorSelectionField";
import {generatorFormStyles, generatorFormsLeftColumnWidth, generatorFormsRightColumnWidth, generatorFormFontSizeLeftColumn} from "./styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const useStyles = makeStyles({ ... generatorFormStyles});

export default function FormIfGenerator(props) {
    const classes = useStyles();
    const leftColumnWidth = generatorFormsLeftColumnWidth;
    const rightColumnWidth = generatorFormsRightColumnWidth; 
    const fontSizeLeftColumn =generatorFormFontSizeLeftColumn;
   
    // Change Handler dictionary
   
    const ifChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.if = event.target.value;
        props.setGeneratorObject(newGenerator);
    };

    const thenChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.then = event.target.value;
        props.setGeneratorObject(newGenerator);
    };

    const elseChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.else = event.target.value;
        props.setGeneratorObject(newGenerator);
    };
    
    const addGenerator = () => {
        const newGenerator = cloneDeep(props.generatorObject);
        const newGeneratorSelection = {uid: ""};
        newGenerator.generatorList.push(newGeneratorSelection);
        props.setGeneratorObject(newGenerator); 
      }
     

  return (
    <>
    
        <Grid container className={classes.outerContainer}>

            <Grid container item xs={12}>
                {props.generatorObject.generatorList.map((generator, index) => <GeneratorSelectionField 
                                                                                    generator={generator} 
                                                                                    index={index}
                                                                                    generatorObject={props.generatorObject}
                                                                                    setGeneratorObject={props.setGeneratorObject}/>
                
                )}
                </Grid> 

                <Grid container item xs={11} justify="flex-end" style={{marginBottom: 30}}>
                
                    <Button
                        variant="outlined"
                        color="inherit"
                        className={classes.addButton}
                        startIcon={<AddCircleIcon/>}
                        onClick={() => {addGenerator()}}>
                            Add Sub-Generator
                    </Button>
            
                </Grid>  


            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                        If:
                    </Typography>
                </Grid>
            </Grid>

            <Grid item xs={rightColumnWidth}>
                <input 
                    className={classes.input} 
                    type="text" 
                    placeholder="Enter If-Condition" 
                    value={props.generatorObject.if} 
                    multiline
                    onChange={(event) => ifChangedHandler(event)}/>
            </Grid>
        
            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                        Then:
                    </Typography>
                </Grid>
            </Grid>

            <Grid item xs={rightColumnWidth}>
                <input 
                    className={classes.input} 
                    type="text" 
                    placeholder="Enter then-value" 
                    value={props.generatorObject.then} 
                    multiline
                    onChange={(event) => thenChangedHandler(event)}/>
            </Grid>



            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                        Else:
                    </Typography>
                </Grid>
            </Grid>

            <Grid item xs={rightColumnWidth}>
                <input 
                    className={classes.input} 
                    type="text" 
                    placeholder="Enter else-value" 
                    value={props.generatorObject.else} 
                    multiline
                    onChange={(event) => elseChangedHandler(event)}/>
            </Grid>

        </Grid>
  
    </>
  );
}