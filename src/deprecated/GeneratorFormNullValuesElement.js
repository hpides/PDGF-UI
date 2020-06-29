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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function GeneratorFormNullValuesElement(props){
  const classes = useStyles();
  const leftColumnWidth = 5;
  const rightColumnWidth = 12 - leftColumnWidth; 
  const fontSizeLeftColumn = "h5"
  
  

 {/*}

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    props.nullValuesChangedHandler(newValue);
  };

  const handleInputChange = (event) => {
    const safeValue = (event.target.value === '' ? '' : Number(event.target.value));
    props.nullValuesChangedHandler(safeValue);
  };


 
  const handleBlur = () => {
    if (props.nullValues < 0) {
      props.nullValuesChangedHandler(0);
    } else if (props.nullValues > 100) {
      props.nullValuesChangedHandler(100)
    }
  };


  */}

  return (
    <>
        <Grid direction="row" container >
                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Null-Values:</Typography>
                </Grid>
                <Grid item xs={rightColumnWidth}>
                    <Grid item xs={4}>
                        <Slider
                            value={typeof props.nullValues === 'number' ? props.nullValues : 0}
                            onChange={(event=>props.nullValuesChangedHandler(event))}
                            aria-labelledby="input-slider"
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <Input
                            className={classes.input}
                            value={props.nullValues}
                            margin="dense"
                            onChange={(event=>props.nullValuesChangedHandler(event))}
                            //onBlur={handleBlur}
                            inputProps={{
                            step: 1,
                            min: 0,
                            max: 100,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                            }}
                        />
                    </Grid>
                </Grid>
        </Grid>
    </>
  );
}