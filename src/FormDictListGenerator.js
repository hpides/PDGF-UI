import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';


import Typography from '@material-ui/core/Typography';


import TextField from "@material-ui/core/TextField";
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
  select: {
    fontSize: 22,
  }
});

export default function DialogFormDictListGenerator(props) {
    const classes = useStyles();
    const leftColumnWidth = 5;
    const rightColumnWidth = 12 - leftColumnWidth; 
    const fontSizeLeftColumn = "h5";

   

    const dictData2 = [
      {value: "Vornamen", label: "Vornamen"},
      {value: "Nachnamen", label: "Nachnamen"},
      {value: "Strassennamen", label: "Strassennamen"},
      {value: "Ort", label: "Ort"},
      {value: "PLZ", label: "PLZ"},
      {value: "Telefon-Nummern", label: "Telefon-Nummern"},
      {value: "IBAN", label: "IBAN"},
      {value: "Länder", label: "Länder"},
      {value: "Sozialversicherungs-Nummern", label: "Sozialversicherungs-Nummern"},
      {value: "Steuer-Nummern", label: "Steuer-Nummern"},
      {value: "Bankunternehmen", label: "Bankunternehmen"},
    ];

    
    // Change Handler dictionary
    const dictionaryChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.dictionary = event.target.value;
        props.setGeneratorObject(newGenerator);
    };

    // Change Handler size
    const sizeChangedHandler = (event) => {
      const newGenerator = cloneDeep(props.generatorObject);
      newGenerator.size = event.target.value;
      props.setGeneratorObject(newGenerator);
    };

     // Change Handler separator
     const separatorChangedHandler = (event) => {
      const newGenerator = cloneDeep(props.generatorObject);
      newGenerator.separator = event.target.value;
      props.setGeneratorObject(newGenerator);
    };

   
    // Change Handler Input Fields
    const hasAllDistinctValuesChangedHandler = (event) => {
      const newGenerator = cloneDeep(props.generatorObject);
      newGenerator.hasAllDistinctValues = event.target.checked;
      props.setGeneratorObject(newGenerator);
  };

    // Change Handler Input Fields
    const disableRNGChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.disableRNG = event.target.checked;
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
      
            <Grid direction="row" container  style={{paddingLeft: "15px"}}>

                <Grid item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Dictionary:</Typography>
                </Grid>
                <Grid  item xs={rightColumnWidth}>
                    <TextField
                        id="standard-select-currency-native"
                        className={classes.select}                      
                        select
                        fullWidth
                        value={props.generatorObject.dictionary}
                        onChange={(event) => dictionaryChangedHandler(event)}
                        SelectProps={{
                            native: true,
                        }}
                        > 
                        {dictData2.map((option) => (
                          <option key={option.value} value={option.value}>
                          {option.label}
                          </option>))}
                    
                    </TextField>
                </Grid>



                <Grid item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Size:</Typography>
                </Grid>

                <Grid  item xs={rightColumnWidth}>
                  <Input 
                    className={classes.input} 
                    type="number" 
                    fullWidth
                    placeholder="Enter Number of Decima Places" 
                    value={props.generatorObject.size} 
                    onChange={(event) => sizeChangedHandler(event)}/>
                </Grid>



                <Grid  item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Separator:</Typography>
                </Grid>

                <Grid  item xs={rightColumnWidth}>
                  <Input 
                    className={classes.input} 
                    type="text" 
                    fullWidth
                    placeholder="Enter Separator" 
                    value={props.generatorObject.separator} 
                    onChange={(event) => separatorChangedHandler(event)}/>
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


                <Grid  item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Disable RNG:</Typography>
                </Grid>

                <Grid  item xs={rightColumnWidth}>
                  <Checkbox 
                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                        checked={props.generatorObject.disableRNG}
                        onChange={(event)=> {disableRNGChangedHandler(event)}}
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

      </div>
    </>
  );
}

