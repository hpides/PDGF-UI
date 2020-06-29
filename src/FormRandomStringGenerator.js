import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from "@material-ui/core/Input";
import DistributionInputElement from "./DistributionInputElement";
import cloneDeep from 'lodash/cloneDeep';
import {generatorFormStyles, generatorFormsLeftColumnWidth, generatorFormsRightColumnWidth, generatorFormFontSizeLeftColumn} from "./styles";


const useStyles = makeStyles({ ... generatorFormStyles});

export default function DialogFormRandomStringGenerator(props) {
    const classes = useStyles();
    const leftColumnWidth = generatorFormsLeftColumnWidth;
    const rightColumnWidth = generatorFormsRightColumnWidth; 
    const fontSizeLeftColumn = generatorFormFontSizeLeftColumn;


    const minimumNumberOfCharactersChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.minimum = event.target.value;
        props.setGeneratorObject(newGenerator);
    };


    const maximumNumberOfCharactersChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.maximum = event.target.value;
        props.setGeneratorObject(newGenerator);
    };

   
    const characterSetChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.characterSet = event.target.value;
        props.setGeneratorObject(newGenerator);
    };

   


  return (
    <>
        <Grid container className={classes.outerContainer}>
      
                <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                    <Grid item >
                        <Typography variant={fontSizeLeftColumn}>
                            Min. String Length:
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item xs={rightColumnWidth}>
                    <input 
                        className={classes.input} 
                        type="number" 
                        placeholder="Enter minimum number of characters per string" 
                        value={props.generatorObject.minimum} 
                        onChange={(event) => minimumNumberOfCharactersChangedHandler(event)}/>
                </Grid>

                <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                    <Grid item >
                        <Typography variant={fontSizeLeftColumn}>
                            Max. String Lenght:
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item xs={rightColumnWidth}>
                    <input 
                        className={classes.input} 
                        type="number" 
                        placeholder="Enter maximum number of characters per string" 
                        value={props.generatorObject.maximum} 
                        onChange={(event) => maximumNumberOfCharactersChangedHandler(event)}/>
                </Grid>


                <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                    <Grid item >
                        <Typography variant={fontSizeLeftColumn}>
                            Alphabet*:
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item xs={rightColumnWidth}>
                    <input 
                        className={classes.input} 
                        type="text" 
                        placeholder="Enter the characters you want to use. (Default: a-zA-Z0-9)" 
                        value={props.generatorObject.characterSet} 
                        onChange={(event) => characterSetChangedHandler(event)}/>
                </Grid>


      </Grid>
    </>
  );
}

