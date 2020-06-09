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

export default function FormOtherFieldValueGenerator(props) {
    const classes = useStyles();
    const leftColumnWidth = 5;
    const rightColumnWidth = 12 - leftColumnWidth; 
    const fontSizeLeftColumn = "h5";

  
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

                        {(props.currentSchemaLocal.tables.filter(x => { 
                            return (x.tableId === props.fieldInFocus.tableId)}))[0].tableItems.map(
                                row => { return <option value={row.fieldName} key={row.rowId}>{row.fieldName}</option>})}          
                </TextField>
            </Grid>     
  
  </Grid>
</>
  );
}