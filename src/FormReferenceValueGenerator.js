import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import cloneDeep from 'lodash/cloneDeep';


const useStyles = makeStyles({
    input: {
    fontSize: 22,
  },
  inputSelect: {
    fontSize: 22,
  },
  outerContainer: {
    paddingLeft: "15px",
    paddingRight: "30px",
  },
  innerContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignContent: "center",
    backgroundColor: "yellow",
  }, 
});

export default function FormReferenceValueGenerator(props) {
    const classes = useStyles();
    const leftColumnWidth = 5;
    const rightColumnWidth = 12 - leftColumnWidth; 
    const fontSizeLeftColumn = "h5";

    //const [selectedTable, setSelectedTable] = useState("Table1");

  
    // Change Handler Input Fields
    const referenceTableChangedHandler = (event) => {
        //setSelectedTable(event.target.value);
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.referenceTable = event.target.value;
        props.setGeneratorObject(newGenerator);
    };


    const referenceFieldChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.referenceField = event.target.value;
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
                <TextField
                    id="standard-select-currency-native"
                    className={classes.select}                      
                    select
                    fullWidth
                    value={props.generatorObject.referenceTable}
                    onChange={(event) => referenceTableChangedHandler(event)}
                    SelectProps={{
                        native: true,
                    }}
                    > 
                    <option value="" key="-1">select</option>
                    {props.currentSchemaLocal.tables.map(table => { 
                    return <option key={table.tableId} value={table.tableId}> {table.tableName} </option>
                    })}
                </TextField>  
            </Grid>

            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                        Reference Field:
                    </Typography>
                </Grid>
            </Grid>

            <Grid item xs={rightColumnWidth} style={{padding: "10px 0px",  background: "inherit"}}>
                <TextField
                    id="standard-select-currency-native"
                    className={classes.select}                      
                    select
                    fullWidth
                    value={props.generatorObject.referenceField}
                    onChange={(event) => referenceFieldChangedHandler(event)}
                    SelectProps={{
                        native: true,
                    }}
                    > 
                    debbuger
                    {/*{props.currentSchemaLocal.tables.filter(x => { return x.tableId === props.generatorObject.referenceTable})[0].tableItems.map(row => { return <option value={row.fieldName} key={row.rowId}>{row.fieldName}</option>})}
                    
                    {console.log("currentSchemaLocal.tables: " + JSON.stringify(props.currentSchemaLocal.tables))}
                    {console.log("referenceTable: " + props.generatorObject.referenceTable )}
                    */} 
                    {/*console.log("referenceTable: " + props.generatorObject.referenceTable)*/}
                    {/*console.log("Tabellen SchemaLocal: " + JSON.stringify(props.currentSchemaLocal.tables))*/}
                    {/*console.log("Tabellen SchemaLocal gefilter mit ReferenceTable: " + JSON.stringify(props.currentSchemaLocal.tables.filter(x => { 
                        return (x.tableId === props.generatorObject.referenceTable)})))*/}
                        {/*props.currentSchemaLocal.tables.map(x => 
                        { console.log("x.tableId: " + x.tableId + "  type: " + typeof(x.tableId) + "  RefTableId: " + props.generatorObject.referenceTable + "  typ: " + typeof(props.generatorObject.referenceTable) + "  Vergleich:  " + (x.tableId === props.generatorObject.referenceTable))})*/}

                    <option value="" key="-1">select</option>
                    {(props.currentSchemaLocal.tables.filter(x => { 
                        return (x.tableId === Number(props.generatorObject.referenceTable))}))[0].tableItems.map(
                            row => { return <option value={row.fieldName} key={row.rowId}>{row.fieldName}</option>})}
                </TextField>
            </Grid>

            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                        Choose by:
                    </Typography>
                </Grid>
            </Grid>

            <Grid  item xs={rightColumnWidth}>
                <TextField
                    id="standard-select-currency-native"
                    className={classes.select}                      
                    select
                    fullWidth
                    value={props.generatorObject.chooseBy}
                    onChange={(event) => chooseByChangedHandler(event)}
                    SelectProps={{
                        native: true,
                    }}
                    > 
                        <option value="">select</option>
                        <option value="random">random</option>
                        <option value="randomShuffle">randomShuffle</option>
                        <option value="permutationRandom">permutationRandom</option>
                        <option value="sameChoiceAs">sameChoiceAs</option>
                        <option value="relativeRowMapping">relativeRowMapping</option>
                        <option value="relativeUnique">relativeUnique</option>                        
                </TextField>
            </Grid>

            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                        Select From:
                    </Typography>
                </Grid>
            </Grid>


            <Grid item xs={rightColumnWidth} style={{padding: "10px 0px",  background: "inherit"}}>
                <TextField
                        id="standard-select-currency-native"
                        className={classes.select}                      
                        select
                        fullWidth
                        value={props.generatorObject.selectFrom}
                        onChange={(event) => selectFromChangedHandler(event)}
                        SelectProps={{
                            native: true,
                        }}
                        > 
                            <option value="">select</option>
                            <option value="historical">historical</option>
                            <option value="atInsert">atInsert</option>
                            <option value="fixedTimeFrame">fixedTimeFrame</option>
                            <option value="sameTimeFrame">sameTimeFrame</option>
                            <option value="relativeTimeFrame">relativeTimeFrame</option>
                    
                </TextField>
            </Grid>
      
      </Grid>
    </>
  );
}