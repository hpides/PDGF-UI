import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

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
  const [withPadding, setWithPadding] = useState(false);
  const [numberCharacters, setNumberCharacters] = useState(0);
  const [fillCharacter, setFillCharacter] = useState("");
  const [fromLeft, setFromLeft] = useState(true);

  const leftColumnWidth = 3;
  const rightColumnWidth = 12 - leftColumnWidth; 
  const fontSizeLeftColumn = "h5"
  
// Change Handler 

  const withPaddingChangedHandler = (event) => {
    setWithPadding(event.target.checked);
  };

  const numberCharactersChangedHandler = (event)=> {
      setNumberCharacters(event.target.value)
  };

  const fillCharacterChangedHandler = (event) => {
      setFillCharacter(event.target.value);
  };

  const fromLeftChangedHandler = (event) => {
      setFromLeft(event.target.value)
  };


// Build Repo Object Function

  const buildRepoObject = () => {
      const repoObject={
            withPadding: withPadding,
            numberCharacters: numberCharacters,
            fillCharacter: fillCharacter,
            fromLeft: fromLeft,
        };   
        return repoObject;
  };



  return (
    <Grid container xs={12} style={{background: "inherit"}}>
    
      <ExpansionPanel style={{width: 960}}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Grid container item xs={leftColumnWidth} style={{background: "inherit"}}>
            <Typography variant={fontSizeLeftColumn}>
              Padding:
            </Typography>
          </Grid>
          <Grid container item xs={rightColumnWidth} style={{background: "inherit", paddingLeft: 10}}>
              <Checkbox 
                checked={withPadding}
                onChange={event => {
                    withPaddingChangedHandler(event);
                    props.paddingVariablesChangedHandler(buildRepoObject());
                }}
                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
          </Grid>  

{/*
          <FormControlLabel
          value="start"
          control={<Checkbox color="primary" />}
          label="Padding"
          labelPlacement="start"
            />

*/}

        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
              <Grid  container item xs={12} style={{background: "inherit"}}>
                <Grid container item xs={leftColumnWidth} style={{background: "inherit"}}>
                  <Grid item xs={10}>
                  <Typography variant={fontSizeLeftColumn}>Size:</Typography>
                  </Grid>
                  <Grid item xs={2}>  </Grid>
                </Grid>
                <Grid container item xs={rightColumnWidth} style={{background: "inherit"}}>
                  <Input 
                    placeholder="Enter Size" 
                    className={classes.input}
                    value={numberCharacters}
                    onChange={(event=> {
                        numberCharactersChangedHandler(event);
                        props.paddingVariablesChangedHandler(buildRepoObject()); 
                        })}/>
                </Grid>
                <Grid container item xs={leftColumnWidth}style={{background: "inherit"}}>
                  <Typography variant={fontSizeLeftColumn}>Character:</Typography>
                </Grid>
                <Grid container item xs={rightColumnWidth} style={{background: "inherit"}}>
                  <Input 
                    placeholder="Enter Fill Character" 
                    value={fillCharacter}
                    multiline className={classes.input}
                    onChange={event => {
                        fillCharacterChangedHandler(event);
                        props.paddingVariablesChangedHandler(buildRepoObject());
                        }
                    }/>

                </Grid>
                <Grid container item xs={leftColumnWidth} style={{background: "inherit"}}>
                  <Grid xs={10}>
                    <Typography variant={fontSizeLeftColumn}>Direction:</Typography>
                  </Grid>
                  <Grid xs={2}></Grid>
                </Grid>
                <Grid container item xs={rightColumnWidth}style={{background: "inherit"}} justify="flex-start">
                    
                    <Typography style={{fontSize: "20px"}}> From Left </Typography>
                    
                    
                    <Switch
                        defaultChecked
                        color="default"
                        value={fromLeft}
                        onChange={event => {
                            fromLeftChangedHandler(event);
                            props.paddingVariablesChangedHandler(buildRepoObject());
                        }}
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