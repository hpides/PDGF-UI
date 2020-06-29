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
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import DistributionInputSubElement from "./DistributionInputSubElement";

const useStyles = makeStyles((theme) => ({
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
    }));


export default function DistributionInputElement(props){
    const classes = useStyles();
    const leftColumnWidth = 5;
    const rightColumnWidth = 12 - leftColumnWidth; 
    const fontSizeLeftColumn = "h5"

return (
    <>
        <Grid container className={classes.outerContainer}>      

            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography  variant={fontSizeLeftColumn}>
                        Distribution
                    </Typography>
                </Grid>
            </Grid>

            <Grid item xs={rightColumnWidth}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    className={classes.select}
                    fullWidth
                    value={props.generatorObject.distributionVariables.type}
                    onChange={(event) => props.distributionTypeChangedHandler(event)}
                >
                    <MenuItem value="uniformDistribution">Uniform Distribution</MenuItem>
                    <MenuItem value="normalDistribution">Normal Distribution</MenuItem>
                    <MenuItem value="binomialDistribution">Binomial Distribution</MenuItem>
                    <MenuItem value="exponentialDistribution">Exponential Distribution</MenuItem>
                    <MenuItem value="logarithmicDistribution">Logarithmic Distribution</MenuItem>
                </Select>
            </Grid>
        
            
            
            <DistributionInputSubElement 
                expDLambdaValueChangedHandler={props.expDLambdaValueChangedHandler}
                logDPValueChangedHandler={props.logDPValueChangedHandler}
                normalDStdDevValueChangedHandler={props.normalDStdDevValueChangedHandler}
                normalDMeanValueChangedHandler={props.normalDMeanValueChangedHandler}
                binomialDPValueChangedHandler={props.binomialDPValueChangedHandler}
                binomialDNValueChangedHandler={props.binomialDNValueChangedHandler}
                generatorObject={props.generatorObject}/>  
        

        </Grid>    
    </>
                
    )

    }