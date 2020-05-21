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
import GeneratorFormPaddingExpansion from "./GeneratorFormPaddingExpansion";
import GeneratorFormRepoExpansion from "./GeneratorFormRepoExpansion";
import Slider from "@material-ui/core/Slider";
import InputAdornment from '@material-ui/core/InputAdornment';
import DistributionInputElement from "./DistributionInputElement";
import {emptyGenerator} from "./data";


const useStyles = makeStyles({
    input: {
    fontSize: 22,
  },
  inputSelect: {
    fontSize: 22,
  },
});

export default function FormIdGenerator(props) {
    const classes = useStyles();
    const leftColumnWidth = 5;
    const rightColumnWidth = 12 - leftColumnWidth; 
    const fontSizeLeftColumn = "h5";

    

    const [generatorObject, setGeneratorObject]=useState(emptyGenerator);
    useEffect(()=>{
        copyGeneratorData();
        alert("GeneratorData copied");
        addUidToGenerator();
        alert("Uid added");
        addTypeToGenerator();
        alert("Type added");
        alert("useEffect run through FormIdGenerator")}, []);
    


    const copyGeneratorData = () => {
      (props.tempGeneratorObject === "")? setGeneratorObject(emptyGenerator): setGeneratorObject(props.tempGeneratorObject);
    }

    const addTypeToGenerator = () => {
        const generatorObjectNew = {...generatorObject};
        generatorObjectNew.type = props.selectedGeneratorType;
        setGeneratorObject(generatorObjectNew);
    }


    // Change Handler Input Fields
    const minimumChangedHandler = (event) => {
        const newGenerator = {...generatorObject};
        newGenerator.minimum = event.target.value;
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
        setGeneratorObject(newGenerator)
        alert("Juhu, I am not useless. I am repoVariablesChangedHandler");
        
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
    



    // onClick Handler for Save Button

    const saveButtonOnClickHandler = () => {
      if (generatorObject.repoVariables.saveInRepo === true){
        props.saveGeneratorInBrowserStorage(generatorObject);
        props.saveGeneratorHandler(generatorObject);
        props.handleCloseDialogUniGenForm();
      } else {
        props.saveGeneratorHandler(generatorObject);
        props.handleCloseDialogUniGenForm();
      }
    }
    
    // addGeneratorUid -> uid = Milli-Sekunden seit dem 01.01.2020

    const addUidToGenerator = () => {
      const miliSecondsFrom1970To2020 = 1577785488*1000;
      const uid = Date.now() - miliSecondsFrom1970To2020; 
      //alert(uid);
      const newGenerator = {...generatorObject};
      newGenerator.uid = uid;
      //alert(JSON.stringify(newGenerator));
      setGeneratorObject(newGenerator);
      //alert(JSON.stringify(newGenerator));
      return null;
  }




    const swapObjects = () => {
      setGeneratorObject(props.tempGeneratorObject);
    }


  return (
    <>
   
      <div  style={{overflow: "auto", margin: "auto", padding: "0px", background: "inherit"}}>
            <div> IdGenerator-Form</div>
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

      <Grid container xs={12}>
          <Button  color="primary" onClick={()=> {alert("close button pushed"); alert("this is the darn function: " + props.handleCloseDialogUniGenForm); props.handleCloseDialogUniGenForm()}}>
            Cancel
          </Button>
          <Button 
              onClick={()=>{saveButtonOnClickHandler(generatorObject)}}               
              color="primary">
            Save
          </Button>
      </Grid>  
    </>
  );
}

