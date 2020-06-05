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
import GeneratorFormPaddingExpansion from "../GeneratorFormPaddingExpansion";
import GeneratorFormRepoExpansion from "../GeneratorFormRepoExpansion";
import Slider from "@material-ui/core/Slider";
import InputAdornment from '@material-ui/core/InputAdornment';
import DistributionInputElement from "../DistributionInputElement";
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

    const intialGeneratorObject = {
        uid: "",
        type: "longGenerator", 
        minimum: "",
        maximum: "",
        hasAllDistinctValues: false,
        distributionVariables: {
              type: "equalDistribution",
              normalDistribution: {
                standardDeviation: "",
                mean: "",
              },
              binomialDistribution: {
                n: "",
                p: "",
              },
              exponentialDistribution: {
                lambda: "",
              },
              logarithmicDistribution: {
                p: "",
              },
        },
        nullValues: "0",
        paddingVariables: {
              withPadding: false,
              numberCharacters: "",
              fillCharacter: "",
              fromLeft: "true"
        },
        repoVariables: {
              type: "longGenerator",
              name: "",
              description: "",
              examples: "",
        },
    }; 

    const [generatorObject, setGeneratorObject]=useState(intialGeneratorObject);
    useEffect(()=>{addUidToGenerator()}, []);
    
    // Change Handler Input Fields
    const minimumChangedHandler = (event) => {
        const newGenerator = {...generatorObject};
        newGenerator.minimum = event.target.value;
        setGeneratorObject(newGenerator);
    };

    // Change Handler Input Fields
    const maximumChangedHandler = (event) => {
        const newGenerator = {...generatorObject};
        newGenerator.maximum = event.target.value;
        setGeneratorObject(newGenerator);
    };

    // Change Handler Input Fields
    const hasAllDistinctValuesChangedHandler = (event) => {
        const newGenerator = {...generatorObject};
        newGenerator.hasAllDistinctValues = event.target.checked;
        setGeneratorObject(newGenerator);
    };

    // Change Handler Distribution Component
    const distributionVariablesChangedHandler = (distributionObject) => {
        const newGenerator = {...generatorObject};
        newGenerator.distribution = distributionObject;
        setGeneratorObject(newGenerator);
    };

    // Change Handler Slider Component
    const handleNullValuesSliderChange = (event, newValue) => {
        const newGenerator = {...generatorObject};
        newGenerator.nullValues = newValue;
        setGeneratorObject(newGenerator);
    };
  
    const handleNullValuesInputChange = (event) => {
        const newGenerator = {...generatorObject};
        newGenerator.nullValues = (event.target.value === '' ? '99' : Number(event.target.value));
        setGeneratorObject(newGenerator);
    };
  

    const handleBlur = () => {
      if (generatorObject.nullValues < 0) {
        setGeneratorObject.nullValues(0);
      } else if (generatorObject.nullValues > 100) {
        setGeneratorObject.nullValues(100);
      }
    };



    // Change Handler Repo Component
    const repoVariablesChangedHandler = (repoObject) => {
        const newGenerator = {...generatorObject};
        newGenerator.repoVariables = (repoObject);
        setGeneratorObject(newGenerator);
    };


        // Change Handler Repo Element

    const saveInRepoChangedHandler = (event) => {
        const newGenerator = {...generatorObject};
        newGenerator.repoVariables.saveInRepo = (event.target.checked);
        setGeneratorObject(newGenerator);
    };

    const nameChangedHandler = (event)=> {
        const newGenerator = {...generatorObject};
        newGenerator.repoVariables.name = (event.target.value);
        setGeneratorObject(newGenerator);
    };

    const descriptionChangedHandler = (event) => {
        const newGenerator = {...generatorObject};
        newGenerator.repoVariables.description = (event.target.value);
        setGeneratorObject(newGenerator);
    };

    const examplesChangedHandler = (event) => {
        const newGenerator = {...generatorObject};
        newGenerator.repoVariables.examples = (event.target.value);
        setGeneratorObject(newGenerator);
    };


    // Change Handler Padding Component

    const withPaddingChangedHandler = (event) => {
        const newGenerator = {...generatorObject};
        newGenerator.paddingVariables.withPadding = (event.target.checked);
        setGeneratorObject(newGenerator);
    };

    const numberCharactersChangedHandler = (event)=> {
        const newGenerator = {...generatorObject};
        newGenerator.paddingVariables.numberCharacters = (event.target.value);
        setGeneratorObject(newGenerator);
    };

    const fillCharacterChangedHandler = (event) => {
        const newGenerator = {...generatorObject};
        newGenerator.paddingVariables.fillCharacter = (event.target.value);
        setGeneratorObject(newGenerator);
    };

    const fromLeftChangedHandler = (event) => {
        const newGenerator = {...generatorObject};
        newGenerator.paddingVariables.fromLeft = (event.target.value);
        setGeneratorObject(newGenerator);
    };
    

    // Change Handler Distribution Component

    const distributionTypeChangedHandler = (event) => {
      const newGenerator = {...generatorObject};
      newGenerator.distributionVariables.type = event.target.value;
      setGeneratorObject(newGenerator);  
    };


    const expDLambdaValueChangedHandler = (event) => {
      const newGenerator = {...generatorObject};
      newGenerator.distributionVariables.exponentialDistribution.lambda = event.target.value;
      setGeneratorObject(newGenerator);
  };

      const logDPValueChangedHandler = (event) => {
      const newGenerator = {...generatorObject};
      newGenerator.distributionVariables.logarithmicDistribution.p = event.target.value;
      setGeneratorObject(newGenerator);
  };

  const normalDStdDevValueChangedHandler = (event) => {
      const newGenerator = {...generatorObject};
      newGenerator.distributionVariables.normalDistribution.standardDeviation = event.target.value;
      setGeneratorObject(newGenerator);
  };

  const normalDMeanValueChangedHandler = (event) => {
      const newGenerator = {...generatorObject};
      newGenerator.distributionVariables.normalDistribution.mean = event.target.value;
      setGeneratorObject(newGenerator);
  };

  const binomialDPValueChangedHandler = (event) => {
      const newGenerator = {...generatorObject};
      newGenerator.distributionVariables.binomialDistribution.p = event.target.value;
      setGeneratorObject(newGenerator);
  };

  const binomialDNValueChangedHandler = (event) => {
      const newGenerator = {...generatorObject};
      newGenerator.distributionVariables.binomialDistribution.n = event.target.value;
      setGeneratorObject(newGenerator);
  };

  // onClick Handler for Save Button

  const saveButtonOnClickHandler = () => {
    if (generatorObject.repoVariables.saveInRepo === true){
      props.saveGeneratorInLocalStorage(generatorObject);
      props.addGeneratorToSchema(generatorObject);
      props.handleCloseLongGenerator();
    } else {
      props.addGeneratorToSchema(generatorObject);
      props.handleCloseLongGenerator();
    }
  }

  // addGeneratorUid -> uid = Milli-Sekunden seit dem 01.01.2020

  const addUidToGenerator = () => {
    const miliSecondsFrom1970To2020 = 1577785488*1000;
    const uid = Date.now() - miliSecondsFrom1970To2020; 
    const newGenerator = {...generatorObject};
    newGenerator.uid = uid;
    setGeneratorObject(newGenerator);
  }


  return (
    <>
    <Dialog 
        onClose={props.handleCloseLongGenerator} 
        aria-labelledby="simple-dialog-title" 
        open={props.isOpenLongGenerator}
        titel="Dialog"
        //TransitionComponent={Transition}
        keepMounted
        PaperProps={{elevation: "24", square: "true", classes: {root : {backgroundColor: "red"} }}}
        fullWidth
        maxWidth="md"
        >
      <DialogTitle disableTypography style={{fontSize: 40, paddingLeft: 15, }} id="simple-dialog-title">Long Generator</DialogTitle>
      <div  style={{overflow: "auto", margin: "auto", padding: "0px", background: "inherit"}}>
      
            <Grid direction="row" container style={{paddingLeft: "15px"}}>

                <Grid  item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Minimum:</Typography>
                </Grid>

                <Grid item xs={rightColumnWidth}>
                  <Input 
                    className={classes.input} 
                    type="number" 
                    placeholder="Enter Minimum" 
                    value={generatorObject.minimum} 
                    onChange={(event) => minimumChangedHandler(event)}/>
                </Grid>


                <Grid  item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Maximum:</Typography>
                </Grid>

                <Grid item xs={rightColumnWidth}>
                  <Input 
                    className={classes.input} 
                    type="number" 
                    placeholder="Enter Maximum" 
                    value={generatorObject.maximum} 
                    onChange={(event) => maximumChangedHandler(event)}/>
                </Grid>


                <Grid  item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Distinct Values:</Typography>
                </Grid>

                <Grid  item xs={rightColumnWidth}>
                  <Checkbox 
                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                        checked={generatorObject.hasAllDistinctValues}
                        onChange={(event)=> {hasAllDistinctValuesChangedHandler(event)}}
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
                        generatorObject={generatorObject}/>
                </Grid>


                <Grid  item xs={leftColumnWidth}>
                      <Typography variant={fontSizeLeftColumn}>Null Values:</Typography>
                </Grid>

                <Grid  item xs={rightColumnWidth}>
                  <Grid item xs>
                    <Slider
                      value={typeof generatorObject.nullValues === 'number' ? generatorObject.nullValues : 0}
                      onChange={handleNullValuesSliderChange}
                      aria-labelledby="input-slider"
                    />
                  </Grid>

                  <Grid item>
                    <Input
                      className={classes.input}
                      value={generatorObject.nullValues}
                      margin="dense"
                      onChange={handleNullValuesInputChange}
                      onBlur={handleBlur}
                      endAdornment={<InputAdornment position="end">%</InputAdornment>}
                      inputProps={{
                        step: 10,
                        min: 0,
                        max: 100,
                        size: 3,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                      }}
                    />
                  </Grid>
                </Grid>

            </Grid>       

            <Grid direction="column" container>
                <GeneratorFormPaddingExpansion 
                    withPaddingChangedHandler={withPaddingChangedHandler}
                    numberCharactersChangedHandler={numberCharactersChangedHandler}
                    fillCharacterChangedHandler={fillCharacterChangedHandler}
                    fromLeftChangedHandler={fromLeftChangedHandler}
                    generatorObject={generatorObject}/> 

                <GeneratorFormRepoExpansion 
                    saveInRepoChangedHandler={saveInRepoChangedHandler}
                    nameChangedHandler={nameChangedHandler}
                    descriptionChangedHandler={descriptionChangedHandler}
                    examplesChangedHandler={examplesChangedHandler}
                    generatorObject={generatorObject}/> 

            </Grid>       
      
      </div>

      <DialogActions>
          <Button onClick={()=>props.handleCloseLongGenerator} color="primary">
            Cancel
          </Button>
          <Button 
              onClick={ ()=> {saveButtonOnClickHandler()}}
              color="primary">
            Save
          </Button>
      </DialogActions>  

    </Dialog>
    </>
  );
}

