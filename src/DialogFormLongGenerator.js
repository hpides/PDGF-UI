import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import GeneratorFormPaddingExpansion from "./GeneratorFormPaddingExpansion";
import GeneratorFormRepoExpansion from "./GeneratorFormRepoExpansion";
import Slider from "@material-ui/core/Slider";
import InputAdornment from '@material-ui/core/InputAdornment';
import DistributionInputElement from "./DistributionInputElement";


const useStyles = makeStyles({
    input: {
    fontSize: 22,
  },
  inputSelect: {
    fontSize: 22,
  },
});

export default function DialogFormIdGenerator(props) {
    const classes = useStyles();
    const [dictList, setDictList] = useState("start");
    const leftColumnWidth = 3;
    const rightColumnWidth = 12 - leftColumnWidth; 
    const fontSizeLeftColumn = "h5";

    const [minimum, setMinimum] = useState("");
    const [maximum, setMaximum] = useState("");
    const [allDistinctValues, setAllDistinctValues] = useState("");
    const [distributionValues, setDistributionValues] = useState({});
    const [nullValues, setNullValues] = useState(0);
    const [paddingVariables, setPaddingVariables] = useState({});
    const [repoVariables, setRepoVariables] = useState({});


    // Change Handler Input Fields
    const minimumChangedHandler = (event) => {
        setMinimum(event.target.value);
    }

    // Change Handler Input Fields
    const maximumChangedHandler = (event) => {
        setMaximum(event.target.value);
    }

    // Change Handler Input Fields
    const allDistinctValuesChangedHandler = (event) => {
        setAllDistinctValues(event.target.checked);
    }

    // Change Handler Distribution Component
    const distributionValuesChangedHandler = (distributionObject) => {
        setDistributionValues(distributionObject);
    }

    // Change Handler Slider Component
    const handleNullValuesSliderChange = (event, newValue) => {
      setNullValues(newValue);
    };
  
    const handleNullValuesInputChange = (event) => {
      setNullValues(event.target.value === '' ? '99' : Number(event.target.value));
    };
  
    const handleBlur = () => {
      if (nullValues < 0) {
        setNullValues(0);
      } else if (nullValues > 100) {
        setNullValues(100);
      }
    };

    // Change Handler Padding Component
    const paddingVariablesChangedHandler = (paddingObject) => {
        setPaddingVariables(paddingObject);
    };

    // Change Handler Repo Component
    const repoVariablesChangedHandler = (repoObject) => {
        setRepoVariables(repoObject);
    };


    // Combine to Generator Object
    const buildGeneratorObject = () => {
        const generatorObject = {
          minimum: minimum,
          maximum: maximum,
          distinctValues: distinctValues,
          ...distributionVariables,
          nullValues: nullValues,
          ...paddingVariables,
          ... repoVariables}
        return generatorObject;
    }; 




  return (
    <>
    <Dialog 
        onClose={props.handleCloseIdGenerator} 
        aria-labelledby="simple-dialog-title" 
        open={props.isOpenIdGenerator}
        titel="Dialog"
        //TransitionComponent={Transition}
        keepMounted
        PaperProps={{elevation: "24", square: "true", classes: {root : {backgroundColor: "red"} }}}
        fullWidth
        maxWidth="md"
        >
      <DialogTitle id="simple-dialog-title">Id Generator</DialogTitle>
      <div  style={{overflow: "auto", margin: "auto", padding: "0px", background: "inherit"}}>
      
            <Grid direction="row" container item xs={12} style={{paddingLeft: "15px"}}>

                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Minimum:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth}>
                  <Input 
                    className={classes.input} 
                    type="number" 
                    placeholder="Enter Minimum" 
                    value={minimum} 
                    onChange={(event) => minimumChangedHandler(event)}/>
                </Grid>


                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Maximum:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth}>
                  <Input 
                    className={classes.input} 
                    type="number" 
                    placeholder="Enter Maximum" 
                    value={maximum} 
                    onChange={(event) => maximumChangedHandler(event)}/>
                </Grid>


                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Distinct Values:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth}>
                  <Checkbox 
                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                        checked={distinctValues}
                        onChange={()=> {distinctValuesChangedHandler(event)}}
                        />
                </Grid>

                
                <Grid container item xs={12}>
                    <DistributionInputElement 
                        distributionValuesChangedHandler={distributionValuesChangedHandler}/>
                </Grid>


                <Grid container item xs={leftColumnWidth}>
                      <Typography variant={fontSizeLeftColumn}>Null Values:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth}>
                  <Grid item xs>
                    <Slider
                      value={typeof nullValues === 'number' ? nullValues : 0}
                      onChange={handleNullValuesSliderChange}
                      aria-labelledby="input-slider"
                    />
                  </Grid>

                  <Grid item>
                    <Input
                      className={classes.input}
                      value={nullValues}
                      margin="dense"
                      onChange={handleNullValuesInputChange}
                      onBlur={handleBlur}
                      endAdornment={<InputAdornment position="end">%</InputAdornment>}
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
                </Grid>

            </Grid>       

            <Grid direction="column" container item xs={12}>
                <GeneratorFormPaddingExpansion 
                  paddingVariablesChangedHandler={paddingVariablesChangedHandler} 
                  paddingVariables={paddingVariables}/> 
                <GeneratorFormRepoExpansion 
                  repoVariablesChangedHandler={repoVariablesChangedHandler} 
                  repoVariables={repoVariables}/>
            </Grid>       
      
      </div>

      <DialogActions>
          <Button onClick={()=>console.log("hi")} color="primary">
            Cancel
          </Button>
          <Button 
              onClick={ ()=> {
                props.saveGeneratorHandler(buildGeneratorObject());
                props.handleCloseIdGenerator()}}
              color="primary">
            Save
          </Button>
      </DialogActions>  

    </Dialog>
    </>
  );
}

