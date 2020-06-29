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
import cloneDeep from 'lodash/cloneDeep';
import {generatorFormStyles, generatorFormsLeftColumnWidth, generatorFormsRightColumnWidth, generatorFormFontSizeLeftColumn} from "./styles";

const useStyles = makeStyles({ ... generatorFormStyles});

export default function FormDateTimeGenerator(props) {
    const classes = useStyles();
    const leftColumnWidth = generatorFormsLeftColumnWidth;
    const rightColumnWidth = generatorFormsRightColumnWidth; 
    const fontSizeLeftColumn = generatorFormFontSizeLeftColumn;


    // Change Handler startDate
    const startDateChangedHandler = (event) => {
      const newGenerator = cloneDeep(props.generatorObject);
      newGenerator.startDate = event.target.value;
      props.setGeneratorObject(newGenerator);
    };

     // Change Handler endDate
     const endDateChangedHandler = (event) => {
      const newGenerator = cloneDeep(props.generatorObject);
      newGenerator.endDate = event.target.value;
      props.setGeneratorObject(newGenerator);
    };

    // Change Handler disableRng
    const disableRngChangedHandler = (event) => {
      const newGenerator = cloneDeep(props.generatorObject);
      newGenerator.disableRng = event.target.checked;
      props.setGeneratorObject(newGenerator);
    };

    // Change Handler fixedStepSize
    const fixedStepSizeChangedHandler = (event) => {
      const newGenerator = cloneDeep(props.generatorObject);
      newGenerator.fixedStepSize = event.target.checked;
      props.setGeneratorObject(newGenerator);
  };

    

  return (
    <>
        <Grid container className={classes.outerContainer}>        
            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                        Start-Date:
                    </Typography>
                </Grid>
            </Grid>

            <Grid item xs={rightColumnWidth}>
                <input 
                    className={classes.input}
                    type="date" 
                    placeholder="Enter Start-Date" 
                    value={props.generatorObject.startDate} 
                    onChange={(event) => startDateChangedHandler(event)}
                />
            </Grid>

            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn} fullwidth>
                        End-Date:
                    </Typography>
                </Grid>
            </Grid>

            <Grid item xs={rightColumnWidth}>
                <Input 
                    className={classes.input} 
                    type="date" 
                    placeholder="Enter End-Date" 
                    value={props.generatorObject.endDate} 
                    onChange={(event) => endDateChangedHandler(event)}
                />
            </Grid>

            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn} fullWidth >
                        Disable RNG*:
                    </Typography>
                </Grid>
            </Grid>

            <Grid item xs={rightColumnWidth}>
              <Checkbox 
                    inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                    checked={props.generatorObjectRng}
                    onChange={(event)=> {disableRngChangedHandler(event)}}
                    />
            </Grid>


            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn} fullWidth>
                        Fixed Step Size*:
                    </Typography>
                </Grid>
            </Grid>

            <Grid item xs={rightColumnWidth}>
              <Checkbox 
                    inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                    checked={props.generatorObject.fixedStepSize}
                    onChange={(event)=> {fixedStepSizeChangedHandler(event)}}
                    />
            </Grid>       
      
      </Grid>

    </>
  );
}

