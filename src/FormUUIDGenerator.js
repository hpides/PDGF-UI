import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from "@material-ui/core/Input";
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

export default function FormUUIDGenerator(props) {
    const classes = useStyles();
    const leftColumnWidth = 5;
    const rightColumnWidth = 12 - leftColumnWidth; 
    const fontSizeLeftColumn = "h5";

  
    // Change Handler Input Fields
    const minimumChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.minimum = event.target.value;
        props.setGeneratorObject(newGenerator);
    };


   

  return (
    <>
   
        <Grid container className={classes.outerContainer}>
            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                        No Input required. Just save and continue. 
                    </Typography>
                </Grid>
            </Grid>     
      </Grid>
    </>
  );
}