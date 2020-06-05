import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import cloneDeep from 'lodash/cloneDeep';

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "row",
        height: "40px",
        width: " 600px",
        background: "inherit",
    },
    textField01: {
    },
    textField02: {
        width: "80px",
    },
    framed: {
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "black",
    },
    buttonGrid: {
        width: "60px",
    },
    icon: {
        width: 25,
        height: 25,
        margin: "auto",
    },

  }));





export default function SwitchGeneratorInputComponent(props){
    const classes = useStyles();


       
    const caseChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        let index = newGenerator.caseOutcomeSets.findIndex(x => x.id === props.id);
        newGenerator.caseOutcomeSets[index].value = event.target.value;
        props.setGeneratorObject(newGenerator);
    };
    
    
    const outcomeChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        let index = newGenerator.caseOutcomeSets.findIndex(x => x.id === props.id);
        newGenerator.caseOutcomeSets[index].probability = event.target.value;
        props.setGeneratorObject(newGenerator);
    };
    
    
    const deleteCaseOutcomeSet = () => {
        const newGenerator = cloneDeep(props.generatorObject);
        let index = newGenerator.caseOutcomeSets.findIndex(x => x.id === props.id);
        newGenerator.caseOutcomeSets.splice(index, 1);
        props.setGeneratorObject(newGenerator);
    }


    return(
    <Grid 
        container className={classes.container} 
        justify = "flex-start"
        styles={{display: "flex", flexDirection: "row", alignItems: "center"}} 
        xs={12}>
            
        <Grid  item className={classes.framed} xs={2}>
        <div style={{display: "flex", justifycontent: "center", width: "40px", height: "40px" }}>
            <Input 
                value={props.id} 
                readOnly="readOnly"
                maxLength={3}
            />
        </div>
        </Grid>

        <Grid  item className={classes.framed}xs={7}>
            <Input 
                defaultValue="Enter Case" 
                value={props.case} 
                onChange={(event) =>
                {caseChangedHandler(event)}}
            />
        </Grid>

        <Grid item className={classes.framed}xs={2}>
            <Input 
                defaultValue="Enter Outcome" 
                value={props.outcome} 
                outcome={(event) =>
                {outcomeChangedHandler(event)}}
            />
        </Grid>

        <Grid item  className={classes.framed} xs={1}>
        <div style={{display: "flex", justifycontent: "center", width: "40px", height: "40px" }}>
            
            <IconButton onClick={() => {deleteCaseOutcomeSet()}}>
                <DeleteIcon className={classes.icon}/>
            </IconButton>    
        </div>
        </Grid> 
               
    </Grid>



         
    )
}


