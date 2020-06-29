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
    //paddingLeft: "15px",
    //paddingRight: "30px",
    },
    innerContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignContent: "center",
    marginRight: 20,
    backgroundColor: "white",
    }, 
    }));


export default function DistributionInputElement(props){
    const classes = useStyles();
    const leftColumnWidth = 3;
    const rightColumnWidth = 8; 
    const fontSizeLeftColumn = "h5"

return (
    <>
        <Grid container className={classes.outerContainer}>      

            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography  variant={fontSizeLeftColumn}>
                        Distribution*:
                    </Typography>
                </Grid>
            </Grid>

            <Grid item xs={rightColumnWidth}>
                <select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    className={classes.select}
                    style={{fontSize: "20px", 
                            width: "100%", 
                            height: "36px", 
                            outlineColor: "darkblue", 
                            borderStyle: "solid",
                            borderWidth: "1px",
                            borderColor: "black",
                            background: "white",
                            paddingLeft: "10px", 
                            borderRadius: "4px",
                            boxSizing: "border-box",
                            margin: "2px"}}

                    fullWidth
                    value={props.generatorObject.distributionVariables.type}
                    onChange={(event) => props.distributionTypeChangedHandler(event)}
                >
                    <option value="uniformDistribution">Uniform Distribution</option>
                    <option value="normalDistribution">Normal Distribution</option>
                    <option value="binomialDistribution">Binomial Distribution</option>
                    <option value="exponentialDistribution">Exponential Distribution</option>
                    <option value="logarithmicDistribution">Logarithmic Distribution</option>
                </select>
            </Grid>
        
            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                   <div/>
                </Grid>
            </Grid>
            


            <Grid item xs={rightColumnWidth}>
                <DistributionInputSubElement 
                    expDLambdaValueChangedHandler={props.expDLambdaValueChangedHandler}
                    logDPValueChangedHandler={props.logDPValueChangedHandler}
                    normalDStdDevValueChangedHandler={props.normalDStdDevValueChangedHandler}
                    normalDMeanValueChangedHandler={props.normalDMeanValueChangedHandler}
                    binomialDPValueChangedHandler={props.binomialDPValueChangedHandler}
                    binomialDNValueChangedHandler={props.binomialDNValueChangedHandler}
                    generatorObject={props.generatorObject}/>  
            </Grid>

        </Grid>    
    </>
                
    )

    }