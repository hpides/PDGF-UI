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

export default function DialogFormDateTimeGenerator(props) {
    const classes = useStyles();
    const leftColumnWidth = 5;
    const rightColumnWidth = 12 - leftColumnWidth; 
    const fontSizeLeftColumn = "h5";

    const intialGeneratorObject = {
        uid: "",
        generatorType: "dateTimeGenerator", 
        startDate: "",
        endDate: "",
        disableRng: "",
        hasAllDistinctValues: false,
        fixedStepSize: "",
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
              generatorType: "dateTimeGenerator",
              name: "",
              description: "",
              examples: "",
        },
    }; 


    const [generatorObject, setGeneratorObject]=useState(intialGeneratorObject);
    useEffect(()=>{addUidToGenerator()}, []);

    // Change Handler startDate
    const startDateChangedHandler = (event) => {
      const newGenerator = cloneDeep(generatorObject);
      newGenerator.startDate = event.target.value;
      setGeneratorObject(newGenerator);
    };

     // Change Handler endDate
     const endDateChangedHandler = (event) => {
      const newGenerator = cloneDeep(generatorObject);
      newGenerator.endDate = event.target.value;
      setGeneratorObject(newGenerator);
    };

    // Change Handler disableRng
    const disableRngChangedHandler = (event) => {
      const newGenerator = cloneDeep(generatorObject);
      newGenerator.disableRng = event.target.checked;
      setGeneratorObject(newGenerator);
    };

    // Change Handler fixedStepSize
    const fixedStepSizeChangedHandler = (event) => {
      const newGenerator = cloneDeep(generatorObject);
      newGenerator.fixedStepSize = event.target.checked;
      setGeneratorObject(newGenerator);
  };

    // Change Handler nullValues Slider Component
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
    






    // addGeneratorUid -> uid = Milli-Sekunden seit dem 01.01.2020

    const addUidToGenerator = () => {
      const miliSecondsFrom1970To2020 = 1577785488*1000;
      const uid = Date.now() - miliSecondsFrom1970To2020; 
      const newGenerator = cloneDeep(generatorObject);
      newGenerator.uid = uid;
      setGeneratorObject(newGenerator);
  }


    // onClick Handler for Save Button

    const saveButtonOnClickHandler = () => {
      if (generatorObject.repoVariables.saveInRepo === true){
        props.saveGeneratorInLocalStorage(generatorObject);
        props.addGeneratorToSchema(generatorObject);
        props.handleCloseDateTimeGenerator();
      } else {
        props.addGeneratorToSchema(generatorObject);
        props.handleCloseDateTimeGenerator();
      }
    }



  return (
    <>
    <Dialog 
        onClose={props.handleCloseDateTimeGenerator} 
        aria-labelledby="simple-dialog-title" 
        open={props.isOpenDateTimeGenerator}
        titel="Dialog"
        //TransitionComponent={Transition}
        keepMounted
        PaperProps={{elevation: 24 }}
        fullWidth
        maxWidth="md"
        >
      <DialogTitle disableTypography style={{fontSize: 40, paddingLeft: 15, }} id="simple-dialog-title">DateTime Generator</DialogTitle>
      <div  style={{overflow: "auto", margin: "auto", padding: "0px", background: "inherit"}}>
      
            <Grid direction="row" container  style={{paddingLeft: "15px", paddingRight: "30px",}}>          

                <Grid item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Start-Date:</Typography>
                </Grid>

                <Grid  item xs={rightColumnWidth}>
                  <Input 
                    className={classes.input} 
                    type="date" 
                    placeholder="Enter Start-Date" 
                    value={generatorObject.startDate} 
                    onChange={(event) => startDateChangedHandler(event)}
                    fullWidth/>
                </Grid>



                <Grid  item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn} fullWidth>End-Date:</Typography>
                </Grid>

                <Grid  item xs={rightColumnWidth}>
                  <Input 
                    className={classes.input} 
                    type="date" 
                    placeholder="Enter End-Date" 
                    value={generatorObject.endDate} 
                    onChange={(event) => endDateChangedHandler(event)}
                    fullWidth/>
                </Grid>


                <Grid item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn} fullWidth >Disable RNG:</Typography>
                </Grid>

                <Grid  item xs={rightColumnWidth}>
                  <Checkbox 
                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                        checked={generatorObject.disableRng}
                        onChange={(event)=> {disableRngChangedHandler(event)}}
                        />
                </Grid>


                <Grid  item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn} fullWidth>Fixed Step Size:</Typography>
                </Grid>

                <Grid  item xs={rightColumnWidth}>
                  <Checkbox 
                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                        checked={generatorObject.fixedStepSize}
                        onChange={(event)=> {fixedStepSizeChangedHandler(event)}}
                        />
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
          <Button onClick={()=>props.handleCloseDateTimeGenerator()} color="primary">
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

