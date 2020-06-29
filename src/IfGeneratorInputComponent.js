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

import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AddCircleIcon from "@material-ui/icons/AddCircle";
//import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import IfGeneratorInputSubComponent from "./IfGeneratorInputSubComponent";
import cloneDeep from 'lodash/cloneDeep';

//const useStyles = makeStyles((theme) => ({  }));
   


export default function IfGeneratorInputComponent(props){
    //const classes = useStyles();
  
    const addGenerator=() => {
      const newGenerator=cloneDeep(props.generatorObject);
      const newGeneratorSelectionObject = {name:null, uid: null};
      newGenerator.generatorList.push(newGeneratorSelectionObject);
      props.setGeneratorObject(newGenerator);
    }


    return(
      <>
                 
          {props.generatorObject.generatorList.map((generator, index) => {
                  return <IfGeneratorInputSubComponent 
                              index={index}
                              selectedGenerator ={generator}
                              generatorObject={props.generatorObject}
                              setGeneratorObject={props.setGeneratorObject}/>
          })}  

          <Grid container justify="flex-start" style={{display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center"}}>
              
                  <IconButton onClick={() => {addGenerator()}}>
                      <AddCircleIcon/>
                  </IconButton>
                  <Typography 
                    style={{fontColor: "blue"}}
                    onClick={() => {addGenerator()}}>
                      Add another Generator
                  </Typography>
        
          </Grid> 
    

      </>
    )
}