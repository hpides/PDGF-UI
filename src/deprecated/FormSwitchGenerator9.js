import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import cloneDeep from 'lodash/cloneDeep';
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SwitchGeneratorInputComponent from "../SwitchGeneratorInputComponent";


const useStyles = makeStyles({
    input: {
    fontSize: 22,
  },
  inputSelect: {
    fontSize: 22,
  },
});

export default function FormSwitchGenerator9(props) {
    const classes = useStyles();
    const leftColumnWidth = 5;
    const rightColumnWidth = 12 - leftColumnWidth; 
    const fontSizeLeftColumn = "h5";
    const [caseOutcomeSetIdCounter, setCaseOutcomeSetIdCounter] = useState(1);

    // Change Handler Input Fields
    const defaultChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.default = event.target.value;
        props.setGeneratorObject(newGenerator);
    };

    const underlyingGeneratorChangedHandler = (event) => {
      const newGenerator = cloneDeep(props.generatorObject);
      newGenerator.underlyingGenerator = event.target.value;
      props.setGeneratorObject(newGenerator);
  }; 

    const addCaseOutcomeSet = () => {
      const newGenerator = cloneDeep(props.generatorObject);
      const newCaseOutcomeSet = {id: caseOutcomeSetIdCounter, case: "", outcome: ""};
      newGenerator.caseOutcomeSets.push(newCaseOutcomeSet);
      props.setGeneratorObject(newGenerator); 
      setCaseOutcomeSetIdCounter(caseOutcomeSetIdCounter +1);
    }

  return (
    <>
   
      <div  style={{overflow: "auto", margin: "auto", padding: "0px", background: "inherit"}}>
            <Grid direction="row" container style={{paddingLeft: "15px", paddingRight: "30px"}}>
                
                <Grid  item xs={leftColumnWidth} style={{padding: "10px 0px",  background: "lightgreen"}}>
                  <Typography variant={fontSizeLeftColumn}>Generator:</Typography>
                </Grid>


                <Grid item xs={rightColumnWidth} style={{padding: "10px 0px",  background: "lightgreen"}}>
                <TextField
                            id="standard-select-currency-native"
                 
                            select
                            fullWidth
                            value={props.generatorObject.underlyingGenerator}
                            onChange={(event) => underlyingGeneratorChangedHandler(event)}
                            SelectProps={{
                                native: true,
                            }}> 
                      
                      <option value={null} key={0}>None</option>
                      {(JSON.parse(localStorage.getItem("generatorRepository")).map(generator => { return <option value={generator.uid} key={generator.uid}>{generator.repoVariables.name}</option>}))}
                        
                </TextField>




                </Grid>

                <Grid container className={classes.body}>
                        {props.generatorObject.caseOutcomeSets.map(set => {return <SwitchGeneratorInputComponent
                                                                              generatorObject={props.generatorObject}
                                                                              setGeneratorObject={props.setGeneratorObject}
                                                                              id={set.id}
                                                                              case={set.case}
                                                                              outcome={set.outcome}
                                                                              />})} 
                </Grid>  


                  <Grid container item className={classes.footer_row}>
                        <div style={{display: "flex", flexDirection: "row", justifycontent: "flex-start", alignItems: "center", paddingTop: "10px"}}>
                              <IconButton onClick={() => {addCaseOutcomeSet()}}>
                                  <AddCircleIcon/>
                              </IconButton>
                              <Typography 
                                  className={classes.actionLink} 
                                  onClick={() => {addCaseOutcomeSet()}}>
                                  Add Generator
                              </Typography>
                        </div>
                  </Grid>        


                <Grid  item xs={leftColumnWidth} style={{padding: "10px 0px",  background: "lightgreen"}}>
                  <Typography variant={fontSizeLeftColumn}>Default:</Typography>
                </Grid>

                <Grid  item xs={rightColumnWidth} style={{padding: "10px 0px",  background: "lightgreen"}}>
                  <Input 
                    className={classes.input} 
                    type="text" 
                    placeholder="Enter Default" 
                    fullWidth
                    value={props.generatorObject.default} 
                    onChange={(event) => defaultChangedHandler(event)}/>
                </Grid>
            </Grid>       
      
      </div>
    </>
  );
}