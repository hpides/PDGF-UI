import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
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

export default function FormPrePostFixGenerator(props) {
    const classes = useStyles();
    const leftColumnWidth = 5;
    const rightColumnWidth = 12 - leftColumnWidth; 
    const fontSizeLeftColumn = "h5";

  
    // Change Handler Input Fields
    const preFixChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.preFix = event.target.value;
        props.setGeneratorObject(newGenerator);
    };

    const postFixChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.postFix = event.target.value;
        props.setGeneratorObject(newGenerator);
    };

    const underlyingGeneratorChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.underlyingGenerator = event.target.value;
        props.setGeneratorObject(newGenerator);
    };
   

  return (
    <>
   
        <Grid container className={classes.outerContainer}>

            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                        PreFix:
                    </Typography>
                </Grid>
            </Grid>>

            <Grid  item xs={rightColumnWidth}>
                <Input 
                    className={classes.input} 
                    type="text" 
                    placeholder="Enter PreFix" 
                    fullWidth
                    value={props.generatorObject.preFix} 
                    onChange={(event) => preFixChangedHandler(event)}/>
            </Grid>


            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                        PostFix:
                    </Typography>
                </Grid>
            </Grid>

            <Grid  item xs={rightColumnWidth}>
              <Input 
                className={classes.input} 
                type="text" 
                placeholder="Enter PostFix" 
                fullWidth
                value={props.generatorObject.postFix} 
                onChange={(event) => postFixChangedHandler(event)}/>
            </Grid>

            <Grid  item xs={leftColumnWidth}>
              <Typography variant={fontSizeLeftColumn}>Generator:</Typography>
            </Grid>


            <Grid item xs={rightColumnWidth}>
                <TextField
                    id="standard-select-currency-native"
                    className={classes.select}                      
                    select
                    fullWidth
                    value={props.generatorObject.underlyingGenerator}
                    onChange={(event) => underlyingGeneratorChangedHandler(event)}
                    SelectProps={{
                        native: true,
                    }}> 
                      
                        <option value={null} key={0}>None</option>
                        {(JSON.parse(localStorage.getItem("generatorRepository")).map(generator => { return <option value={generator.uid} key={generator.uid}>{generator.repoVariables.name}</option>}))}
                    
                </TextField>
            </Grid>

        </Grid>       
    </>
  );
}