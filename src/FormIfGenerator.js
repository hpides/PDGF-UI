import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from "@material-ui/core/Input";
import IfGeneratorInputComponent from "./IfGeneratorInputComponent";
import cloneDeep from 'lodash/cloneDeep';


const useStyles = makeStyles({
    input: {
    fontSize: 22,
  },
  inputSelect: {
    fontSize: 22,
  },
});

export default function FormIfGenerator(props) {
    const classes = useStyles();
    const leftColumnWidth = 5;
    const rightColumnWidth = 12 - leftColumnWidth; 
    const fontSizeLeftColumn = "h5";

    
    // Change Handler dictionary
   
    const ifChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.if = event.target.value;
        props.setGeneratorObject(newGenerator);
    };

    const thenChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.then = event.target.value;
        props.setGeneratorObject(newGenerator);
    };

    const elseChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.else = event.target.value;
        props.setGeneratorObject(newGenerator);
    };

  

  return (
    <>
    
  
      <div  style={{overflow: "auto", margin: "auto", padding: "0px", background: "inherit"}}>
            <Grid direction="row" container  style={{paddingLeft: "15px", paddingRight: "0px"}}>

                <Grid item xs={12} style={{padding: "0px 0px",}}>
                  <Typography variant={fontSizeLeftColumn}>Select Generator:</Typography>
                </Grid>


                <Grid item xs={12} >
                    <IfGeneratorInputComponent
                        generatorObject={props.generatorObject}
                        setGeneratorObject={props.setGeneratorObject}/>
                </Grid>


                <Grid  item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>If:</Typography>
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

            
                <Grid  item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Then:</Typography>
                </Grid>

                <Grid  item xs={rightColumnWidth}>
                  <Input 
                    className={classes.input} 
                    type="text" 
                    placeholder="Enter Output for if = true" 
                    value={props.generatorObject.then} 
                    fullWidth
                    onChange={(event) => thenChangedHandler(event)}/>
                </Grid>


                <Grid  item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Else:</Typography>
                </Grid>

                <Grid  item xs={rightColumnWidth} style={{padding: "0px 0px",}}>
                  <Input 
                    className={classes.input} 
                    type="text" 
                    placeholder="Enter Output for If=false" 
                    fullWidth
                    value={props.generatorObject.else} 
                    onChange={(event) => elseChangedHandler(event)}/>
                </Grid>
            </Grid>       
      </div>
  
    </>
  );
}