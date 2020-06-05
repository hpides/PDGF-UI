import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Switch from "@material-ui/core/Switch";
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

export default function GeneratorFormPaddingExpansion(props) {
  const classes = useStyles();
  const leftColumnWidth = 5;
  const rightColumnWidth = 12 - leftColumnWidth; 
  const fontSizeLeftColumn = "h5"


  return (
    <Grid container  style={{background: "inherit"}}>
    
      <ExpansionPanel style={{width: 960}}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Grid  item xs={leftColumnWidth} style={{background: "inherit"}}>
            <Typography variant={fontSizeLeftColumn}>
              Padding:
            </Typography>
          </Grid>
          <Grid item xs={rightColumnWidth} style={{background: "inherit", paddingLeft: 10}}>
              <Checkbox 
                checked={props.generatorObject.paddingVariables.withPadding}
                onChange={event => {props.withPaddingChangedHandler(event)}}
                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
          </Grid>  


        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
              <Grid  container style={{background: "inherit"}}>
                <Grid  item xs={leftColumnWidth} style={{background: "inherit"}}>
                  <Grid item xs={10}>
                  <Typography variant={fontSizeLeftColumn}>Size:</Typography>
                  </Grid>
                  <Grid item xs={2}>  </Grid>
                </Grid>
                <Grid item xs={rightColumnWidth} style={{background: "inherit"}}>
                  <Input 
                    placeholder="Enter Size" 
                    className={classes.input}
                    value={props.generatorObject.paddingVariables.numberCharacters}
                    onChange={event=> {props.numberCharactersChangedHandler(event)}}
                    fullWidth
                    />
                </Grid>
                <Grid item xs={leftColumnWidth}style={{background: "inherit"}}>
                  <Typography variant={fontSizeLeftColumn}>Character:</Typography>
                </Grid>
                <Grid item xs={rightColumnWidth} style={{background: "inherit"}}>
                  <Input 
                    placeholder="Enter Fill Character" 
                    value={props.generatorObject.paddingVariables.fillCharacter}
                    multiline className={classes.input}
                    onChange={event => {props.fillCharacterChangedHandler(event)}}
                    fullWidth/>
                    

                </Grid>
                <Grid item xs={leftColumnWidth} style={{background: "inherit"}}>
                  <Grid xs={10}>
                    <Typography variant={fontSizeLeftColumn}>Direction:</Typography>
                  </Grid>
                  <Grid item xs={2}></Grid>
                </Grid>
                <Grid item xs={rightColumnWidth} style={{background: "inherit"}}>
                    
                    <Typography style={{fontSize: "20px"}}> From Left </Typography>
                    
                    
                    <Switch
                        defaultChecked
                        color="default"
                        value={props.generatorObject.paddingVariables.fromLeft}
                        onChange={event => {props.fromLeftChangedHandler(event)}}
                        inputProps={{ 'aria-label': 'checkbox with default color' }}
                    />
                   
                   
                    <Typography style={{fontSize: "20px"}}>From Right </Typography>
                   
                </Grid>
              </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
     
    </Grid>
  );
}






