import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SequentialGeneratorSelectionField from "./SequentialGeneratorSelectionField";
import cloneDeep from 'lodash/cloneDeep';
import Collapse from '@material-ui/core/Collapse';

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


export default function FormSequentialGenerator(props) {
    const classes = useStyles();
    const leftColumnWidth = 5;
    const rightColumnWidth = 12 - leftColumnWidth; 
    const fontSizeLeftColumn = "h5";
    
    // Change Handler Input Fields
    const concatenateResultsChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.concatenateResults = event.target.checked;
        props.setGeneratorObject(newGenerator);
    };

    const delimiterChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.delimiter = event.target.value;
        props.setGeneratorObject(newGenerator);
    };
   
    const delimitEmptyValuesChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.delimitEmptyValues = event.target.checked;
        props.setGeneratorObject(newGenerator);
    };

    const addGenerator = () => {
      const newGenerator = cloneDeep(props.generatorObject);
      const newGeneratorSelection = {uid: ""};
      newGenerator.generatorList.push(newGeneratorSelection);
      props.setGeneratorObject(newGenerator); 
    }


  return (
    <>
   
        <Grid container className={classes.outerContainer}>
            
            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                        Concatenate Results:
                    </Typography>
                </Grid>
            </Grid>

            <Grid item xs={rightColumnWidth} style={{padding: "10px 0px",  background: "blue"}}>
                <Checkbox 
                    inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                    checked={props.generatorObject.concatenateResults}
                    onChange={(event)=> {concatenateResultsChangedHandler(event)}}
                    />
            </Grid>

            <Collapse in={props.generatorObject.concatenateResults}>
                <>
                <Grid container className={classes.outerContainer}>
                    
                    <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                        <Grid item >
                            <Typography variant={fontSizeLeftColumn}>
                                Delimiter:
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid item xs={rightColumnWidth} style={{padding: "10px 0px",  background: "lightgreen"}}>
                        <Input 
                            className={classes.input} 
                            type="text" 
                            placeholder="Enter Delimiter" 
                            fullWidth
                            value={props.generatorObject.delimiter} 
                            onChange={(event) => delimiterChangedHandler(event)}/>
                    </Grid>

                    <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                        <Grid item >
                            <Typography variant={fontSizeLeftColumn}>
                                Delimit Empty Values:
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid item xs={rightColumnWidth} style={{padding: "10px 0px",  background: "blue"}}>
                        <Checkbox 
                            inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                            checked={props.generatorObject.delimitEmptyValues}
                            onChange={(event)=> {delimitEmptyValuesChangedHandler(event)}}
                        />
                    </Grid>
                </Grid>

                </>  
            </Collapse>
      
            <Grid container item xs={12}>
            {props.generatorObject.generatorList.map((generator, index) => <SequentialGeneratorSelectionField 
                                                                                generator={generator} 
                                                                                index={index}
                                                                                generatorObject={props.generatorObject}
                                                                                setGeneratorObject={props.setGeneratorObject}/>
               
            )}
            </Grid>

            <Grid container item xs={12}>
                <div style={{display: "flex", flexDirection: "row", justifycontent: "flex-start", alignItems: "center"}}>
                      <IconButton onClick={() => {addGenerator()}}>
                          <AddCircleIcon/>
                      </IconButton>
                      <Typography 
                          className={classes.actionLink} 
                          onClick={() => {addGenerator()}}>
                          Add Generator
                      </Typography>
                </div>
            </Grid>  


      </Grid>
    </>
  );
}