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

export default function DialogFormIdGenerator(props) {
    const classes = useStyles();
    const leftColumnWidth = 5;
    const rightColumnWidth = 12 - leftColumnWidth; 
    const fontSizeLeftColumn = "h5";

    const intialGeneratorObject = {
        uid:"",
        generatorType: "IdGenerator", 
        minimum: "",
        maximum: "",
        hasAllDistinctValues: false,
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
              generatorType: "idGenerator",
              saveInRepo: false,
              name: "",
              description: "",
              examples: "",
        },
    }; 

    const [generatorObject, setGeneratorObject]=useState(intialGeneratorObject);
    useEffect(()=>{addUidToGenerator();}, []);
    
    // Change Handler Input Fields
    const minimumChangedHandler = (event) => {
        const newGenerator = cloneDeep(generatorObject);
        newGenerator.minimum = event.target.value;
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
    



    // onClick Handler for Save Button

    const saveButtonOnClickHandler = () => {
      if (generatorObject.repoVariables.saveInRepo === true){
        props.saveGeneratorInLocalStorage(generatorObject);
        props.addGeneratorToSchema(generatorObject);
        props.handleCloseIdGenerator();
      } else {
        props.addGeneratorToSchema(generatorObject);
        props.handleCloseIdGenerator();
      }
    }
    
    // addGeneratorUid -> uid = Milli-Sekunden seit dem 01.01.2020

    const addUidToGenerator = () => {
      const miliSecondsFrom1970To2020 = 1577785488*1000;
      const uid = Date.now() - miliSecondsFrom1970To2020; 
      //console.log(uid);
      const newGenerator = cloneDeep(generatorObject);
      newGenerator.uid = uid;
      //console.log(JSON.stringify(newGenerator));
      setGeneratorObject(newGenerator);
      //console.log(JSON.stringify(newGenerator));
      return null;
  }


  return (
    <>
    <Dialog 
        onClose={props.handleCloseIdGenerator} 
        aria-labelledby="simple-dialog-title" 
        open={props.isOpenIdGenerator}
        titel="Dialog"
        //TransitionComponent={Transition}
        keepMounted
        PaperProps={{elevation: 24 }}
        fullWidth
        maxWidth="md"
        >
      <DialogTitle disableTypography style={{fontSize: 40, paddingLeft: 15, }} id="simple-dialog-title">Id Generator <Button >Swap. hier on Click wieder einfügen </Button></DialogTitle>
      <div  style={{overflow: "auto", margin: "auto", padding: "0px", background: "inherit"}}>
      
            <Grid direction="row" container item xs={12} style={{paddingLeft: "15px", paddingRight: "30px"}}>

                <Grid container item xs={leftColumnWidth} style={{padding: "10px 0px",  background: "lightgreen"}}>
                  <Typography variant={fontSizeLeftColumn}>Minimum:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth} style={{padding: "10px 0px",  background: "lightgreen"}}>
                  <Input 
                    className={classes.input} 
                    type="number" 
                    placeholder="Enter Minimum" 
                    fullWidth
                    value={generatorObject.minimum} 
                    onChange={(event) => minimumChangedHandler(event)}/>
                </Grid>

                <Grid container item xs={leftColumnWidth} style={{padding: "10px 0px",  background: "lightblue"}}>
                      <Typography variant={fontSizeLeftColumn}>Null Values:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth} style={{padding: "10px 0px",background: "lightblue"}}>
                  <Grid item xs>
                    <Slider
                      value={typeof generatorObject.nullValues === 'number' ? generatorObject.nullValues : 0}
                      onChange={handleNullValuesSliderChange}
                      aria-labelledby="input-slider"
                      fullWidth
                    />
                  </Grid>

                  <Grid item style={{padding: "10px 0px", background: "lightblue"}}>
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




            <Grid direction="column" container item xs={12}>
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
          <Button  color="primary" onClick={()=> {props.handleCloseIdGenerator()}}>
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

