import React, {useContext} from 'react';
import {TooltipContext} from "./App";
import CustomTooltip from "./CustomTooltip";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Collapse from '@material-ui/core/Collapse';
import Checkbox from "@material-ui/core/Checkbox";
import DistributionInputElement from "./DistributionInputElement";
import cloneDeep from 'lodash/cloneDeep';
import {dictListObj} from "./data";
import {generatorFormStyles, generatorFormsLeftColumnWidth, generatorFormsRightColumnWidth, generatorFormFontSizeLeftColumn} from "./styles";

const useStyles = makeStyles({ ... generatorFormStyles});


export default function DialogFormDictListGenerator(props) {
    const classes = useStyles();
    const leftColumnWidth = generatorFormsLeftColumnWidth;
    const rightColumnWidth = generatorFormsRightColumnWidth; 
    const fontSizeLeftColumn = generatorFormFontSizeLeftColumn;
    const tooltipVisible = useContext(TooltipContext);

        
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
    const uniqueEntriesChangedHandler = (event) => {
      const newGenerator = cloneDeep(props.generatorObject);
      newGenerator.uniqueEntries = event.target.checked;
      props.setGeneratorObject(newGenerator);
  };

    // Change Handler Input Fields
    const disableRngChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.disableRng = event.target.checked;
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
    
    <Grid container className={classes.outerContainer}>

                
                    <Grid className={classes.innerContainer} container item xs={leftColumnWidth}>
                            <Grid item >
                                <CustomTooltip placement="left" arrow="true" title={tooltipVisible? "Instead of creating randomStrings one can also draw entries from dictionaries that keep words from the domain in question (e.g. names, cities, streetnames...). A dictionary e.g. could contain 1000 male German surnames or 10.000 international street names. For a selection of often needed domaines, PDGF has dictionaries available. These dictionaries can be selected here.": ""}>
                                    <Typography variant={fontSizeLeftColumn}>Dictionary:</Typography>
                                </CustomTooltip>
                            </Grid>
                    </Grid>
                

                <Grid  item xs={rightColumnWidth}>
                    <select
                        id="standard-select-currency-native"
                        className={classes.inputSelect}                      
                        value={props.generatorObject.dictionary}
                        onChange={(event) => dictionaryChangedHandler(event)}
                        > 
                        <option key="-1" value="">select</option>
                        {dictListObj.map((option) => (
                          <option key={option.value} value={option.value}>
                          {option.label}
                          </option>))}
                    
                    </select>
                </Grid>


                <CustomTooltip placement="left" arrow="true" title={tooltipVisible? "With the dictList generator you can either generate entries with a single value or with multiple values (lists). In case you want to generate lists, you have to specify in the size-attribute the number of elements that shall be in each list.": ""}> 
                    <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                            <Grid item >
                                  <Typography variant={fontSizeLeftColumn}>Size:</Typography>
                            </Grid>
                    </Grid>
                </CustomTooltip>

                <Grid  item xs={rightColumnWidth}>
                  <input 
                    className={classes.input}
                    type="number"
                    placeholder="Number of randomly picked dictionary entrys" 
                    value={props.generatorObject.size} 
                    onChange={(event) => sizeChangedHandler(event)}/>
                </Grid>


                </Grid>            
                <Collapse in={(props.generatorObject.size > 1)}>
                <>
                <Grid container className={classes.outerContainer}>
                
                    <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                            <Grid item >
                                <CustomTooltip placement="left" arrow="true" title={tooltipVisible? "In case you generate a list of two or more elements, please enter here the string (combination of letters) you want to use to separate the individual elements. Use only numbers and letters and keep the length to less than x.": ""}>
                                    <Typography variant={fontSizeLeftColumn}>
                                        Separator:
                                    </Typography>
                                </CustomTooltip>
                            </Grid>
                    </Grid>

                    <Grid  item xs={rightColumnWidth}>
                    <input 
                        className={classes.input} 
                        type="text" 
                        placeholder="Enter the string to be put between the drawn elements" 
                        value={props.generatorObject.separator} 
                        onChange={(event) => separatorChangedHandler(event)}/>
                    </Grid>
               </Grid>
                </>
                </Collapse>
                <Grid container className={classes.outerContainer}>

                <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                        <Grid item >
                            <Typography variant={fontSizeLeftColumn}>
                                Unique Entries*:
                            </Typography>
                        </Grid>
                </Grid>

                <Grid  item xs={rightColumnWidth}>
                  <Checkbox 
                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                        checked={props.generatorObject.uniqueEntries}
                        onChange={(event)=> {uniqueEntriesChangedHandler(event)}}
                        />
                </Grid>

                <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                        <Grid item >
                            <Typography variant={fontSizeLeftColumn}>
                                Disable RNG*:
                            </Typography>
                        </Grid>    
                </Grid>

                <Grid  item xs={rightColumnWidth}>
                  <Checkbox 
                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                        checked={props.generatorObject.disableRng}
                        onChange={(event)=> {disableRngChangedHandler(event)}}
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
    </>
  );
}

