import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Switch from "@material-ui/core/Switch";
import Collapse from '@material-ui/core/Collapse';

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

export default function GeneratorFormPaddingExpansion(props) {
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
                            Padding:
                      </Typography>
                </Grid>
          </Grid>

          <Grid item xs={rightColumnWidth}>
              <Checkbox 
                checked={props.generatorObject.paddingVariables.withPadding}
                onChange={event => {props.withPaddingChangedHandler(event)}}
                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
          </Grid>  

      </Grid>


      <Collapse in={props.generatorObject.paddingVariables.withPadding}>
          <Grid  container className={classes.outerContainer}>
              <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                  <Grid item >
                      <Typography variant={fontSizeLeftColumn}>
                          Size:
                      </Typography>
                  </Grid>
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

              <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                  <Grid item >
                      <Typography variant={fontSizeLeftColumn}>
                          Character:
                      </Typography>
                  </Grid>
              </Grid>

              <Grid item xs={rightColumnWidth} style={{background: "inherit"}}>
                  <Input 
                    placeholder="Enter Fill Character" 
                    value={props.generatorObject.paddingVariables.fillCharacter}
                    multiline className={classes.input}
                    onChange={event => {props.fillCharacterChangedHandler(event)}}
                    fullWidth/>
              </Grid>

              <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                  <Grid item >
                      <Typography variant={fontSizeLeftColumn}>
                          Direction:
                      </Typography>
                  </Grid>
              </Grid>

              <Grid container display="flex" flexDirection="row" justify="flex-start" item xs={rightColumnWidth} style={{background: "inherit"}}>
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
      </Collapse>
    </>
  );
}






