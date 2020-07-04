import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Input from "@material-ui/core/Input";
import cloneDeep from 'lodash/cloneDeep';
import {generatorFormStyles, generatorFormsLeftColumnWidth, generatorFormsRightColumnWidth, generatorFormFontSizeLeftColumn} from "./styles";


const useStyles = makeStyles({ ... generatorFormStyles});


export default function FormPrePostFixGenerator(props) {
    const classes = useStyles();
    const leftColumnWidth = generatorFormsLeftColumnWidth;
    const rightColumnWidth = generatorFormsRightColumnWidth; 
    const fontSizeLeftColumn = generatorFormFontSizeLeftColumn;
    
    
    useEffect(()=> {
        console.log("in useEffect! GeneratorObject right now: " + JSON.stringify(props.generatorObject));
        const generatorRepo = JSON.parse(localStorage.getItem("generatorRepository"));
        console.log("subGenerator: " + JSON.stringify(props.generatorObject.subGenerator));
        //const index = generatorRepo.findIndex(x=>x.uid === props.generatorObject.subGenerator);
        //console.log("index: " + index)
        console.log("generatorRepo: " + JSON.stringify(generatorRepo));
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.subGeneratorObject = generatorRepo[props.generatorObject.subGeneratorIndex];
        props.setGeneratorObject(newGenerator);

    }, [props.generatorObject.subGeneratorIndex]);   
  
    // Change Handler Input Fields
    const preFixChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.preFix = event.target.value;
        props.setGeneratorObject(newGenerator);
    };

    const postFixChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.postFix = event.target.value;
        props.setGeneratorObject(newGenerator);
    };

    const subGeneratorChangedHandler = (event) => {
        console.log("in subGenChangedHander. Uid: " + event.target.value);
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.subGeneratorIndex = event.target.value;
        props.setGeneratorObject(newGenerator);
    };
   

  return (
    <>
   
        <Grid container className={classes.outerContainer}>

            <Grid className={classes.innerContainer} container item xs={leftColumnWidth}>
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                        PreFix*:
                    </Typography>
                </Grid>
            </Grid>

            <Grid  item xs={rightColumnWidth}>
                <input 
                    className={classes.input} 
                    type="text" 
                    placeholder="Enter PreFix" 
                    value={props.generatorObject.preFix} 
                    onChange={(event) => preFixChangedHandler(event)}/>
            </Grid>


            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                        PostFix*:
                    </Typography>
                </Grid>
            </Grid>

            <Grid  item xs={rightColumnWidth}>
              <input 
                className={classes.input} 
                type="text" 
                placeholder="Enter PostFix" 
                value={props.generatorObject.postFix} 
                onChange={(event) => postFixChangedHandler(event)}/>
            </Grid>

            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                        Generator:
                    </Typography>
                </Grid>
            </Grid>

            <Grid item xs={rightColumnWidth}>
                <select
                    id="standard-select-currency-native"
                    className={classes.inputSelect}                      
                    value={props.generatorObject.subGeneratorIndex}
                    onChange={(event) => subGeneratorChangedHandler(event)}
                    > 
                      
                        <option value={null} key={-1}>None</option>
                        {(JSON.parse(localStorage.getItem("generatorRepository")).map((generator, index) => { 
                            return  <option value={index} key={generator.uid}>
                                        {generator.repoVariables.name}
                                    </option>}))}
                    
                </select>
            </Grid>

        </Grid>       
    </>
  );
}