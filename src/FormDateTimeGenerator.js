import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import cloneDeep from 'lodash/cloneDeep';



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

export default function FormDateTimeGenerator(props) {
    const classes = useStyles();
    const leftColumnWidth = 5;
    const rightColumnWidth = 12 - leftColumnWidth; 
    const fontSizeLeftColumn = "h5";


    // Change Handler startDate
    const startDateChangedHandler = (event) => {
      const newGenerator = cloneDeep(props.generatorObject);
      newGenerator.startDate = event.target.value;
      props.setGeneratorObject(newGenerator);
    };

     // Change Handler endDate
     const endDateChangedHandler = (event) => {
      const newGenerator = cloneDeep(props.generatorObject);
      newGenerator.endDate = event.target.value;
      props.setGeneratorObject(newGenerator);
    };

    // Change Handler disableRNG
    const disableRNGChangedHandler = (event) => {
      const newGenerator = cloneDeep(props.generatorObject);
      newGenerator.disableRNG = event.target.checked;
      props.setGeneratorObject(newGenerator);
    };

    // Change Handler fixedStepSize
    const fixedStepSizeChangedHandler = (event) => {
      const newGenerator = cloneDeep(props.generatorObject);
      newGenerator.fixedStepSize = event.target.checked;
      props.setGeneratorObject(newGenerator);
  };

    

  return (
    <>
  
        <Grid container className={classes.outerContainer}>
      
            <Grid direction="row" container  style={{paddingLeft: "15px", paddingRight: "30px",}}>          

                <Grid item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Start-Date:</Typography>
                </Grid>

                <Grid item xs={rightColumnWidth}>
                  <Input 
                    className={classes.input} 
                    type="date" 
                    placeholder="Enter Start-Date" 
                    value={props.generatorObject.startDate} 
                    onChange={(event) => startDateChangedHandler(event)}
                    fullWidth/>
                </Grid>



                <Grid item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn} fullwidth>End-Date:</Typography>
                </Grid>

                <Grid item xs={rightColumnWidth}>
                  <Input 
                    className={classes.input} 
                    type="date" 
                    placeholder="Enter End-Date" 
                    value={props.generatorObject.endDate} 
                    onChange={(event) => endDateChangedHandler(event)}
                    fullWidth/>
                </Grid>


                <Grid item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn} fullWidth >Disable RNG:</Typography>
                </Grid>

                <Grid item xs={rightColumnWidth}>
                  <Checkbox 
                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                        checked={props.generatorObject.disableRNG}
                        onChange={(event)=> {disableRNGChangedHandler(event)}}
                        />
                </Grid>


                <Grid item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn} fullWidth>Fixed Step Size:</Typography>
                </Grid>

                <Grid item xs={rightColumnWidth}>
                  <Checkbox 
                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                        checked={props.generatorObject.fixedStepSize}
                        onChange={(event)=> {fixedStepSizeChangedHandler(event)}}
                        />
                </Grid>

                
            </Grid>           
      
      </Grid>

    </>
  );
}

