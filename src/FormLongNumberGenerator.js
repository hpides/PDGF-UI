import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import DistributionInputElement from "./DistributionInputElement";
import cloneDeep from 'lodash/cloneDeep';
import {generatorFormStyles, generatorFormsLeftColumnWidth, generatorFormsRightColumnWidth, generatorFormFontSizeLeftColumn} from "./styles";

const useStyles = makeStyles({ ... generatorFormStyles});

export default function DialogFormLongNumberGenerator(props) {
    const classes = useStyles();
    const leftColumnWidth = generatorFormsLeftColumnWidth;
    const rightColumnWidth = generatorFormsRightColumnWidth; 
    const fontSizeLeftColumn = generatorFormFontSizeLeftColumn;
    console.log("generatorObject: " + props.generatorObject);
    
    // Change Handler Input Fields
    const minimumChangedHandler = (event) => {
    const newGenerator = cloneDeep(props.generatorObject);
    newGenerator.minimum = event.target.value;
    props.setGeneratorObject(newGenerator);
    console.log("neuer Generator mit Minumum: " + newGenerator );
    };

// Change Handler Input Fields
    const maximumChangedHandler = (event) => {
    const newGenerator = cloneDeep(props.generatorObject);
    newGenerator.maximum = event.target.value;
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
    }; */


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
                  placeholder="Enter Minimum" 
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

          <Grid  item xs={rightColumnWidth}>
              <input 
                  className={classes.input} 
                  type="number" 
                  placeholder="Enter Maximum" 
                  value={props.generatorObject.maximum} 
                  onChange={(event) => maximumChangedHandler(event)}/>
          </Grid>

          <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                        Distinct Values:
                    </Typography>
                </Grid>
          </Grid>

          <Grid  item xs={rightColumnWidth}>
                <input 
                  className={classes.input} 
                  type="number" 
                  placeholder="Enter Number of Distinct Characters" 
                  value={props.generatorObject.numberOfDistinctCharacters} 
                  onChange={(event)=> {numberOfDistinctCharactersChangedHandler(event)}}
                  />
          </Grid>
          
          <Grid item xs={12}>
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
    
    </>
  );
}