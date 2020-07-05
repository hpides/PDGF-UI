/*
 * WALT - A realistic load generator for web applications.
 *
 * Copyright 2020 Eric Ackermann <eric.ackermann@student.hpi.de>, Hendrik Bomhardt
 * <hendrik.bomhardt@student.hpi.de>, Benito Buchheim
 * <benito.buchheim@student.hpi.de>, Juergen Schlossbauer
 * <juergen.schlossbauer@student.hpi.de>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
        alert("fieldInFocus: " + JSON.stringify(props.fieldInFocus));
        const tableIndex = props.currentSchemaLocal.tables.findIndex(x=> x.tableId === props.fieldInFocus.tableId);
        alert("tableIndex: " + tableIndex);
        const rowIndex = props.currentSchemaLocal.tables[tableIndex].tableItems.findIndex(x=> x.rowId === props.fieldInFocus.rowId);
        alert("rowIndex: " + rowIndex);
        if(props.currentSchemaLocal.tables[props.fieldInFocus.tableId-1].tableItems[props.fieldInFocus.rowId-1].fieldName != event.target.value){
            const newGenerator = cloneDeep(props.generatorObject);
            
            newGenerator.referenceField = event.target.value;
        
            const tableIndex = props.currentSchemaLocal.tables.findIndex( x => x.tableId === props.fieldInFocus.tableId);
            //console.log("tableIndex: " + tableIndex);
            const rowIndex = props.currentSchemaLocal.tables[tableIndex].tableItems.findIndex(x=> x.fieldName === event.target.value);
            //console.log("rowId: " + rowIndex);
            const fieldType = props.currentSchemaLocal.tables[tableIndex].tableItems[rowIndex].generator.fieldType;
            //console.log("fieldType: " + fieldType);
            newGenerator.fieldType = fieldType;
                
            //newGenerator.fieldType = props.currentSchemaLocal.tables[props.fieldInFocus.tableId-1].tableItems.filter(x=> x.fieldName == event.target.value)[0].generator.fieldType.
            props.setGeneratorObject(newGenerator);}
        else {
            alert("Attention! Circular reference. Please pick another field.")
        }
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