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
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import DistributionInputElement from "./DistributionInputElement";
import {localeList} from "./data";
import cloneDeep from 'lodash/cloneDeep';
import {generatorFormStyles, generatorFormsLeftColumnWidth, generatorFormsRightColumnWidth, generatorFormFontSizeLeftColumn} from "./styles";

const useStyles = makeStyles({ ... generatorFormStyles});

export default function DialogFormDoubleNumberGenerator(props) {
    const classes = useStyles();
    const leftColumnWidth = generatorFormsLeftColumnWidth;
    const rightColumnWidth = generatorFormsRightColumnWidth; 
    const fontSizeLeftColumn = generatorFormFontSizeLeftColumn;

    
    
    // Change Handler Input Fields
    const minimumChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.minimum = event.target.value;
        props.setGeneratorObject(newGenerator);
    };

    // Change Handler Input Fields
    const maximumChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.maximum = event.target.value;
        props.setGeneratorObject(newGenerator);
    };

    // Change Handler decimalPlaces
    const decimalPlacesChangedHandler = (event) => {
      const newGenerator = cloneDeep(props.generatorObject);
      newGenerator.decimalPlaces = event.target.value;
      props.setGeneratorObject(newGenerator);
    };

     // Change Handler locale
     const localeChangedHandler = (event) => {
      const newGenerator = cloneDeep(props.generatorObject);
      newGenerator.locale = event.target.value;
      props.setGeneratorObject(newGenerator);
    };


    // Change Handler Input Fields
    const numberOfDistinctCharactersChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.numberOfDistinctCharacters = event.target.value;
        props.setGeneratorObject(newGenerator);
    };


    /*
    // Change Handler Distribution Component
    const distributionVariablesChangedHandler = (distributionObject) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.distribution = distributionObject;
        props.setGeneratorObject(newGenerator);
    };*/

   
    // Change Handler Distribution Component


    const distributionTypeChangedHandler = (event) => {
      const newGenerator = cloneDeep(props.generatorObject);
      newGenerator.distributionVariables.type = event.target.value;
      props.setGeneratorObject(newGenerator);  
    }


    const expDLambdaValueChangedHandler = (event) => {
      const newGenerator = cloneDeep(props.generatorObject);
      newGenerator.distributionVariables.exponentialDistribution.lambda = event.target.value;
      props.setGeneratorObject(newGenerator);
  };

      const logDPValueChangedHandler = (event) => {
      const newGenerator = cloneDeep(props.generatorObject);
      newGenerator.distributionVariables.logarithmicDistribution.p = event.target.value;
      props.setGeneratorObject(newGenerator);
  };

  const normalDStdDevValueChangedHandler = (event) => {
      const newGenerator = cloneDeep(props.generatorObject);
      newGenerator.distributionVariables.normalDistribution.standardDeviation = event.target.value;
      props.setGeneratorObject(newGenerator);
  };

  const normalDMeanValueChangedHandler = (event) => {
      const newGenerator = cloneDeep(props.generatorObject);
      newGenerator.distributionVariables.normalDistribution.mean = event.target.value;
      props.setGeneratorObject(newGenerator);
  };

  const binomialDPValueChangedHandler = (event) => {
      const newGenerator = cloneDeep(props.generatorObject);
      newGenerator.distributionVariables.binomialDistribution.p = event.target.value;
      props.setGeneratorObject(newGenerator);
  };

  const binomialDNValueChangedHandler = (event) => {
      const newGenerator = cloneDeep(props.generatorObject);
      newGenerator.distributionVariables.binomialDistribution.n = event.target.value;
      props.setGeneratorObject(newGenerator);
  };




  return (
    <Grid container className={classes.outerContainer}>
          
                <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                    <Grid item >
                        <Typography variant={fontSizeLeftColumn}>
                            Minimum:
                        </Typography>
                    </Grid>
                </Grid>

                <Grid  item xs={rightColumnWidth}>
                    <input 
                        className={classes.input} 
                        type="number" 
                        fullWidth
                        placeholder="Enter the minimal value to potentially be in the set." 
                        value={props.generatorObject.minimum} 
                        onChange={(event) => minimumChangedHandler(event)}/>
                </Grid>


                <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                    <Grid item >
                        <Typography variant={fontSizeLeftColumn}>
                            Maximum:
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item xs={rightColumnWidth}>
                    <input 
                        className={classes.input} 
                        type="number" 
                        fullWidth
                        placeholder="Enter the maximal value to potentially be in the set." 
                        value={props.generatorObject.maximum} 
                        onChange={(event) => maximumChangedHandler(event)}/>
                </Grid>


                <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                    <Grid item >
                        <Typography variant={fontSizeLeftColumn}>Decimal Places:</Typography>
                    </Grid>
                </Grid>

                <Grid item xs={rightColumnWidth}>
                  <input 
                    className={classes.input} 
                    type="number" 
                    fullWidth
                    placeholder="Enter the number of decimal places to be shown" 
                    value={props.generatorObject.decimalPlaces} 
                    onChange={(event) => decimalPlacesChangedHandler(event)}/>
                </Grid>

                <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                    <Grid item >
                        <Typography variant={fontSizeLeftColumn}>
                            Locale:
                        </Typography>
                    </Grid>
                </Grid>

                <Grid  item xs={rightColumnWidth}>
                  <select
                    className={classes.input} 
                    type="text"
                    select 
                    fullWidth
                    placeholder="Enter Locale" 
                    value={props.generatorObject.locale} 
                    onChange={(event) => localeChangedHandler(event)}>

                      { localeList.map(locale => { 
                            return <option key={locale} value={locale}> {locale} </option>})}
                  </select>    
                </Grid>


                <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                    <Grid item >
                        <Typography variant={fontSizeLeftColumn}>
                            Distinct Values*:
                        </Typography>
                    </Grid>
                </Grid>

                <Grid  item xs={rightColumnWidth}>
                    <input 
                        className={classes.input} 
                        type="number" 
                        placeholder="Enter the maximal number of different numbers to be generated" 
                        value={props.generatorObject.numberOfDistinctCharacters} 
                        onChange={(event)=> {numberOfDistinctCharactersChangedHandler(event)}}
                    />
                </Grid>

                
                <Grid  item xs={12}>
                    <DistributionInputElement 
                        distributionTypeChangedHandler={distributionTypeChangedHandler}
                        expDLambdaValueChangedHandler={expDLambdaValueChangedHandler}
                        logDPValueChangedHandler={logDPValueChangedHandler}
                        normalDStdDevValueChangedHandler={normalDStdDevValueChangedHandler}
                        normalDMeanValueChangedHandler={normalDMeanValueChangedHandler}
                        binomialDPValueChangedHandler={binomialDPValueChangedHandler}
                        binomialDNValueChangedHandler={binomialDNValueChangedHandler}
                        generatorObject={props.generatorObject}/>
                </Grid>  
      
        </Grid>
  );
}

