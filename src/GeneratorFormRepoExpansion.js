import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
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
    alignContent: "flex-start",
    alignItems: "flex-start",
  },
  innerContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignContent: "center",
    marginRight: 20,
    backgroundColor: "white",
  }, 
  inputSecondLevel: {
    fontSize: 16,
  },
  collapseContainer: {
    width: "100%",
  }
}));

export default function GeneratorFormRepoExpansion(props) {
  const classes = useStyles();

  const leftColumnWidth = 3;
  const rightColumnWidth = 8; 
  const fontSizeLeftColumn = "h5"
  const fontSizeSecondLevel ="16px"
  

  return (
    
    <>
      <Grid  container className={classes.outerContainer} style={{ marginTop: props.generatorObject.repoVariables.saveInRepo? "30px": "0px" }}>
          <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
              <Grid item >
                  <Typography variant={fontSizeLeftColumn}>
                      Save in Repo:
                  </Typography>
              </Grid>
          </Grid>

          <Grid item xs={1}>
              <Checkbox 
                  inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                  checked={props.generatorObject.repoVariables.saveInRepo}
                  onChange={event => {props.saveInRepoChangedHandler(event)}}/>
          </Grid>  
      

          <Grid item xs={rightColumnWidth-1}>

              <Collapse in={props.generatorObject.repoVariables.saveInRepo}>
                  <Grid  container className={classes.collapseContainer}>
                          <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                              <Grid item >
                                  <Typography variant={fontSizeSecondLevel}>
                                      Name:
                                  </Typography>
                              </Grid>
                          </Grid>

                          <Grid item xs={rightColumnWidth} style={{background: "inherit"}}>
                              <Input 
                                  placeholder="Enter Name" 
                                  className={classes.inputSecondLevel}
                                  value={props.generatorObject.repoVariables.name}
                                  onChange={event => {props.nameChangedHandler(event)}}
                                  fullWidth
                                  inputProps = {{maxLength: 60}}
                                  />
                          </Grid>

                          <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                              <Grid item >
                                  <Typography variant={fontSizeSecondLevel}>
                                      Description:
                                  </Typography>
                              </Grid>
                          </Grid>

                          <Grid item xs={rightColumnWidth} style={{background: "inherit"}}>
                              <Input 
                                  placeholder="Enter Description" 
                                  multiline 
                                  className={classes.inputSecondLevel}
                                  value={props.generatorObject.repoVariables.description}
                                  onChange={event => {props.descriptionChangedHandler(event)}}
                                  fullWidth
                                  inputProps = {{maxLength: 200}}
                              />
                          </Grid>

                          <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                              <Grid item >
                                  <Typography variant={fontSizeSecondLevel}>Examples:</Typography>
                              </Grid>
                          </Grid>

                          <Grid item xs={rightColumnWidth} style={{background: "inherit"}}>
                                  <Input 
                                      placeholder="Enter Examples" 
                                      multiline 
                                      fullWidth
                                      className={classes.inputSecondLevel}
                                      value={props.generatorObject.repoVariables.examples}
                                      onChange={event => {props.examplesChangedHandler(event)}}
                                      />
                          </Grid>
                  </Grid>
              </Collapse> 
          </Grid>
        </Grid>
    </>
    
  );
}

