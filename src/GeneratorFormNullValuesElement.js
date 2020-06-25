import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import Collapse from '@material-ui/core/Collapse';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  input: {
    fontSize: 20,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
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
}));

export default function GeneratorFormNullValuesElement(props) {
  const classes = useStyles();
  const leftColumnWidth = 3;
  const rightColumnWidth = 8; 
  const fontSizeLeftColumn = "h5"
  
  return (
    <>
      <Grid  container className={classes.outerContainer} style={{ marginTop: props.generatorObject.nullValues.withNullValues? "30px": "0px" }}>
          <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                  <Typography variant={fontSizeLeftColumn}>
                      NullValues:
                  </Typography>
                </Grid>
          </Grid>


          <Grid container alignContent="center" item xs={1}>
                <Checkbox 
                  checked={props.generatorObject.nullValues.withNullValues}
                  onChange={event => {props.withNullValuesChangedHandler(event)}}
                  inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
          </Grid>  
      

          <Grid container item xs={rightColumnWidth-1} >

          { props.generatorObject.nullValues.withNullValues?    
                <>                                         
                  <Grid container item xs={3} alignContent="center">
                     
                      <input
                        className={classes.input}
                        value={props.generatorObject.nullValues.percentNullValues}
                        onChange={props.handleNullValuesInputChange}
                        onBlur={props.handleBlur}
                        step = "5"
                        min = "0"
                        max = "99"
                        size = {3}
                        maxLength = {3}
                        style={{width: 40}} 
                        type ="text"
                      />

                      <div style={{display: "flex", alignContent: "center", justifyContent: "center"}}><div>%</div></div>
      
                  </Grid>

                  <Grid container item xs={8} alignContent="center">
                      <Slider
                          value={typeof props.generatorObject.nullValues.percentNullValues === 'number' ? props.generatorObject.nullValues.percentNullValues : 0}
                          onChange={props.handleNullValuesSliderChange}
                          aria-labelledby="input-slider"
                      />
                  </Grid>
                </>
            : null}    

          </Grid>
      </Grid>                                       
    </>
  );
}






