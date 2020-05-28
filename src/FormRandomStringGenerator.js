import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import Slider from "@material-ui/core/Slider";
import InputAdornment from '@material-ui/core/InputAdornment';
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

export default function DialogFormRandomStringGenerator(props) {
    const classes = useStyles();
    const leftColumnWidth = 5;
    const rightColumnWidth = 12 - leftColumnWidth; 
    const fontSizeLeftColumn = "h5";

    
    // Change Handler numberOfCharacters

    const numberOfCharactersChangedHandler = (event, newValue) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.numberOfCharacters = newValue;
        props.setGeneratorObject(newGenerator);
    };

    // Change Handler Input Fields
    const numberOfDistinctCharactersChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.numberOfDistinctCharacters = event.target.value;
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
                
                <Grid container item xs={leftColumnWidth} style={{paddingTop:25}}>
                  <Typography variant={fontSizeLeftColumn}>Number of Characters:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth} style={{paddingTop:25}}>
                    <Slider
                        value={props.generatorObject.numberOfCharacters}
                        onChange={numberOfCharactersChangedHandler}
                        valueLabelDisplay="auto"
                        fullwidth
                    />
                </Grid>


                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Number of Distinct Characters:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth}>
                  <Input 
                    className={classes.input} 
                    type="number" 
                    fullwidth
                    placeholder="Enter # of distinct characters" 
                    value={props.generatorObject.numberDistinctCharacters} 
                    onChange={(event) => numberOfDistinctCharactersChangedHandler(event)}/>
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

