import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/slider";
import InputAdornment from "@material-ui/core/InputAdornment";
//import cloneDeep from 'lodash/cloneDeep';

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
}));

export default function GeneratorFormNullValuesElement(props) {
  const classes = useStyles();
  const leftColumnWidth = 5;
  const rightColumnWidth = 12 - leftColumnWidth; 
  const fontSizeLeftColumn = "h5"


  return (
    <Grid container style={{background: "inherit"}}>
    
    
      <ExpansionPanel style={{width: 960}}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header">
  
          <Grid item xs={leftColumnWidth} style={{background: "inherit"}}>
            <Typography variant={fontSizeLeftColumn}>
              NullValues:
            </Typography>
          </Grid>
          <Grid item xs={rightColumnWidth} style={{background: "inherit", paddingLeft: 10}}>
              <Checkbox 
                checked={props.generatorObject.nullValues.withNullValues}
                onChange={event => {props.withNullValuesChangedHandler(event)}}
                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
          </Grid>  


        </ExpansionPanelSummary>
        <ExpansionPanelDetails>

              <Grid  container  style={{background: "inherit"}}>
                <Grid item xs={leftColumnWidth} style={{background: "inherit"}}>
                      <Typography variant={fontSizeLeftColumn}>Null Values:</Typography>
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
                          styles={{paddingRight: 30, width: 40,}}
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
                          fullWidth
                        />

                    </Grid>

                  


                </Grid>
           
              </Grid>
             
        </ExpansionPanelDetails>
      </ExpansionPanel>
      
     
    </Grid>
  );
}






