
import React , {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from '@material-ui/core/IconButton';
import Input from "@material-ui/core/Input";
import cloneDeep from 'lodash/cloneDeep';


const useStyles = makeStyles({
    input: {
    fontSize: 22,
  },
  inputSelect: {
    fontSize: 22,
  },
});

export default function SequentialGeneratorSelectionFields(props) {
    const classes = useStyles();
    const leftColumnWidth = 5;
    const rightColumnWidth = 12 - leftColumnWidth; 
    const fontSizeLeftColumn = "h5";

    const [selectedValue, setSelectedValue] = useState(0);
   
   /* useEffect(() => {
        const newGenerator = cloneDeep(props.generatorObject);
        const generatorRepo = JSON.parse(localStorage.getItem("generatorRepository"));
        newGenerator.generatorList[props.index] = event.target.value;
    })*/
  
    // Change Handler Input Fields
    const selectedGeneratorChangedHandler = (event) => {
        setSelectedValue(event.target.value);
        const newGenerator = cloneDeep(props.generatorObject);
        const generatorRepo = JSON.parse(localStorage.getItem("generatorRepository"));
        newGenerator.generatorList[props.index]= generatorRepo[event.target.value];
        props.setGeneratorObject(newGenerator);
    };

    const deleteGenerator = () => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.generatorList.splice(props.index, 1);
        props.setGeneratorObject(newGenerator);
    };

  return (
    <>
        <Grid container className={classes.outerContainer}>
            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                        Generator {props.index+1}:
                    </Typography>
                </Grid>
            </Grid>

            <Grid container display= "flex" flexDirection="row" justify="space-between" item xs={rightColumnWidth}>
                <Grid item xs={10}>
                    <TextField
                        id="some-id"
                        className={classes.select}                      
                        select
                        fullWidth
                        value={selectedValue}
                        onChange={(event) => selectedGeneratorChangedHandler(event)}
                        SelectProps={{
                            native: true,
                        }}> 

                        <option value="" key="-1">select</option>
                        {(JSON.parse(localStorage.getItem("generatorRepository")).map((generator, index) => { return <option value={index} key={generator.uid}>{generator.repoVariables.name}</option>}))}   
                    </TextField>
                </Grid>


                <Grid item xs={2}>
                    <IconButton aria-label="delete table" onClick={() => {deleteGenerator()}}> 
                        <CloseIcon />
                    </IconButton>
                </Grid>  

            </Grid>

        </Grid>       
      
    </>
  );
}






/*
 (
    <Grid  item xs={leftColumnWidth} style={{padding: "10px 0px",  background: "lightgreen"}}>
    <Typography variant={fontSizeLeftColumn}>Generator {toString(index+1)}: </Typography>
    </Grid>

    <Grid  item xs={rightColumnWidth} style={{padding: "10px 0px",  background: "lightgreen"}}>
    <TextField
            id="standard-select-currency-native"
            className={classes.select}                      
            select
            fullWidth
            value={props.generatorObject.generatorList[index].generatorUid}
            onChange={(event) => selectedGeneratorChangedHandler(event)}
            SelectProps={{
                native: true,
            }}> 
      {(JSON.parse(localStorage.getItem("generatorRepository")).map(generator => { return <option value={generator.uid} key={generator.uid}>{generator.repoVariables.name}</option>}))}
        
</TextField>
    </Grid>
    
)


*/