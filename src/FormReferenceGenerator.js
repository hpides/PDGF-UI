import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import cloneDeep from 'lodash/cloneDeep';


const useStyles = makeStyles({
    input: {
    fontSize: 22,
  },
  inputSelect: {
    fontSize: 22,
  },
});

export default function FormReferenceGenerator(props) {
    const classes = useStyles();
    const leftColumnWidth = 5;
    const rightColumnWidth = 12 - leftColumnWidth; 
    const fontSizeLeftColumn = "h5";

    const [selectedTable, setSelectedTable] = useState("Table1");

  
    // Change Handler Input Fields
    const referenceTableChangedHandler = (event) => {
        setSelectedTable(event.target.value);
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
   
      <div  style={{overflow: "auto", margin: "auto", padding: "0px", background: "inherit"}}>
            <Grid direction="row" container item xs={12} style={{paddingLeft: "15px", paddingRight: "30px"}}>



                <Grid container item xs={leftColumnWidth} style={{padding: "10px 0px",  background: "inherit"}}>
                    <Typography variant={fontSizeLeftColumn}>Reference Table:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth} style={{padding: "10px 0px",  background: "inherit"}}>
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
                            {props.currentSchemaLocal.tables.map(table => { 
                            return <option key={table.tableId} value={table.tableId}> {table.tableName} </option>
                            })}
                    </TextField>  
                </Grid>

    


                <Grid container item xs={leftColumnWidth} style={{padding: "10px 0px",  background: "inherit"}}>
                    <Typography variant={fontSizeLeftColumn}>Reference Field:</Typography>
                </Grid>


                <Grid container item xs={rightColumnWidth} style={{padding: "10px 0px",  background: "inherit"}}>
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
                            {/*{props.currentSchemaLocal.tables.filter(x => { return x.tableId === props.generatorObject.referenceTable})[0].tableItems.map(row => { return <option value={row.fieldName} key={row.rowId}>{row.fieldName}</option>})}
                            
                            {alert("currentSchemaLocal.tables: " + JSON.stringify(props.currentSchemaLocal.tables))}
                            {alert("referenceTable: " + props.generatorObject.referenceTable )}
                            */} 
                            {alert("referenceTable: " + props.generatorObject.referenceTable)}
                            {alert(JSON.stringify(props.currentSchemaLocal.tables))}
                            {alert(JSON.stringify(props.currentSchemaLocal.tables.filter(x => { return (x.tableId === props.generatorObject.referenceTable)})))}
                            {(props.currentSchemaLocal.tables.filter(x => { return (x.tableId === props.generatorObject.referenceTable)}))[0].tableItems.map(row => { return <option value={row.fieldName} key={row.rowId}>{row.fieldName}</option>})}
                        
{/*}
                            {const tables = props.currentSchemaLocal.tables;
                    const filteredTables = tables.filter(table => { return table.tableName === selectedTable });
                    const targetTable = filteredTables[0];
                    const targetArray = targetTable.tableItems;
                            targetArray.map(row => { return <option value={row.fieldName}>{row.fieldName}</option>})}*/}



                    </TextField>
                </Grid>

                <Grid container item xs={leftColumnWidth} style={{padding: "10px 0px",  background: "inherit"}}>
                    <Typography variant={fontSizeLeftColumn}>Choose by:</Typography>
                </Grid>


                <Grid container item xs={rightColumnWidth} style={{padding: "10px 0px",  background: "inherit"}}>
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
                                <option value="random">random</option>
                                <option value="randomShuffle">randomShuffle</option>
                                <option value="permutationRandom">permutationRandom</option>
                                <option value="sameChoiceAs">sameChoiceAs</option>
                                <option value="relativeRowMapping">relativeRowMapping</option>
                                <option value="relativeUnique">relativeUnique</option>                        
                    </TextField>
                </Grid>




                <Grid container item xs={leftColumnWidth} style={{padding: "10px 0px",  background: "inherit"}}>
                    <Typography variant={fontSizeLeftColumn}>Select From:</Typography>
                </Grid>


                <Grid container item xs={rightColumnWidth} style={{padding: "10px 0px",  background: "inherit"}}>
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
                                <option value="historical">historical</option>
                                <option value="atInsert">atInsert</option>
                                <option value="fixedTimeFrame">fixedTimeFrame</option>
                                <option value="sameTimeFrame">sameTimeFrame</option>
                                <option value="relativeTimeFrame">relativeTimeFrame</option>
                        
                    </TextField>
                </Grid>



            </Grid>       
      
      </div>
    </>
  );
}