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
import DeleteIcon from "@material-ui/icons/Delete";
import {generatorFormStyles, generatorFormsLeftColumnWidth, generatorFormsRightColumnWidth, generatorFormFontSizeLeftColumn} from "./styles";

const useStyles = makeStyles({
    ... generatorFormStyles,
    
  table: {
    backgroundColor: "white",
    border: "1px solid black",
    borderCollapse: "collapse",
    width: "100%",
    marginTop: 5,
    marginBottom: 5,
  },  
  headerRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    aignContent: "center",

  },
  td1: {
    border: "1px solid black",
    width: "45%",
    height: 45,
  },
  td2: {
    border: "1px solid black",
    width: "45%",
    height: 45,
  },
  td3: {
    border: "1px solid black",
    width: "10%",
    height: 10,
  },





  tr1: {
    backgroundColor: "red",
  },
  tr2: {
    backgroundColor: "lightgreen",
  },
  deleteIcon: {
    width: "20px",
    height: "20x",
    paddingBottom: "25px",
    paddingRight: "15px",
  },
});

export default function FormSwitchGenerator(props) {
    const classes = useStyles();
    const leftColumnWidth = generatorFormsLeftColumnWidth;
    const rightColumnWidth = generatorFormsRightColumnWidth; 
    const fontSizeLeftColumn = generatorFormFontSizeLeftColumn;
    const [caseOutcomeSetIdCounter, setCaseOutcomeSetIdCounter] = useState(1);
    const [indexSelectedGenerator, setIndexSelectedGenerator] = useState(0);

    // Change Handler Input Fields
    const defaultValueChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.default.staticValue = event.target.value;
        props.setGeneratorObject(newGenerator);
    };

    const subGeneratorChangedHandler = (event) => {
      setIndexSelectedGenerator(event.target.value);
      const newGenerator = cloneDeep(props.generatorObject);
      newGenerator.subGeneratorObject = JSON.parse(localStorage.getItem("generatorRepository")||"[]")[event.target.value];
      props.setGeneratorObject(newGenerator);
  }; 

    const addCaseOutcomeSet = () => {
      const newGenerator = cloneDeep(props.generatorObject);
      const newCaseOutcomeSet = {id: caseOutcomeSetIdCounter, caseValue: "", outcomeGeneratorObject: "", generatorType: "staticValueGenerator", staticValue: ""};
      newGenerator.caseOutcomeSets.push(newCaseOutcomeSet);
      props.setGeneratorObject(newGenerator); 
      setCaseOutcomeSetIdCounter(caseOutcomeSetIdCounter +1);
    };

    const caseValueChangedHandler = (event, index) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.caseOutcomeSets[index].caseValue = event.target.value;
        props.setGeneratorObject(newGenerator);
    };
   
    const staticValueChangedHandler = (event, index) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.caseOutcomeSets[index].staticValue = event.target.value;
        props.setGeneratorObject(newGenerator);
    };


  return (
    <>
   
        <Grid container className={classes.outerContainer}>    
           
            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                        Sub-Generator:
                    </Typography>
                </Grid>
            </Grid>

            <Grid item xs={rightColumnWidth}>
            <select
                id="standard-select-currency-native"
                className={classes.inputSelect}                      
                value={indexSelectedGenerator}
                onChange={(event) => subGeneratorChangedHandler(event)}> 
                  
                    <option value={1} key={-1}>None</option>
                    {(JSON.parse(localStorage.getItem("generatorRepository")||"[]").map((generator,index) => { return <option value={index} key={generator.uid}>{generator.repoVariables.name}</option>}))}
                    
            </select>
            </Grid>

            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                        Mapping:
                    </Typography>
                </Grid>
            </Grid>

            <Grid item xs={rightColumnWidth}>
                <table className={classes.table}>
                    <tbody>
                        <tr className={classes.tr}>
                            <td className={classes.td1} colSpan="1">
                                <Typography>Outcome-Sub-Generator</Typography>
                            </td>
                            <td className={classes.td2} colSpan="1">
                                <Typography>Outcome this</Typography>
                            </td>
                        </tr>

                        { props.generatorObject.caseOutcomeSets.map((set,index) => {return (
                        
                            <tr className={classes.tr} key={index}>
                                <td className={classes.td1} colSpan="1">
                                    <input 
                                        value={set.caseValue}  
                                        onChange={(event) => caseValueChangedHandler(event, index)} 
                                        placeholder="Output Sub-Generator" 
                                        className={classes.tableInput}/>
                                </td>
                                <td className={classes.td2} colSpan="1">
                                    <input 
                                        value={set.staticValue} 
                                        onClick={(event) => {staticValueChangedHandler(event, index)}} 
                                        placeholder="Output this Generator" 
                                        className={classes.tableInput}/>
                                </td>
                                <td className={classes.td3} colSpan="1">
                                    <div>  
                                        <IconButton className={classes.IconButton}> 
                                            <DeleteIcon className={classes.IconButton}/>
                                        </IconButton> 
                                    </div>
                                </td>
                            </tr>
                        )})}

                        <tr className={classes.tr}>
                            <td className={classes.td1} colSpan="1">
                                <Typography>Default Value:</Typography>
                            </td>
                            <td className={classes.td2} colSpan="1">
                                <input 
                                    value={props.generatorObject.default.staticValue} 
                                    onClick={(event) => {defaultValueChangedHandler(event)}} 
                                    placeholder="Enter Default Value" 
                                    className={classes.tableInput}/>
                            </td>
                            <td className={classes.td3} colSpan="1">
                                    <div>  
                                        <IconButton className={classes.IconButton}> 
                                            <AddCircleIcon 
                                                className={classes.IconButton}
                                                onClick={() => {addCaseOutcomeSet()}}
                                            />
                                        </IconButton> 
                                    </div>
                                </td>
                        </tr>








                    </tbody>
                </table>


            {/* first version with divs
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


                        */}


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
            </Grid> 



{/* alternativ to default in table)
            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                        Default:
                    </Typography>
                </Grid>
            </Grid>

            <Grid  item xs={rightColumnWidth}>
                <input 
                    className={classes.input} 
                    type="text" 
                    placeholder="Enter Default" 
                    value={props.generatorObject.default.staticValue} 
                    onChange={(event) => defaultValueChangedHandler(event)}/>
            </Grid>     
      
*/}
      </Grid>
    </>
  );
}
