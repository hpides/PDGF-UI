import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import cloneDeep from 'lodash/cloneDeep';
import {generatorFormStyles, generatorFormsLeftColumnWidth, generatorFormsRightColumnWidth, generatorFormFontSizeLeftColumn} from "./styles";
import {chooseByOptionList, selectFromOptionList} from "./data";

const useStyles = makeStyles({ ... generatorFormStyles});

export default function FormReferenceValueGenerator(props) {
    const classes = useStyles();
    const leftColumnWidth = generatorFormsLeftColumnWidth;
    const rightColumnWidth = generatorFormsRightColumnWidth; 
    const fontSizeLeftColumn = generatorFormFontSizeLeftColumn;

    //const [selectedTable, setSelectedTable] = useState("Table1");

  
    // Change Handler Input Fields
    const referenceTableIdChangedHandler = (event) => {
        //setSelectedTable(event.target.value);
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.referenceTableId = event.target.value;
        props.setGeneratorObject(newGenerator);
    };


    const referenceFieldChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.referenceField = event.target.value;
        const tableIndex = props.currentSchemaLocal.tables.findIndex(x=> x.tableId === props.generatorObject.referenceTableId);
        console.log("tableIndex: " + tableIndex);
        const rowIndex = props.currentSchemaLocal.tables[tableIndex].tableItems.findIndex(x=> x.fieldName == event.target.value);
        console.log("rowIndex: " + rowIndex);
        const fieldType = props.currentSchemaLocal.tables[tableIndex].tableItems[rowIndex].generator.fieldType;
        console.log("fieldType: " + fieldType);
        newGenerator.fieldType = fieldType;
        props.setGeneratorObject(newGenerator);
    };


    const chooseByChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.chooseBy = event.target.value;
        props.setGeneratorObject(newGenerator);
    };

    const selectFromChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.selectFrom = event.target.value;
        props.setGeneratorObject(newGenerator);
    };







  return (
    <>
   
        <Grid container className={classes.outerContainer}>
           
            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                        Reference Table:
                    </Typography>
                </Grid>
            </Grid>

            <Grid item xs={rightColumnWidth}>
                <select
                    id="standard-select-currency-native"
                    className={classes.inputSelect}                      
                    value={props.generatorObject.referenceTableId}
                    onChange={(event) => referenceTableIdChangedHandler(event)}
                    > 
                        <option value="" key="-1">select</option>
                        {props.currentSchemaLocal.tables.map(table => { 
                        return <option key={table.tableId} value={table.tableId}> {table.tableName} </option>
                        })}
                </select>  
            </Grid>

            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                        Reference Field:
                    </Typography>
                </Grid>
            </Grid>

            <Grid item xs={rightColumnWidth}>
                <select
                    id="standard-select-currency-native"
                    className={classes.inputSelect}                      
                    value={props.generatorObject.referenceField}
                    onChange={(event) => referenceFieldChangedHandler(event)}
                    > 
                    

                    <option value="" key="-1">select</option>
                    {(props.currentSchemaLocal.tables.filter(x => { 
                        return (x.tableId === Number(props.generatorObject.referenceTableId))}))[0].tableItems.map(
                            row => { return <option value={row.fieldName} key={row.rowId}>{row.fieldName}</option>})}
                </select>
            </Grid>

            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                        Choose by:
                    </Typography>
                </Grid>
            </Grid>

            <Grid  item xs={rightColumnWidth}>
                <select
                    id="standard-select-currency-native"
                    className={classes.inputSelect}              
                    value={props.generatorObject.chooseBy}
                    onChange={(event) => chooseByChangedHandler(event)}
                    > 
                        <option value="">select</option>
                        {chooseByOptionList.map(opt => {return ( <option value={opt} key={opt}>{opt}</option>)})}                     
                </select>
            </Grid>

            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                        Select From:
                    </Typography>
                </Grid>
            </Grid>


            <Grid item xs={rightColumnWidth}>
                <select
                        id="standard-select-currency-native"
                        className={classes.inputSelect}        
                        value={props.generatorObject.selectFrom}
                        onChange={(event) => selectFromChangedHandler(event)}
                        > 
                            <option value="">select</option>
                            {selectFromOptionList.map(opt => { return (<option value={opt} key={opt}>{opt}</option>)})}                        
                </select>
            </Grid>
      
      </Grid>
    </>
  );
}