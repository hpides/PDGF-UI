import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/checkbox";
import cloneDeep from 'lodash/cloneDeep';
import ProbabilityValueInputComponent from "./ProbabilityValueInputComponent";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import {generatorFormStyles, generatorFormsLeftColumnWidth, generatorFormsRightColumnWidth, generatorFormFontSizeLeftColumn} from "./styles";

const useStyles = makeStyles({ ... generatorFormStyles});

export default function FormProbabilityGenerator(props) {
    const classes = useStyles();
    const leftColumnWidth = generatorFormsLeftColumnWidth;
    const rightColumnWidth = generatorFormsRightColumnWidth; 
    const fontSizeLeftColumn = generatorFormFontSizeLeftColumn;
    const [idCounter, setIdCounter] = useState(0);
  
    // Change Handler Input Fields
    const disableShufflingChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.disableShuffling = event.target.checked;
        props.setGeneratorObject(newGenerator);
    };

    const addValueProbabilitySet = () => {
      let generatorObject = cloneDeep(props.generatorObject);
      let idCounterNew = idCounter + 1;

      let newValueOption = {
          id: idCounterNew,
          value: "another Value",
          probability: "another Probability",
      };
      generatorObject.valueProbabilitySets.push(newValueOption);
      props.setGeneratorObject(generatorObject);
      setIdCounter(idCounter+1);
  }


  return (
    <>
   
      <Grid container className={classes.outerContainer}>
            
          <Grid container className={classes.body}>
          {props.generatorObject.valueProbabilitySets.map(set => {return <ProbabilityValueInputComponent
                                                                                generatorObject={props.generatorObject}
                                                                                setGeneratorObject={props.setGeneratorObject}
                                                                                id={set.id}
                                                                                value={set.value}
                                                                                probability={set.probability}
                                                                                />})} 
          </Grid>  
      

          <Grid item className={classes.footer_row}>
              <div style={{display: "flex", flexDirection: "row", justifycontent: "flex-start", alignItems: "center", paddingTop: "10px"}}>
                  <IconButton onClick={() => {addValueProbabilitySet()}}>
                      <AddCircleIcon/>
                  </IconButton>
                  <Typography 
                      className={classes.actionLink} 
                      onClick={() => {addValueProbabilitySet()}}>
                      Add Set
                  </Typography>
              </div>
          </Grid>     

              <Grid direction="row" container>

                  <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                      <Grid item >
                          <Typography variant={fontSizeLeftColumn}>
                              Disable Shuffling:
                          </Typography>
                      </Grid>
                  </Grid>

                  <Grid  item xs={rightColumnWidth}>
                      <Checkbox 
                              inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                              checked={props.generatorObject.disableShuffling}
                              onChange={(event)=> {disableShufflingChangedHandler(event)}}
                              />
                  </Grid>
              </Grid>       
        
        </Grid>
    </>
  );
}