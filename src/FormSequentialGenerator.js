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

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import GeneratorSelectionField from "./GeneratorSelectionField";
import cloneDeep from 'lodash/cloneDeep';
import Collapse from '@material-ui/core/Collapse';
import Button from "@material-ui/core/Button";
import {generatorFormStyles, generatorFormsLeftColumnWidth, generatorFormsRightColumnWidth, generatorFormFontSizeLeftColumn, generatorFormFontSizeSecondLevel } from "./styles";

const useStyles = makeStyles({ ... generatorFormStyles});


export default function FormSequentialGenerator(props) {
    const classes = useStyles();
    const leftColumnWidth = generatorFormsLeftColumnWidth;
    const rightColumnWidth = generatorFormsRightColumnWidth; 
    const fontSizeLeftColumn = generatorFormFontSizeLeftColumn;
    const fontSizeSecondLevel = generatorFormFontSizeSecondLevel;
    
    // Change Handler Input Fields
    const concatenateResultsChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.concatenateResults = event.target.checked;
        props.setGeneratorObject(newGenerator);
    };

    const delimiterChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.delimiter = event.target.value;
        props.setGeneratorObject(newGenerator);
    };
   
    const delimitEmptyValuesChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.delimitEmptyValues = event.target.checked;
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

            <Grid container item xs={11} justify="flex-end">
               
                <Button
                    variant="outlined"
                    color="inherit"
                    className={classes.addButton}
                    startIcon={<AddCircleIcon/>}
                    onClick={() => {addGenerator()}}>
                        Add Sub-Generator
                </Button>
               
               {/*}
                <div style={{display: "flex", flexDirection: "row", justifycontent: "flex-start", alignItems: "center"}}>
                      <IconButton onClick={() => {addGenerator()}}>
                          <AddCircleIcon/>
                      </IconButton>
                      <Typography 
                          className={classes.actionLink} 
                          onClick={() => {addGenerator()}}>
                          Add Generator
                      </Typography>
            </div> */}

            </Grid>  


            <Grid className={classes.innerContainer} container item xs={leftColumnWidth}>
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                        Concat. Results:
                    </Typography>
                </Grid>
            </Grid>

            <Grid item xs={rightColumnWidth}>
                <Checkbox 
                    inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                    checked={props.generatorObject.concatenateResults}
                    onChange={(event)=> {concatenateResultsChangedHandler(event)}}
                    />
            </Grid>

        </Grid>

            <Collapse in={props.generatorObject.concatenateResults}>
                <>
                <Grid container className={classes.outerContainer}>
                    <Grid container className={classes.innerContainer} item xs={leftColumnWidth}>
                        <Grid item >
                            <div/>
                        </Grid>
                    </Grid>


                    <Grid container  item xs={rightColumnWidth}>

                        <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                            <Grid item >
                                <Typography variant={fontSizeSecondLevel}>
                                    Delimiter:
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid item xs={rightColumnWidth}>
                            <input 
                                className={classes.inputSecondLevel} 
                                type="text" 
                                placeholder="Enter Delimiter" 
                                value={props.generatorObject.delimiter} 
                                onChange={(event) => delimiterChangedHandler(event)}/>
                        </Grid>

                        <Grid className={classes.innerContainer} container item xs={leftColumnWidth} style={{alignContent: "center"}} >
                            <Grid item >
                                <Typography variant={fontSizeSecondLevel}>
                                    Delimit Blanks:
                                </Typography>
                            </Grid>
                            
                        </Grid>

                        <Grid container item xs={rightColumnWidth} style={{alignContent: "center"}}>
                            <Checkbox 
                                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                                checked={props.generatorObject.delimitEmptyValues}
                                onChange={(event)=> {delimitEmptyValuesChangedHandler(event)}}
                            />
                        </Grid>
                    </Grid>    
                </Grid>

                </>  
            </Collapse>

    </>
  );
}