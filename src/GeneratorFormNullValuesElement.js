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
import Typography from '@material-ui/core/Typography';
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import Collapse from '@material-ui/core/Collapse';


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
  outerContainer: {
    paddingLeft: "15px",
    paddingRight: "30px",

  },
  innerContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignContent: "center",
    marginRight: 20,
    backgroundColor: "white",
  }, 
}));

export default function GeneratorFormNullValuesElement(props) {
  const classes = useStyles();
  const leftColumnWidth = 3;
  const rightColumnWidth = 8; 
  const fontSizeLeftColumn = "h5"
  
  return (
    <>
      <Grid  container className={classes.outerContainer} style={{ marginTop: props.generatorObject.nullValues.withNullValues? "30px": "0px" }}>
          <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                  <Typography variant={fontSizeLeftColumn}>
                      NullValues*:
                  </Typography>
                </Grid>
          </Grid>


          <Grid container alignContent="center" item xs={1}>
                <Checkbox 
                  checked={props.generatorObject.nullValues.withNullValues}
                  onChange={event => {props.withNullValuesChangedHandler(event)}}
                  inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
          </Grid>  
      

          <Grid container item xs={rightColumnWidth-1} >

          { props.generatorObject.nullValues.withNullValues?    
                <>                                         
                  <Grid container item xs={3} alignContent="center">
                     
                      <input
                        className={classes.input}
                        value={props.generatorObject.nullValues.percentNullValues*100}
                        onChange={props.handleNullValuesInputChange}
                        onBlur={props.handleBlur}
                        step = "5"
                        min = "0"
                        max = "99"
                        size = {3}
                        maxLength = {3}
                        style={{width: 40}} 
                        type ="text"
                      />

                      <div style={{display: "flex", alignContent: "center", justifyContent: "center"}}><div>%</div></div>
      
                  </Grid>

                  <Grid container item xs={8} alignContent="center">
                      <Slider
                          value={typeof props.generatorObject.nullValues.percentNullValues === 'number' ? props.generatorObject.nullValues.percentNullValues*100 : 0}
                          onChange={props.handleNullValuesSliderChange}
                          aria-labelledby="input-slider"
                      />
                  </Grid>
                </>
            : null}    

          </Grid>
      </Grid>                                       
    </>
  );
}






