import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from "@material-ui/core/Input";
import IfGeneratorInputComponent from "./IfGeneratorInputComponent";
import cloneDeep from 'lodash/cloneDeep';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import TextField from "@material-ui/core/TextField";
import {generatorFormStyles, generatorFormsLeftColumnWidth, generatorFormsRightColumnWidth, generatorFormFontSizeLeftColumn} from "./styles";


const useStyles = makeStyles({ ... generatorFormStyles});

export default function FormIfGenerator(props) {
    const classes = useStyles();
    const leftColumnWidth = generatorFormsLeftColumnWidth;
    const rightColumnWidth = generatorFormsRightColumnWidth; 
    const fontSizeLeftColumn =generatorFormFontSizeLeftColumn;
    const [optionLine1, setOptionLine1] = useState("write");
    const [optionLine2, setOptionLine2] = useState("write");
    
    // Change Handler dictionary
   
    const ifChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.if = event.target.value;
        props.setGeneratorObject(newGenerator);
    };

    const thenChangedHandlerA = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.then = event.target.value;
        props.setGeneratorObject(newGenerator);
    };

    const thenChangedHandlerB = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.then = event.target.value;
        props.setGeneratorObject(newGenerator);
    };



    const elseChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.else = event.target.value;
        props.setGeneratorObject(newGenerator);
    };

    const option1ChangeHandler = (event, newValue)=>{
        setOptionLine1(newValue);
    }

    const option2ChangeHandler = (event, newValue)=>{
        setOptionLine2(newValue);
    }
  

  return (
    <>
    
        <Grid container className={classes.outerContainer}>

            <Grid item xs={12}>
                <Typography variant={fontSizeLeftColumn}>Select Generator:</Typography>
            </Grid>

            <Grid item xs={12} >
                <IfGeneratorInputComponent
                    generatorObject={props.generatorObject}
                    setGeneratorObject={props.setGeneratorObject}/>
            </Grid>

            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                        If:
                    </Typography>
                </Grid>
            </Grid>

            <Grid item xs={rightColumnWidth}>
                <input 
                    className={classes.input} 
                    type="text" 
                    placeholder="Enter If-Condition" 
                    value={props.generatorObject.if} 
                    multiline
                    onChange={(event) => ifChangedHandler(event)}/>
            </Grid>
        
            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                        Then:
                    </Typography>
                </Grid>
            </Grid>

            <Grid  container item xs={rightColumnWidth}>
                <Grid xs={9}>

                    {(optionLine1==="write")? 
                        <input 
                            className={classes.input} 
                            type="text" 
                            placeholder="Enter Output for if = true" 
                            value={props.generatorObject.then} 
                            onChange={(event) => thenChangedHandlerA(event)}/>

                    : 
                        <select
                            id="standard-select-currency-native"
                            className={classes.inputSelect}            
                            value={props.generatorObject.subGeneratorIndex}
                            onChange={(event) => thenChangedHandlerB(event)}
                            > 
                      
                                <option value={null} key={-1}>None</option>
                                {(JSON.parse(localStorage.getItem("generatorRepository")).map((generator, index) => { 
                                    return  <option value={index} key={generator.uid}>
                                                {generator.repoVariables.name}
                                            </option>}))}
                    
                        </select>}

                </Grid>
                <Grid xs={3}>

                    <ToggleButtonGroup
                        value={optionLine1}
                        exclusive
                        onChange={option1ChangeHandler}
                        aria-label="text alignment"
                    >

                        <ToggleButton value="write">
                            <FormatAlignLeftIcon />
                        </ToggleButton>
                        <ToggleButton value="select">
                            <FormatAlignCenterIcon />
                        </ToggleButton>

                    </ToggleButtonGroup>    

                </Grid>
            </Grid>

            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                        Else:
                    </Typography>
                </Grid>
            </Grid>

            <Grid  container item xs={rightColumnWidth} >
               
               {}

               <Grid xs={9}>
                    <input 
                        className={classes.input} 
                        type="text" 
                        placeholder="Enter Output for If=false" 
                        value={props.generatorObject.else} 
                        onChange={(event) => elseChangedHandler(event)}/>
                </Grid>

                <Grid xs={3}>
                    <ToggleButtonGroup
                        value={optionLine1}
                        exclusive
                        onChange={option1ChangeHandler}
                        aria-label="text alignment"
                    >

                        <ToggleButton value="write">
                            <FormatAlignLeftIcon />
                        </ToggleButton>
                        <ToggleButton value="select">
                            <FormatAlignCenterIcon />
                        </ToggleButton>

                    </ToggleButtonGroup>    

                </Grid>
            </Grid>

        </Grid>
  
    </>
  );
}