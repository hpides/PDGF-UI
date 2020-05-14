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
import GeneratorFormNullValuesElement from "./GeneratorFormNullValuesElement";
import PaddingDropDownElement from "./PaddingDropDownElement";
import GeneratorFormRepoExpansion from "./GeneratorFormRepoExpansion";

const useStyles = makeStyles({
    input: {
    fontSize: 22,
  },
  inputSelect: {
    fontSize: 22,
  },
});

export default function DialogFormDictListGenerator(props) {
    const classes = useStyles();
    const [dictList, setDictList] = useState("start");
    const leftColumnWidth = 3;
    const rightColumnWidth = 12 - leftColumnWidth; 
    const fontSizeLeftColumn = "h5";
    
    const handleChange = (event) => {
      setDictList(event.target.value);
    };

    const dictData2 = [
      {value: "Vornamen", label: "Vornamen"},
      {value: "Nachnamen", label: "Nachnamen"},
      {value: "Strassennamen", label: "Strassennamen"},
      {value: "Ort", label: "Ort"},
      {value: "PLZ", label: "PLZ"},
      {value: "Telefon-Nummern", label: "Telefon-Nummern"},
      {value: "IBAN", label: "IBAN"},
      {value: "Länder", label: "Länder"},
      {value: "Sozialversicherungs-Nummern", label: "Sozialversicherungs-Nummern"},
      {value: "Steuer-Nummern", label: "Steuer-Nummern"},
      {value: "Bankunternehmen", label: "Bankunternehmen"},
    ];
   
   
  const handleClose = () => {
    props.onClose();
  };



  /*const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });*/


  return (
    <>
    <Dialog 
        onClose={props.handleCloseDFDLG} 
        aria-labelledby="simple-dialog-title" 
        open={props.isOpenDFDLG}
        titel="Dialog"
        //TransitionComponent={Transition}
        keepMounted
        PaperProps={{elevation: "24", square: "true", classes: {root : {backgroundColor: "inherit"} }}}
        fullWidth
        maxWidth="md"
        >
      <DialogTitle id="simple-dialog-title">Dict-List Generator</DialogTitle>
      <div  style={{overflow: "auto", margin: "auto", padding: "0px", background: "inherit"}}>
      
              <Grid direction="row" container item xs={12} style={{paddingLeft: "15px"}}>
                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Dictionary:</Typography>
                </Grid>
                <Grid container item xs={8}>
                    <TextField
                        id="standard-select-currency-native"
                        select
                        label="Native select"
                        value={dictList}
                        onChange={handleChange}
                        SelectProps={{
                            native: true,
                        }}
                        helperText="Please select your DictList"
                        >
                        {/*alert("from DialogFormDictListGenerator: " + JSON.stringify(props.dictData))*/}  
                        {dictData2.map((option) => (
                          <option key={option.value} value={option.value}>
                          {option.label}
                          </option>))}
                    
                    </TextField>

                </Grid>

                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Maximum:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth}>
                  <Input placeholder="Enter Maximum" className={classes.input}/>
                </Grid>

                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Decimal Places:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth}>
                  <Input placeholder="Enter Number of Decimalplaces" className={classes.input}/>
                </Grid>

                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Locale:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth}>
                  <Input placeholder="Enter Locale (Country whose formats to apply)" className={classes.input}/>
                </Grid>

                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Distinct Values:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth}>
                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                </Grid>

                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Fixed Step Size:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth}>
                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                </Grid>

                <Grid container item xs={12}>
                  <GeneratorFormNullValuesElement/>
                </Grid>  

              </Grid>       

              <Grid direction="column" container item xs={12}>
                  <PaddingDropDownElement/> 
                  <GeneratorFormRepoExpansion/>
              </Grid> 
      
      
      </div>

      <DialogActions>
          <Button onClick={console.log("hi")} color="primary">
            Cancel
          </Button>
          <Button onClick={console.log("hi")} color="primary">
            Save
          </Button>
      </DialogActions>  

    </Dialog>
    </>
  );
}

