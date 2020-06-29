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
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";

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
  },
  innerContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignContent: "center",
  }, 
}));

export default function GeneratorFormRepoExpansion(props) {
  const classes = useStyles();

  const leftColumnWidth = 5;
  const rightColumnWidth = 12 - leftColumnWidth; 
  const fontSizeLeftColumn = "h5"
  

  return (
    <Grid container style={{background: "inherit"}}>
    
     
          <Grid  item xs={leftColumnWidth} style={{background: "inherit"}}>
            <Typography variant={fontSizeLeftColumn}>
              Save in Repo:
            </Typography>
          </Grid>
          <Grid item xs={rightColumnWidth} style={{background: "inherit", paddingLeft: 10}}>
              <Checkbox 
                  inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                  checked={props.generatorObject.repoVariables.saveInRepo}
                  onChange={event => {props.saveInRepoChangedHandler(event)}}/>
          </Grid>  

          {props.generatorObject.repoVariables.saveInRepo? 
      
              <Grid  container style={{background: "inherit"}}>
                <Grid item xs={leftColumnWidth} style={{background: "inherit"}}>
                  <Typography 
                      variant={fontSizeLeftColumn}>Name:</Typography>
                </Grid>
                <Grid item xs={rightColumnWidth} style={{background: "inherit"}}>
                  <Input 
                      placeholder="Enter Name" 
                      className={classes.input}
                      value={props.generatorObject.repoVariables.name}
                      onChange={event => {props.nameChangedHandler(event)}}
                      fullWidth
                      />
                </Grid>
                <Grid item xs={leftColumnWidth} style={{background: "inherit"}}>
                  <Typography variant={fontSizeLeftColumn}>Description:</Typography>
                </Grid>
                <Grid item xs={rightColumnWidth} style={{background: "inherit"}}>
                  <Input 
                      placeholder="Enter Description" 
                      multiline 
                      className={classes.input}
                      value={props.generatorObject.repoVariables.description}
                      onChange={event => {props.descriptionChangedHandler(event)}}
                      fullWidth
                  />
                </Grid>
                <Grid item xs={leftColumnWidth} style={{background: "inherit"}}>
                  <Typography variant={fontSizeLeftColumn}>Examples:</Typography>
                </Grid>
                <Grid item xs={rightColumnWidth} style={{background: "inherit"}}>
                        <Input 
                            placeholder="Enter Examples" 
                            multiline 
                            fullWidth
                            className={classes.input}
                            value={props.generatorObject.repoVariables.examples}
                            onChange={event => {props.examplesChangedHandler(event)}}
                            />
                </Grid>
               
              </Grid> : null }
        
     
    </Grid>
  );
}

