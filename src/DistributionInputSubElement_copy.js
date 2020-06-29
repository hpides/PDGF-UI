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
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    input: {
    fontSize: 22,
  },
  inputSelect: {
    fontSize: 22,
  },
  outerContainer: {
    paddingLeft: "15px",
    paddingRight: "30px",
  },
  innerContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignContent: "center",
    backgroundColor: "yellow",
  }, 
});

export default function DistributionInputSubElement(props){
    const classes = useStyles();
    const leftColumnWidth = 5;
    const rightColumnWidth = 12 - leftColumnWidth; 
    const fontSizeLeftColumn = "h5"

        switch (props.generatorObject.distributionVariables.type) {

         

            case 'exponentialDistribution':
                return (
                    <>

                      
                            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                                <Grid item >
                                    <Typography>
                                        lambda Value:
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid item xs={rightColumnWidth}>
                                <Input
                                    placeholder="Enter lambda Value"
                                    fullWidth
                                    value={props.generatorObject.distributionVariables.exponentialDistribution.lambda}
                                    onChange={(event)=>{props.expDLambdaValueChangedHandler(event)}}/>
                            </Grid>
                
                    </>);
           
       
         
          case 'logarithmicDistribution':
                return (
                    <>
                        <Grid container className={classes.outerContainer}>
                            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                                <Grid item >
                                    <Typography>
                                        p-Value:
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid item xs={rightColumnWidth}>
                                <Input 
                                placeholder="Enter p-Value"
                                fullWidth
                                value={props.generatorObject.distributionVariables.logarithmicDistribution.p}
                                onChange={(event)=>{props.logDPValueChangedHandler(event)}}/>
                            </Grid>
                        </Grid>
                    </>);

          case 'normalDistribution':
                return (
                    <>
                        <Grid container className={classes.outerContainer}>
                            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                                <Grid item >
                                    <Typography>
                                        Standard Deviation:
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid item xs={rightColumnWidth}>
                                <Input
                                    placeholder="Enter Standard Deviation"
                                    fullWidth
                                    value={props.generatorObject.distributionVariables.normalDistribution.standardDeviation}
                                    onChange={(event)=>{props.normalDStdDevValueChangedHandler(event)}}/>
                            </Grid>

                            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                                <Grid item >
                                    <Typography>
                                        Mean
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid item xs={rightColumnWidth}>
                                <Input
                                    placeholder="Enter Mean Value"
                                    fullWidth
                                    value={props.generatorObject.distributionVariables.normalDistribution.mean}
                                    onChange={(event)=>{props.normalDMeanValueChangedHandler(event)}}/>
                            </Grid>
                        </Grid>
                    </>);

          case 'binomialDistribution':
                return (
                    <>
                        <Grid container className={classes.outerContainer}>
                            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                                <Grid item >
                                    <Typography>
                                        p Value:
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid item xs={rightColumnWidth}>
                                <Input 
                                    placeholder="Enter p-Value"
                                    fullWidth
                                    value={props.generatorObject.distributionVariables.binomialDistribution.p}
                                    onChange={(event)=>{props.binomialDPValueChangedHandler(event)}}/>
                            </Grid>

                            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                                <Grid item >
                                    <Typography>
                                        n Value:
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid item xs={rightColumnWidth}>
                                <Input
                                    placeholder="Enter n-Value"
                                    fullWidth
                                    value={props.generatorObject.distributionVariables.binomialDistribution.n}
                                    onChange={(event)=>{props.binomialDNValueChangedHandler(event)}}/>
                            </Grid>
                        </Grid>
                </>);

          default:
            return null;
        }}      
