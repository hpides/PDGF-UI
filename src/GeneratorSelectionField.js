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


import React , {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from '@material-ui/core/IconButton';
import Input from "@material-ui/core/Input";
import cloneDeep from 'lodash/cloneDeep';


const useStyles = makeStyles({
    input: {
    fontSize: 22,
  },
  inputSelect: {
    fontSize: 22,
  },
  select: {
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
    marginRight: 20,
    backgroundColor: "white",
  }, 
});

export default function GeneratorSelectionFields(props) {
    const classes = useStyles();
    const leftColumnWidth = 3;
    const rightColumnWidth = 8; 
    const fontSizeLeftColumn = "h5";

    const [selectedValue, setSelectedValue] = useState(0);
   
   /* useEffect(() => {
        const newGenerator = cloneDeep(props.generatorObject);
        const generatorRepo = JSON.parse(localStorage.getItem("generatorRepository"));
        newGenerator.generatorList[props.index] = event.target.value;
    })*/
  
    // Change Handler Input Fields
    const selectedGeneratorChangedHandler = (event) => {
        setSelectedValue(event.target.value);
        const newGenerator = cloneDeep(props.generatorObject);
        const generatorRepo = JSON.parse(localStorage.getItem("generatorRepository"));
        newGenerator.generatorList[props.index]= generatorRepo[event.target.value];
        props.setGeneratorObject(newGenerator);
    };

    const deleteGenerator = () => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.generatorList.splice(props.index, 1);
        props.setGeneratorObject(newGenerator);
    };

  return (
    <>
        <Grid container className={classes.outerContainer}>
            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                        Sub-Generator {props.index+1}:
                    </Typography>
                </Grid>
            </Grid>

            <Grid container display= "flex" flexDirection="row" justify="space-between" item xs={rightColumnWidth}>
                <Grid item xs={11}>
                    <select
                        id="some-id"
                        className={classes.select}                      
                        style={{fontSize: "20px", 
                            width: "100%", 
                            height: "36px", 
                            outlineColor: "darkblue", 
                            borderStyle: "solid",
                            borderWidth: "1px",
                            borderColor: "black",
                            background: "white",
                            paddingLeft: "10px", 
                            borderRadius: "4px",
                            boxSizing: "border-box",
                            margin: "2px"}}
                        value={selectedValue}
                        onChange={(event) => selectedGeneratorChangedHandler(event)}
                        > 

                        <option value="" key="-1">select</option>
                        {(JSON.parse(localStorage.getItem("generatorRepository")).map((generator, index) => { return <option value={index} key={generator.uid}>{generator.repoVariables.name}</option>}))}   
                    </select>
                </Grid>


                <Grid item xs={1}>
                    <IconButton aria-label="delete table" onClick={() => {deleteGenerator()}} style={{paddingLeft: 25,}}> 
                        <DeleteIcon />
                    </IconButton>
                </Grid>  

            </Grid>

        </Grid>       
      
    </>
  );
}






/*
 (
    <Grid  item xs={leftColumnWidth} style={{padding: "10px 0px",  background: "lightgreen"}}>
    <Typography variant={fontSizeLeftColumn}>Generator {toString(index+1)}: </Typography>
    </Grid>

    <Grid  item xs={rightColumnWidth} style={{padding: "10px 0px",  background: "lightgreen"}}>
    <TextField
            id="standard-select-currency-native"
            className={classes.select}                      
            select
            fullWidth
            value={props.generatorObject.generatorList[index].generatorUid}
            onChange={(event) => selectedGeneratorChangedHandler(event)}
            SelectProps={{
                native: true,
            }}> 
      {(JSON.parse(localStorage.getItem("generatorRepository")).map(generator => { return <option value={generator.uid} key={generator.uid}>{generator.repoVariables.name}</option>}))}
        
</TextField>
    </Grid>
    
)


*/