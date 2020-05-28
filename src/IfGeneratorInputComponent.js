import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import BuildIcon from "@material-ui/icons/Build";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";
import TableSubComponent from "./TableSubComponent";
import IconButton from "@material-ui/core/IconButton";
import IfGeneratorInputSubComponent from "./IfGeneratorInputSubComponent";
import cloneDeep from 'lodash/cloneDeep';

const useStyles = makeStyles((theme) => ({
   
  }));



export default function IfGeneratorInputComponent(props){
    const classes = useStyles();
    const [generatorIndex, setGeneratorIndex] = useState(1);


    const addGeneratorHandler=() => {
      const newGenerator=cloneDeep(props.generatorObject);
      const newGeneratorSelectionObject = {name:"", uid: "", generatorIndex: generatorIndex};
      newGenerator.generatorList.push(newGeneratorSelectionObject);
      props.setGeneratorObject(newGenerator);
      setGeneratorIndex(generatorIndex+1);
    }


    return(
      <>
                 
          {props.generatorObject.generatorList.map(generator => {
                  return <IfGeneratorInputSubComponent 
                              key={generator.uid}
                              data ={generator}
                              generatorObject={props.generatorObject}
                              setGeneratorObject={props.setGeneratorObject}/>
          })}  

          <Grid container item justify="flex-start" style={{display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center"}}>
              
                  <IconButton onClick={() => {addGeneratorHandler()}}>
                      <AddCircleIcon/>
                  </IconButton>
                  <Typography 
                    style={{fontColor: "blue"}}
                    onClick={() => {addGeneratorHandler()}}>
                      Add another Generator
                  </Typography>
        
          </Grid> 
    

      </>
    )
}