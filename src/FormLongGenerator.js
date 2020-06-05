import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import DistributionInputElement from "./DistributionInputElement";
import cloneDeep from 'lodash/cloneDeep';

const useStyles = makeStyles({
    input: {
    fontSize: 22,
  },
  inputSelect: {
    fontSize: 22,
  },
});

export default function DialogFormLongGenerator(props) {
    const classes = useStyles();
    const leftColumnWidth = 5;
    const rightColumnWidth = 12 - leftColumnWidth; 
    const fontSizeLeftColumn = "h5";
   
    //alert("generatorObject: " + props.generatorObject);
    
    // Change Handler Input Fields
    const minimumChangedHandler = (event) => {
    const newGenerator = cloneDeep(props.generatorObject);
    newGenerator.minimum = event.target.value;
    props.setGeneratorObject(newGenerator);
    //alert("neuer Generator mit Minumum: " + newGenerator );
    };

// Change Handler Input Fields
    const maximumChangedHandler = (event) => {
    const newGenerator = cloneDeep(props.generatorObject);
    newGenerator.maximum = event.target.value;
    props.setGeneratorObject(newGenerator);
    };
    

    // Change Handler Input Fields
    const hasAllDistinctValuesChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.hasAllDistinctValues = event.target.checked;
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
   
      <div  style={{overflow: "auto", margin: "auto", padding: "0px", background: "inherit"}}>
            <Grid direction="row" container  style={{paddingLeft: "15px"}}>

                <Grid item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Minimum:</Typography>
                </Grid>

                <Grid  item xs={rightColumnWidth}>
                  <Input 
                    className={classes.input} 
                    type="number" 
                    fullWidth
                    placeholder="Enter Minimum" 
                    value={props.generatorObject.minimum} 
                    onChange={(event) => minimumChangedHandler(event)}/>
                </Grid>


                <Grid  item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Maximum:</Typography>
                </Grid>

                <Grid  item xs={rightColumnWidth}>
                  <Input 
                    className={classes.input} 
                    type="number" 
                    fullWidth
                    placeholder="Enter Maximum" 
                    value={props.generatorObject.maximum} 
                    onChange={(event) => maximumChangedHandler(event)}/>
                </Grid>


                <Grid  item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Distinct Values:</Typography>
                </Grid>

                <Grid  item xs={rightColumnWidth}>
                  <Checkbox 
                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                        checked={props.generatorObject.hasAllDistinctValues}
                        onChange={(event)=> {hasAllDistinctValuesChangedHandler(event)}}
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
      
      </div>
    
    </>
  );
}