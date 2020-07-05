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
import Checkbox from "@material-ui/core/Checkbox";


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

export default function FormProbabilityGenerator2(props) {
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

    const valueChangedHandler = (event, index) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.valueProbabilitySets[index].value = event.target.value;
        props.setGeneratorObject(newGenerator);
    };

    const probabilityChangedHandler = (event, index) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.valueProbabilitySets[index].probability = event.target.value;
        props.setGeneratorObject(newGenerator);
    };

    const addValueProbabilitySet = () => {
      let generatorObject = cloneDeep(props.generatorObject);
      let idCounterNew = idCounter + 1;

      let newValueOption = {
          id: idCounterNew,
          value: "",
          probability: "",
      };
      generatorObject.valueProbabilitySets.push(newValueOption);
      props.setGeneratorObject(generatorObject);
      setIdCounter(idCounter+1);
  }

    const deleteValueProbabilitySet =(index) => {
        let generatorObject = cloneDeep(props.generatorObject);
        generatorObject.valueProbabilitySets.splice(index, 1);
        props.setGeneratorObject(generatorObject);
    }

  return (
    <>
   
        <Grid container className={classes.outerContainer}>    
           
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
                                <Typography>Output element</Typography>
                            </td>
                            <td className={classes.td2} colSpan="1">
                                <Typography>Probability</Typography>
                            </td>
                        </tr>

                        { props.generatorObject.valueProbabilitySets.map((set,index) => {return (
                        
                            <tr className={classes.tr} key={index}>
                                <td className={classes.td1} colSpan="1">
                                    <input 
                                        value={set.value}  
                                        onChange={(event) => valueChangedHandler(event, index)} 
                                        placeholder="Enter output value" 
                                        className={classes.tableInput}/>
                                </td>
                                <td className={classes.td2} colSpan="1">
                                    <input 
                                        value={set.probability} 
                                        onChange={(event) => probabilityChangedHandler(event, index)} 
                                        placeholder="Enter output probability" 
                                        className={classes.tableInput}/>
                                </td>
                                <td className={classes.td3} colSpan="1">
                                    <div>  
                                        <IconButton className={classes.IconButton} onClick ={ (event) =>{deleteValueProbabilitySet(event, index) }}> 
                                            <DeleteIcon className={classes.IconButton}/>
                                        </IconButton> 
                                    </div>
                                </td>
                            </tr>
                        )})}

                        
                    </tbody>
                </table>


                <Grid container item className={classes.footer_row}>
                      <div style={{display: "flex", flexDirection: "row", justifycontent: "flex-start", alignItems: "center", paddingTop: "10px"}}>
                          <IconButton onClick={() => {addValueProbabilitySet()}}>
                              <AddCircleIcon/>
                          </IconButton>
                          <Typography 
                              className={classes.actionLink} 
                              onClick={() => {addValueProbabilitySet()}}>
                              Add Generator
                          </Typography>
                      </div>
                </Grid>        
            </Grid> 

            <Grid direction="row" container>

                <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                    <Grid item >
                        <Typography variant={fontSizeLeftColumn}>
                            Disable Shuffling*:
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