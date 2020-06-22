import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import cloneDeep from 'lodash/cloneDeep';
import {generatorFormStyles, generatorFormsLeftColumnWidth, generatorFormsRightColumnWidth, generatorFormFontSizeLeftColumn} from "./styles";

const useStyles = makeStyles({ ... generatorFormStyles});

export default function FormOtherFieldValueGenerator(props) {
  const classes = useStyles();
  const leftColumnWidth = generatorFormsLeftColumnWidth;
  const rightColumnWidth = generatorFormsRightColumnWidth; 
  const fontSizeLeftColumn = generatorFormFontSizeLeftColumn;

  
    // Change Handler 
    const referenceFieldChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.referenceField = event.target.value;
        props.setGeneratorObject(newGenerator);
    };


  return (
    <> 
        <Grid container className={classes.outerContainer}>
            
            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                        Reference:
                    </Typography>
                </Grid>
            </Grid>

            <Grid container item xs={rightColumnWidth}>
                <select
                    id="standard-select-currency-native"
                    className={classes.select}                      
                    value={props.generatorObject.referenceField}
                    onChange={(event) => referenceFieldChangedHandler(event)}
                    > 
                        <option value=""  key="-1">select</option>
                        {(props.currentSchemaLocal.tables.filter(x => { 
                            return (x.tableId === props.fieldInFocus.tableId)}))[0].tableItems.map(
                                row => { return <option value={row.fieldName} key={row.rowId}>{row.fieldName}</option>})}          
                </select>
            </Grid>     
  
  </Grid>
</>
  );
}