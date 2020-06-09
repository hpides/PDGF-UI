import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/slider";
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
    backgroundColor: "yellow",
  }, 
}));

export default function GeneratorFormNullValuesElement(props) {
  const classes = useStyles();
  const leftColumnWidth = 5;
  const rightColumnWidth = 12 - leftColumnWidth; 
  const fontSizeLeftColumn = "h5"
  
  return (
    <>
      <Grid  container className={classes.outerContainer}>
          <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                  <Typography variant={fontSizeLeftColumn}>
                      NullValues:
                  </Typography>
                </Grid>
          </Grid>


          <Grid item xs={rightColumnWidth}>
                <Checkbox 
                  checked={props.generatorObject.nullValues.withNullValues}
                  onChange={event => {props.withNullValuesChangedHandler(event)}}
                  inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
          </Grid>  
      </Grid> 


      <Collapse in={props.generatorObject.nullValues.withNullValues}>
          <Grid  container className={classes.outerContainer}>
              <Grid item xs={leftColumnWidth}>
              </Grid>

              <Grid container display="flex" justify="space-between" alignItems="center" item xs={rightColumnWidth}>
                                  
                  <Grid item xs={3}>
                      <TextField
                        className={classes.input}
                        value={props.generatorObject.nullValues.percentNullValues}
                        margin="dense"
                        variant="outlined"
                        onChange={props.handleNullValuesInputChange}
                        onBlur={props.handleBlur}
                        styles={{ width: 40,}}
                        inputProps={{
                          step: 10,
                          min: 0,
                          max: 100,
                          size: 3,
                          type: 'number',
                          'aria-labelledby': 'input-slider',
                        }}
                      />
                  </Grid>

                  <Grid item xs={9}>
                      <Slider
                          value={typeof props.generatorObject.nullValues.percentNullValues === 'number' ? props.generatorObject.nullValues.percentNullValues : 0}
                          onChange={props.handleNullValuesSliderChange}
                          aria-labelledby="input-slider"
                      />
                  </Grid>
      
              </Grid>
          </Grid>

      </Collapse>                                        
    </>
  );
}






