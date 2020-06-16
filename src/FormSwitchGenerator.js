import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Input from "@material-ui/core/Input";
import cloneDeep from 'lodash/cloneDeep';
import SwitchGeneratorInputComponent from "./SwitchGeneratorInputComponent";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";

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

export default function FormSwitchGenerator(props) {
    const classes = useStyles();
    const leftColumnWidth = 5;
    const rightColumnWidth = 12 - leftColumnWidth; 
    const fontSizeLeftColumn = "h5";
    const [caseOutcomeSetIdCounter, setCaseOutcomeSetIdCounter] = useState(1);
    const [indexSelectedGenerator, setIndexSelectedGenerator] = useState(0);

    // Change Handler Input Fields
    const defaultChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.default.staticValue = event.target.value;
        props.setGeneratorObject(newGenerator);
    };

    const subGeneratorChangedHandler = (event) => {
      setIndexSelectedGenerator(event.target.value);
      const newGenerator = cloneDeep(props.generatorObject);
      newGenerator.subGeneratorObject = JSON.parse(localStorage.getItem("generatorRepository"))[event.target.value];
      props.setGeneratorObject(newGenerator);
  }; 

    const addCaseOutcomeSet = () => {
      const newGenerator = cloneDeep(props.generatorObject);
      const newCaseOutcomeSet = {id: caseOutcomeSetIdCounter, caseValue: "", outcomeGeneratorObject: "", generatorType: "staticValueGenerator", staticValue: ""};
      newGenerator.caseOutcomeSets.push(newCaseOutcomeSet);
      props.setGeneratorObject(newGenerator); 
      setCaseOutcomeSetIdCounter(caseOutcomeSetIdCounter +1);
    }
   

  return (
    <>
   
        <Grid container className={classes.outerContainer}>    
           
            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                        Generator:
                    </Typography>
                </Grid>
            </Grid>

            <Grid item xs={rightColumnWidth}>
            <TextField
                id="standard-select-currency-native"
                className={classes.select}                      
                select
                fullWidth
                value={indexSelectedGenerator}
                onChange={(event) => subGeneratorChangedHandler(event)}
                SelectProps={{
                    native: true,
                }}> 
                  
                    <option value={1} key={-1}>None</option>
                    {(JSON.parse(localStorage.getItem("generatorRepository")).map((generator,index) => { return <option value={index} key={generator.uid}>{generator.repoVariables.name}</option>}))}
                    
            </TextField>
            </Grid>

            <Grid container className={classes.body}>
                    {props.generatorObject.caseOutcomeSets.map(set => {return <SwitchGeneratorInputComponent
                                                                          
                                                                          key={set.id}
                                                                          generatorObject={props.generatorObject}
                                                                          setGeneratorObject={props.setGeneratorObject}
                                                                          id={set.id}
                                                                          caseValue={set.caseValue}
                                                                          outcome={set.staticValue}
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


            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                        Default:
                    </Typography>
                </Grid>
            </Grid>

            <Grid  item xs={rightColumnWidth} style={{padding: "10px 0px",  background: "lightgreen"}}>
                <Input 
                    className={classes.input} 
                    type="text" 
                    placeholder="Enter Default" 
                    fullWidth
                    value={props.generatorObject.default.staticValue} 
                    onChange={(event) => defaultChangedHandler(event)}/>
            </Grid>     
      
      </Grid>
    </>
  );
}