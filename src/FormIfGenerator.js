import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from "@material-ui/core/Input";
import IfGeneratorInputComponent from "./IfGeneratorInputComponent";
import cloneDeep from 'lodash/cloneDeep';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import TextField from "@material-ui/core/TextField";


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

export default function FormIfGenerator(props) {
    const classes = useStyles();
    const leftColumnWidth = 5;
    const rightColumnWidth = 12 - leftColumnWidth; 
    const fontSizeLeftColumn = "h5";
    const [optionLine1, setOptionLine1] = useState("write");
    const [optionLine2, setOptionLine2] = useState("write");
    
    // Change Handler dictionary
   
    const ifChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.if = event.target.value;
        props.setGeneratorObject(newGenerator);
    };

    const thenChangedHandlerA = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.then = event.target.value;
        props.setGeneratorObject(newGenerator);
    };

    const thenChangedHandlerB = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.then = event.target.value;
        props.setGeneratorObject(newGenerator);
    };



    const elseChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.else = event.target.value;
        props.setGeneratorObject(newGenerator);
    };

    const option1ChangeHandler = (event, newValue)=>{
        setOptionLine1(newValue);
    }

    const option2ChangeHandler = (event, newValue)=>{
        setOptionLine2(newValue);
    }
  

  return (
    <>
    
        <Grid container className={classes.outerContainer}>

            <Grid item xs={12} style={{padding: "0px 0px",}}>
                <Typography variant={fontSizeLeftColumn}>Select Generator:</Typography>
            </Grid>

            <Grid item xs={12} >
                <IfGeneratorInputComponent
                    generatorObject={props.generatorObject}
                    setGeneratorObject={props.setGeneratorObject}/>
            </Grid>

            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                        If:
                    </Typography>
                </Grid>
            </Grid>

            <Grid item xs={rightColumnWidth}>
                <Input 
                    className={classes.input} 
                    type="text" 
                    placeholder="Enter If-Condition" 
                    value={props.generatorObject.if} 
                    fullWidth
                    multiline
                    onChange={(event) => ifChangedHandler(event)}/>
            </Grid>
        
            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                        Then:
                    </Typography>
                </Grid>
            </Grid>

            <Grid  container item xs={rightColumnWidth}>
                <Grid xs={9}>

                    {(optionLine1==="write")? 
                        <Input 
                            className={classes.input} 
                            type="text" 
                            placeholder="Enter Output for if = true" 
                            value={props.generatorObject.then} 
                            fullWidth
                            onChange={(event) => thenChangedHandlerA(event)}/>

                    : 
                        <TextField
                            id="standard-select-currency-native"
                            className={classes.select}                      
                            select
                            fullWidth
                            value={props.generatorObject.subGeneratorIndex}
                            onChange={(event) => thenChangedHandlerB(event)}
                            SelectProps={{
                                native: true,
                            }}> 
                      
                                <option value={null} key={-1}>None</option>
                                {(JSON.parse(localStorage.getItem("generatorRepository")).map((generator, index) => { 
                                    return  <option value={index} key={generator.uid}>
                                                {generator.repoVariables.name}
                                            </option>}))}
                    
                        </TextField>}

                </Grid>
                <Grid xs={3}>

                    <ToggleButtonGroup
                        value={optionLine1}
                        exclusive
                        onChange={option1ChangeHandler}
                        aria-label="text alignment"
                    >

                        <ToggleButton value="write">
                            <FormatAlignLeftIcon />
                        </ToggleButton>
                        <ToggleButton value="select">
                            <FormatAlignCenterIcon />
                        </ToggleButton>

                    </ToggleButtonGroup>    

                </Grid>
            </Grid>

            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                        Else:
                    </Typography>
                </Grid>
            </Grid>

            <Grid  container item xs={rightColumnWidth} >
               
               {}

               <Grid xs={9}>
                    <Input 
                        className={classes.input} 
                        type="text" 
                        placeholder="Enter Output for If=false" 
                        fullWidth
                        value={props.generatorObject.else} 
                        onChange={(event) => elseChangedHandler(event)}/>
                </Grid>

                <Grid xs={3}>
                    <ToggleButtonGroup
                        value={optionLine1}
                        exclusive
                        onChange={option1ChangeHandler}
                        aria-label="text alignment"
                    >

                        <ToggleButton value="write">
                            <FormatAlignLeftIcon />
                        </ToggleButton>
                        <ToggleButton value="select">
                            <FormatAlignCenterIcon />
                        </ToggleButton>

                    </ToggleButtonGroup>    

                </Grid>
            </Grid>

        </Grid>
  
    </>
  );
}