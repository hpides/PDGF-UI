import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SequentialGeneratorSelectionField from "./SequentialGeneratorSelectionField";
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


export default function FormSequentialGenerator(props) {
    const classes = useStyles();
    const leftColumnWidth = 5;
    const rightColumnWidth = 12 - leftColumnWidth; 
    const fontSizeLeftColumn = "h5";
    
    // Change Handler Input Fields
    const concatenateElementsChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.concatenateElements = event.target.checked;
        props.setGeneratorObject(newGenerator);
    };

    const delimiterChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.delimiter = event.target.value;
        props.setGeneratorObject(newGenerator);
    };
   
    const addGenerator = () => {
      const newGenerator = cloneDeep(props.generatorObject);
      const newGeneratorSelection = {uid: ""};
      newGenerator.generatorList.push(newGeneratorSelection);
      props.setGeneratorObject(newGenerator); 
    }


  return (
    <>
   
        <Grid container className={classes.outerContainer}>
            
            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography variant={fontSizeLeftColumn}>
                        Concatenate Elements:
                    </Typography>
                </Grid>
            </Grid>

            <Grid item xs={rightColumnWidth} style={{padding: "10px 0px",  background: "blue"}}>
                <Checkbox 
                    inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                    checked={props.generatorObject.concatenateElements}
                    onChange={(event)=> {concatenateElementsChangedHandler(event)}}
                    />
            </Grid>

            {props.generatorObject.concatenateElements? 
                (<>
                    <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                        <Grid item >
                            <Typography variant={fontSizeLeftColumn}>
                                Delimiter:
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid item xs={rightColumnWidth} style={{padding: "10px 0px",  background: "lightgreen"}}>
                        <Input 
                            className={classes.input} 
                            type="text" 
                            placeholder="Enter Delimiter" 
                            fullWidth
                            value={props.generatorObject.delimiter} 
                            onChange={(event) => delimiterChangedHandler(event)}/>
                    </Grid>
                  </>  
                ): null }
               
      

            {props.generatorObject.generatorList.map((generator, index) => <SequentialGeneratorSelectionField 
                                                                                generator={generator} 
                                                                                index={index}
                                                                                generatorObject={props.generatorObject}
                                                                                setGeneratorObject={props.setGeneratorObject}/>
               
            )}


          <Grid container item className={classes.footer_row}>
              <div style={{display: "flex", flexDirection: "row", justifycontent: "flex-start", alignItems: "center"}}>
                    <IconButton onClick={() => {addGenerator()}}>
                        <AddCircleIcon/>
                    </IconButton>
                    <Typography 
                        className={classes.actionLink} 
                        onClick={() => {addGenerator()}}>
                        Add Generator
                    </Typography>
              </div>
          </Grid>  


      </Grid>
    </>
  );
}