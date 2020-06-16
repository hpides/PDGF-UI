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
  select: {
    fontSize: 22,
  }
});

export default function DialogFormDictListGenerator(props) {
    const classes = useStyles();
    const leftColumnWidth = 5;
    const rightColumnWidth = 12 - leftColumnWidth; 
    const fontSizeLeftColumn = "h5";

    const intialGeneratorObject = {
        uid: "",
        generatorType: "dictListGenerator", 
        dictionary: "",
        size: "",
        separator: "",
        fixedStepSize: "",
        hasAllDistinctValues: false,
        disableRng: "",
        distributionVariables: {
              type: "uniformDistribution",
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
              generatorType: "dictListGenerator",
              name: "",
              description: "",
              examples: "",
        },
    }; 


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

    const [generatorObject, setGeneratorObject]=useState(intialGeneratorObject);
    useEffect(()=>{addUidToGenerator()}, []);
    

    // Change Handler dictionary
    const dictionaryChangedHandler = (event) => {
        const newGenerator = cloneDeep(generatorObject);
        newGenerator.dictionary = event.target.value;
        setGeneratorObject(newGenerator);
    };

    // Change Handler size
    const sizeChangedHandler = (event) => {
      const newGenerator = cloneDeep(generatorObject);
      newGenerator.size = event.target.value;
      setGeneratorObject(newGenerator);
    };

     // Change Handler separator
     const separatorChangedHandler = (event) => {
      const newGenerator = cloneDeep(generatorObject);
      newGenerator.separator = event.target.value;
      setGeneratorObject(newGenerator);
    };

    // Change Handler Input Fields
    const fixedStepSizeChangedHandler = (event) => {
      const newGenerator = cloneDeep(generatorObject);
      newGenerator.fixedStepSize = event.target.checked;
      setGeneratorObject(newGenerator);
    };

    // Change Handler Input Fields
    const hasAllDistinctValuesChangedHandler = (event) => {
      const newGenerator = cloneDeep(generatorObject);
      newGenerator.hasAllDistinctValues = event.target.checked;
      setGeneratorObject(newGenerator);
  };

    // Change Handler Input Fields
    const disableRngChangedHandler = (event) => {
        const newGenerator = cloneDeep(generatorObject);
        newGenerator.disableRng = event.target.checked;
        setGeneratorObject(newGenerator);
    };

    // Change Handler Distribution Component
    const distributionVariablesChangedHandler = (distributionObject) => {
        const newGenerator = cloneDeep(generatorObject);
        newGenerator.distribution = distributionObject;
        setGeneratorObject(newGenerator);
    };

    // Change Handler Slider Component
    const handleNullValuesSliderChange = (event, newValue) => {
        const newGenerator = cloneDeep(generatorObject);
        newGenerator.nullValues = newValue;
        setGeneratorObject(newGenerator);
    };
  
    const handleNullValuesInputChange = (event) => {
        const newGenerator = cloneDeep(generatorObject);
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
        const newGenerator = cloneDeep(generatorObject);
        newGenerator.repoVariables = (repoObject);
        setGeneratorObject(newGenerator);
    };


        // Change Handler Repo Element

    const saveInRepoChangedHandler = (event) => {
        const newGenerator = cloneDeep(generatorObject);
        newGenerator.repoVariables.saveInRepo = (event.target.checked);
        setGeneratorObject(newGenerator);
    };

    const nameChangedHandler = (event)=> {
        const newGenerator = cloneDeep(generatorObject);
        newGenerator.repoVariables.name = (event.target.value);
        setGeneratorObject(newGenerator);
    };

    const descriptionChangedHandler = (event) => {
        const newGenerator = cloneDeep(generatorObject);
        newGenerator.repoVariables.description = (event.target.value);
        setGeneratorObject(newGenerator);
    };

    const examplesChangedHandler = (event) => {
        const newGenerator = cloneDeep(generatorObject);
        newGenerator.repoVariables.examples = (event.target.value);
        setGeneratorObject(newGenerator);
    };


    // Change Handler Padding Component

    const withPaddingChangedHandler = (event) => {
        const newGenerator = cloneDeep(generatorObject);
        newGenerator.paddingVariables.withPadding = (event.target.checked);
        setGeneratorObject(newGenerator);
    };

    const numberCharactersChangedHandler = (event)=> {
        const newGenerator = cloneDeep(generatorObject);
        newGenerator.paddingVariables.numberCharacters = (event.target.value);
        setGeneratorObject(newGenerator);
    };

    const fillCharacterChangedHandler = (event) => {
        const newGenerator = cloneDeep(generatorObject);
        newGenerator.paddingVariables.fillCharacter = (event.target.value);
        setGeneratorObject(newGenerator);
    };

    const fromLeftChangedHandler = (event) => {
        const newGenerator = cloneDeep(generatorObject);
        newGenerator.paddingVariables.fromLeft = (event.target.value);
        setGeneratorObject(newGenerator);
    };
    

    // Change Handler Distribution Component

    const distributionTypeChangedHandler = (event) => {
      const newGenerator = cloneDeep(generatorObject);
      newGenerator.distributionVariables.type = event.target.value;
      setGeneratorObject(newGenerator);  
    };


    const expDLambdaValueChangedHandler = (event) => {
      const newGenerator = cloneDeep(generatorObject);
      newGenerator.distributionVariables.exponentialDistribution.lambda = event.target.value;
      setGeneratorObject(newGenerator);
  };

      const logDPValueChangedHandler = (event) => {
      const newGenerator = cloneDeep(generatorObject);
      newGenerator.distributionVariables.logarithmicDistribution.p = event.target.value;
      setGeneratorObject(newGenerator);
  };

  const normalDStdDevValueChangedHandler = (event) => {
      const newGenerator = cloneDeep(generatorObject);
      newGenerator.distributionVariables.normalDistribution.standardDeviation = event.target.value;
      setGeneratorObject(newGenerator);
  };

  const normalDMeanValueChangedHandler = (event) => {
      const newGenerator = cloneDeep(generatorObject);
      newGenerator.distributionVariables.normalDistribution.mean = event.target.value;
      setGeneratorObject(newGenerator);
  };

  const binomialDPValueChangedHandler = (event) => {
      const newGenerator = cloneDeep(generatorObject);
      newGenerator.distributionVariables.binomialDistribution.p = event.target.value;
      setGeneratorObject(newGenerator);
  };

  const binomialDNValueChangedHandler = (event) => {
      const newGenerator = cloneDeep(generatorObject);
      newGenerator.distributionVariables.binomialDistribution.n = event.target.value;
      setGeneratorObject(newGenerator);
  };


// onClick Handler for Save Button

const saveButtonOnClickHandler = () => {
  if (generatorObject.repoVariables.saveInRepo === true){
    props.saveGeneratorInLocalStorage(generatorObject);
    props.addGeneratorToSchema(generatorObject);
    props.handleCloseDictListGenerator();
  } else {
    props.addGeneratorToSchema(generatorObject);
    props.handleCloseDictListGenerator();
  }
}



// addGeneratorUid -> uid = Milli-Sekunden seit dem 01.01.2020

const addUidToGenerator = () => {
  const miliSecondsFrom1970To2020 = 1577785488*1000;
  const uid = Date.now() - miliSecondsFrom1970To2020; 
  const newGenerator = cloneDeep(generatorObject);
  newGenerator.uid = uid;
  setGeneratorObject(newGenerator);
}

  return (
    <>
    <Dialog 
        onClose={props.handleCloseDictListGenerator} 
        aria-labelledby="simple-dialog-title" 
        open={props.isOpenDictListGenerator}
        titel="Dialog"
        //TransitionComponent={Transition}
        keepMounted
        PaperProps={{elevation: 24 }}
        fullWidth
        maxWidth="md"
        >
       <DialogTitle disableTypography style={{fontSize: 40, paddingLeft: 15, }} id="simple-dialog-title">DictList Generator</DialogTitle>
      
      <div  style={{overflow: "auto", margin: "auto", padding: "0px", background: "inherit"}}>
      
            <Grid direction="row" container item xs={12} style={{paddingLeft: "15px"}}>

                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Dictionary:</Typography>
                </Grid>
                <Grid container item xs={rightColumnWidth}>
                    <TextField
                        id="standard-select-currency-native"
                        className={classes.select}                      
                        select
                        value={generatorObject.dictionary}
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



                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Size:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth}>
                  <Input 
                    className={classes.input} 
                    type="number" 
                    placeholder="Enter Number of Decima Places" 
                    value={generatorObject.size} 
                    onChange={(event) => sizeChangedHandler(event)}/>
                </Grid>



                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Separator:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth}>
                  <Input 
                    className={classes.input} 
                    type="text" 
                    placeholder="Enter Separator" 
                    value={generatorObject.separator} 
                    onChange={(event) => separatorChangedHandler(event)}/>
                </Grid>


                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Distinct Values:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth}>
                  <Checkbox 
                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                        checked={generatorObject.hasAllDistinctValues}
                        onChange={(event)=> {hasAllDistinctValuesChangedHandler(event)}}
                        />
                </Grid>


                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Disable RNG:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth}>
                  <Checkbox 
                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                        checked={generatorObject.disableRng}
                        onChange={(event)=> {disableRngChangedHandler(event)}}
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
                        generatorObject={generatorObject}/>
                </Grid>

               

                <Grid container item xs={leftColumnWidth}>
                      <Typography variant={fontSizeLeftColumn}>Null Values:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth}>
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

            <Grid direction="column" container >
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
          <Button onClick={()=> {props.handleCloseDictListGenerator()}} color="primary">
            Cancel
          </Button>
          <Button 
              onClick={()=>{saveButtonOnClickHandler(generatorObject)}}
              color="primary">
            Save
          </Button>
      </DialogActions>  

    </Dialog>
    </>
  );
}

