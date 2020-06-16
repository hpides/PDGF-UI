import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from "@material-ui/core/Input";
import DistributionInputElement from "./DistributionInputElement";
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

export default function DialogFormRandomStringGenerator(props) {
    const classes = useStyles();
    const leftColumnWidth = 5;
    const rightColumnWidth = 12 - leftColumnWidth; 
    const fontSizeLeftColumn = "h5";


    const minimumNumberOfCharactersChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.minimum = event.target.value;
        props.setGeneratorObject(newGenerator);
    };


    const maximumNumberOfCharactersChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.maximum = event.target.value;
        props.setGeneratorObject(newGenerator);
    };

   
    const characterSetChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.characterSet = event.target.value;
        props.setGeneratorObject(newGenerator);
    };

   


  return (
    <>
        <Grid container className={classes.outerContainer}>
      
                <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                    <Grid item >
                        <Typography variant={fontSizeLeftColumn}>
                            Minimum Number of Characters:
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item xs={rightColumnWidth}>
                    <Input 
                        className={classes.input} 
                        type="number" 
                        fullWidth
                        placeholder="Enter # of characters" 
                        value={props.generatorObject.minimum} 
                        onChange={(event) => minimumNumberOfCharactersChangedHandler(event)}/>
                </Grid>

                <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                    <Grid item >
                        <Typography variant={fontSizeLeftColumn}>
                            Maximum Number of Characters:
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item xs={rightColumnWidth}>
                    <Input 
                        className={classes.input} 
                        type="number" 
                        fullWidth
                        placeholder="Enter # of distinct characters" 
                        value={props.generatorObject.maximum} 
                        onChange={(event) => maximumNumberOfCharactersChangedHandler(event)}/>
                </Grid>


                <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                    <Grid item >
                        <Typography variant={fontSizeLeftColumn}>
                            Characters:
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item xs={rightColumnWidth}>
                    <Input 
                        className={classes.input} 
                        type="text" 
                        fullWidth
                        placeholder="Enter Character Set" 
                        value={props.generatorObject.characterSet} 
                        onChange={(event) => characterSetChangedHandler(event)}/>
                </Grid>


      </Grid>
    </>
  );
}

