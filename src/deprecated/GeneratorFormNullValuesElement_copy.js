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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/slider";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  input: {
    fontSize: 20,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function GeneratorFormNullValuesElement(props) {
  const classes = useStyles();
  const leftColumnWidth = 5;
  const rightColumnWidth = 12 - leftColumnWidth; 
  const fontSizeLeftColumn = "h5"


  return (
    <Grid container style={{background: "inherit"}}>
    
    
      <ExpansionPanel style={{width: 960}}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header">
  
          <Grid item xs={leftColumnWidth} style={{background: "inherit"}}>
            <Typography variant={fontSizeLeftColumn}>
              NullValues:
            </Typography>
          </Grid>
          <Grid item xs={rightColumnWidth} style={{background: "inherit", paddingLeft: 10}}>
              <Checkbox 
                checked={props.generatorObject.nullValues.withNullValues}
                onChange={event => {props.withNullValuesChangedHandler(event)}}
                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
          </Grid>  


        </ExpansionPanelSummary>
        <ExpansionPanelDetails>

              <Grid  container  style={{background: "inherit"}}>
                <Grid item xs={leftColumnWidth} style={{background: "inherit"}}>
                      <Typography variant={fontSizeLeftColumn}>Null Values:</Typography>
                </Grid>

                <Grid container display="flex" justify="space-between" alignItems="center" item xs={rightColumnWidth}>
                                    
                    <Grid item xs={3}>
                        <TextField
                          className={classes.input}
                          value={props.generatorObject.nullValues.percentNullValues}
                          margin="dense"
                          variant="outlined"
                          onChange={props.handleNullValuesInputChange}
                          onBlur={props.handleBlur}
                          styles={{paddingRight: 30, width: 40,}}
                          inputProps={{
                            step: 10,
                            min: 0,
                            max: 100,
                            size: 3,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                          }}
                        />
                    </Grid>

                    <Grid item xs={9}>
                        <Slider
                          value={typeof props.generatorObject.nullValues.percentNullValues === 'number' ? props.generatorObject.nullValues.percentNullValues : 0}
                          onChange={props.handleNullValuesSliderChange}
                          aria-labelledby="input-slider"
                        />

                    </Grid>

                  


                </Grid>
           
              </Grid>
             
        </ExpansionPanelDetails>
      </ExpansionPanel>
      
     
    </Grid>
  );
}






