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
  inputSecondLevel: {
    fontSize: 16,
  },
}));

export default function GeneratorFormRepoExpansion(props) {
  const classes = useStyles();

  const leftColumnWidth = 3;
  const rightColumnWidth = 8; 
  const fontSizeLeftColumn = "h5"
  const fontSizeSecondLevel ="16px"
  

  return (
    
    <>
      <Grid  container className={classes.outerContainer}>
          <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
              <Grid item >
                  <Typography variant={fontSizeLeftColumn}>
                      Save in Repo:
                  </Typography>
            </Grid>
          </Grid>

          <Grid item xs={1}>
              <Checkbox 
                  inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                  checked={props.generatorObject.repoVariables.saveInRepo}
                  onChange={event => {props.saveInRepoChangedHandler(event)}}/>
          </Grid>  

          <Grid item xs={rightColumnWidth-1}>

                <Collapse in={props.generatorObject.repoVariables.saveInRepo}>
                    <Grid  container className={classes.outerContainer}>
                        <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                            <Grid item >
                                <div/>
                            </Grid>
                        </Grid>

                        <Grid container item xs={rightColumnWidth}>

                            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                                <Grid item >
                                    <Typography variant={fontSizeSecondLevel}>
                                        Name:
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid item xs={rightColumnWidth} style={{background: "inherit"}}>
                                <Input 
                                    placeholder="Enter Name" 
                                    className={classes.inputSecondLevel}
                                    value={props.generatorObject.repoVariables.name}
                                    onChange={event => {props.nameChangedHandler(event)}}
                                    fullWidth
                                    inputProps = {{maxLength: 60}}
                                    />
                            </Grid>

                            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                                <Grid item >
                                    <Typography variant={fontSizeSecondLevel}>
                                        Description:
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid item xs={rightColumnWidth} style={{background: "inherit"}}>
                                <Input 
                                    placeholder="Enter Description" 
                                    multiline 
                                    className={classes.inputSecondLevel}
                                    value={props.generatorObject.repoVariables.description}
                                    onChange={event => {props.descriptionChangedHandler(event)}}
                                    fullWidth
                                    inputProps = {{maxLength: 200}}
                                />
                            </Grid>

                            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                                <Grid item >
                                    <Typography variant={fontSizeSecondLevel}>Examples:</Typography>
                                </Grid>
                            </Grid>

                            <Grid item xs={rightColumnWidth} style={{background: "inherit"}}>
                                    <Input 
                                        placeholder="Enter Examples" 
                                        multiline 
                                        fullWidth
                                        className={classes.inputSecondLevel}
                                        value={props.generatorObject.repoVariables.examples}
                                        onChange={event => {props.examplesChangedHandler(event)}}
                                        />
                            </Grid>
                            </Grid>  
                    </Grid>
            </Collapse> 













      </Grid>

      
    </>
    
  );
}

