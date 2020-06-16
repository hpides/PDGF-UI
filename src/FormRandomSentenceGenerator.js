import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from "@material-ui/core/Input";
import DistributionInputElement from "./DistributionInputElement";
import cloneDeep from 'lodash/cloneDeep';

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

export default function DialogFormRandomSentenceGenerator(props) {
    const classes = useStyles();
    const leftColumnWidth = 5;
    const rightColumnWidth = 12 - leftColumnWidth; 
    const fontSizeLeftColumn = "h5";

    
    // Change Handler numberOfCharacters

    const minimumNumberOfCharactersChangedHandler = (event, newValue) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.minimum = newValue;
        props.setGeneratorObject(newGenerator);
    };

    // Change Handler Input Fields
    const maximumNumberOfCharactersChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.maximum = event.target.value;
        props.setGeneratorObject(newGenerator);
    };

  
    const numberOfDistinctCharactersChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.numberOfDistinctCharacters = event.target.value;
        props.setGeneratorObject(newGenerator);
    };
   
    // Change Handler Distribution Component
    
    /*
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
                        Minimum Number of Characters:
                    </Typography>
                </Grid>
            </Grid>

            <Grid item xs={rightColumnWidth}>
                <Input 
                  className={classes.input} 
                  type="number" 
                  fullWidth
                  placeholder="Enter minimal number of characters" 
                  value={props.generatorObject.minimum} 
                  onChange={(event) => minimumNumberOfCharactersChangedHandler(event)}/>
            </Grid>

            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                       Maximum Number of Characters:
                    </Typography>
                </Grid>
            </Grid>

            <Grid  item xs={rightColumnWidth}>
              <Input 
                className={classes.input} 
                type="number" 
                fullWidth
                placeholder="Enter maximum number characters" 
                value={props.generatorObject.maximum} 
                onChange={(event) => maximumNumberOfCharactersChangedHandler(event)}/>
            </Grid>
               

            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                       Number of distinct Characters:
                    </Typography>
                </Grid>
            </Grid>

            <Grid  item xs={rightColumnWidth}>
              <Input 
                className={classes.input} 
                type="number" 
                fullWidth
                placeholder="Enter maximum number characters" 
                value={props.generatorObject.numberOfDistinctCharacters} 
                onChange={(event) => numberOfDistinctCharactersChangedHandler(event)}/>
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
    </>
  );
}

