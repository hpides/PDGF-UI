import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from "@material-ui/core/Input";
import cloneDeep from 'lodash/cloneDeep';
import {generatorFormStyles, generatorFormsLeftColumnWidth, generatorFormsRightColumnWidth, generatorFormFontSizeLeftColumn} from "./styles";

const useStyles = makeStyles({ ... generatorFormStyles});

export default function FormStaticValueGenerator(props) {
  const classes = useStyles();
  const leftColumnWidth = generatorFormsLeftColumnWidth;
  const rightColumnWidth = generatorFormsRightColumnWidth; 
  const fontSizeLeftColumn = generatorFormFontSizeLeftColumn;

  
    // Change Handler Input Fields
    const staticValueChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.staticValue = event.target.value;
        props.setGeneratorObject(newGenerator);
    };


   

  return (
    <>
   
        <Grid container className={classes.outerContainer}>
          
            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>Static Value:</Typography>
                </Grid>
            </Grid>

            <Grid item xs={rightColumnWidth}>
                <input 
                  className={classes.input} 
                  type="text" 
                  placeholder="Enter Static Value" 
                  value={props.generatorObject.staticValue} 
                  onChange={(event) => staticValueChangedHandler(event)}/>
            </Grid>
          
        
        </Grid>
    </>
  );
}