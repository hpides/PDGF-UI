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