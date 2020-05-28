import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import Slider from "@material-ui/core/Slider";
import cloneDeep from 'lodash/cloneDeep';



const useStyles = makeStyles({
    input: {
    fontSize: 22,
  },
  inputSelect: {
    fontSize: 22,
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
  
      <div  style={{overflow: "auto", margin: "auto", padding: "0px", background: "inherit"}}>
      
            <Grid direction="row" container item xs={12} style={{paddingLeft: "15px", paddingRight: "30px",}}>          

                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Start-Date:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth}>
                  <Input 
                    className={classes.input} 
                    type="date" 
                    fullwidth
                    placeholder="Enter Start-Date" 
                    value={props.generatorObject.startDate} 
                    onChange={(event) => startDateChangedHandler(event)}
                    fullwidth/>
                </Grid>



                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn} fullwidth>End-Date:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth}>
                  <Input 
                    className={classes.input} 
                    type="date" 
                    fullwidth
                    placeholder="Enter End-Date" 
                    value={props.generatorObject.endDate} 
                    onChange={(event) => endDateChangedHandler(event)}
                    fullwidth/>
                </Grid>


                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn} fullwidth >Disable RNG:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth}>
                  <Checkbox 
                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                        checked={props.generatorObject.disableRNG}
                        onChange={(event)=> {disableRNGChangedHandler(event)}}
                        />
                </Grid>


                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn} fullwidth>Fixed Step Size:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth}>
                  <Checkbox 
                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                        checked={props.generatorObject.fixedStepSize}
                        onChange={(event)=> {fixedStepSizeChangedHandler(event)}}
                        />
                </Grid>

                
            </Grid>           
      
      </div>

    </>
  );
}

