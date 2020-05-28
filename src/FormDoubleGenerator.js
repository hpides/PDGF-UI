import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import GeneratorFormPaddingExpansion from "./GeneratorFormPaddingExpansion";
import GeneratorFormRepoExpansion from "./GeneratorFormRepoExpansion";
import Slider from "@material-ui/core/Slider";
import InputAdornment from '@material-ui/core/InputAdornment';
import DistributionInputElement from "./DistributionInputElement";
import {localeList} from "./data";
import cloneDeep from 'lodash/cloneDeep';


const useStyles = makeStyles({
    input: {
    fontSize: 22,
  },
  inputSelect: {
    fontSize: 22,
  },
});

export default function DialogFormDoubleGenerator(props) {
    const classes = useStyles();
    const leftColumnWidth = 5;
    const rightColumnWidth = 12 - leftColumnWidth; 
    const fontSizeLeftColumn = "h5";

    
    
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
    const fixedStepSizeChangedHandler = (event) => {
      const newGenerator = cloneDeep(props.generatorObject);
      newGenerator.fixedStepSize = event.target.checked;
      props.setGeneratorObject(newGenerator);
    };

    // Change Handler Input Fields
    const hasAllDistinctValuesChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.hasAllDistinctValues = event.target.checked;
        props.setGeneratorObject(newGenerator);
    };

    // Change Handler Distribution Component
    const distributionVariablesChangedHandler = (distributionObject) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.distribution = distributionObject;
        props.setGeneratorObject(newGenerator);
    };

   
    // Change Handler Distribution Component

    const distributionTypeChangedHandler = (event) => {
      const newGenerator = cloneDeep(props.generatorObject);
      newGenerator.distributionVariables.type = event.target.value;
      props.setGeneratorObject(newGenerator);  
    };


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
    <>
    
      <div  style={{overflow: "auto", margin: "auto", padding: "0px", background: "inherit"}}>
      
            <Grid direction="row" container item xs={12} style={{paddingLeft: "15px"}}>

                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Minimum:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth}>
                  <Input 
                    className={classes.input} 
                    type="number" 
                    fullwidth
                    placeholder="Enter Minimum" 
                    value={props.generatorObject.minimum} 
                    onChange={(event) => minimumChangedHandler(event)}/>
                </Grid>


                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Maximum:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth}>
                  <Input 
                    className={classes.input} 
                    type="number" 
                    fullwidth
                    placeholder="Enter Maximum" 
                    value={props.generatorObject.maximum} 
                    onChange={(event) => maximumChangedHandler(event)}/>
                </Grid>


                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Decimal Places:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth}>
                  <Input 
                    className={classes.input} 
                    type="number" 
                    fullwidth
                    placeholder="Enter Number of Decima Places" 
                    value={props.generatorObject.decimalPlaces} 
                    onChange={(event) => decimalPlacesChangedHandler(event)}/>
                </Grid>



                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Locale:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth}>
                  <TextField 
                    className={classes.input} 
                    type="text"
                    select 
                    fullwidth
                    placeholder="Enter Locale" 
                    value={props.generatorObject.locale} 
                    onChange={(event) => localeChangedHandler(event)}>

                      { localeList.map(locale => { 
                            return <option key={locale} value={locale}> {locale} </option>})}
                  </TextField>    
                </Grid>


                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Fixed Step Size:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth}>
                  <Checkbox 
                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                        checked={props.generatorObject.fixedStepSize}
                        onChange={(event)=> {fixedStepSizeChangedHandler(event)}}
                        />
                </Grid>


                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Distinct Values:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth}>
                  <Checkbox 
                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                        checked={props.generatorObject.hasAllDistinctValues}
                        onChange={(event)=> {hasAllDistinctValuesChangedHandler(event)}}
                        />
                </Grid>

                
                <Grid container item xs={12}>
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
      
      </div>
    </>
  );
}

