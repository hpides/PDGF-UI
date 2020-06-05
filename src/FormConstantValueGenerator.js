import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from "@material-ui/core/Input";
import cloneDeep from 'lodash/cloneDeep';


const useStyles = makeStyles({
    input: {
    fontSize: 22,
  },
  inputSelect: {
    fontSize: 22,
  },
});

export default function FormConstantValueGenerator(props) {
    const classes = useStyles();
    const leftColumnWidth = 5;
    const rightColumnWidth = 12 - leftColumnWidth; 
    const fontSizeLeftColumn = "h5";

  
    // Change Handler Input Fields
    const constantValueChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.constantValue = event.target.value;
        props.setGeneratorObject(newGenerator);
    };


   

  return (
    <>
   
      <div  style={{overflow: "auto", margin: "auto", padding: "0px", background: "inherit"}}>
            <Grid direction="row" container  style={{paddingLeft: "15px", paddingRight: "30px"}}>

                <Grid item xs={leftColumnWidth} style={{padding: "10px 0px",  background: "lightgreen"}}>
                  <Typography variant={fontSizeLeftColumn}>Constant Value:</Typography>
                </Grid>

                <Grid item xs={rightColumnWidth} style={{padding: "10px 0px",  background: "lightgreen"}}>
                  <Input 
                    className={classes.input} 
                    type="text" 
                    placeholder="Enter Constant Value" 
                    fullWidth
                    value={props.generatorObject.constantValue} 
                    onChange={(event) => constantValueChangedHandler(event)}/>
                </Grid>
            </Grid>       
      
      </div>
    </>
  );
}