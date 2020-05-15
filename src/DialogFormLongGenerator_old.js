import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import GeneratorFormNullValuesElement from "./GeneratorFormNullValuesElement";
import GeneratorFormPaddingExpansion from "./GeneratorFormPaddingExpansion";
import GeneratorFormRepoExpansion from "./GeneratorFormRepoExpansion";
import DistributionInputElement from "./DistributionInputElement";

const useStyles = makeStyles({
    input: {
    fontSize: 22,
  },
  inputSelect: {
    fontSize: 22,
  },
});

export default function DialogFormLongGenerator(props) {
    const classes = useStyles();
    const [dictList, setDictList] = useState("start");
    const leftColumnWidth = 3;
    const rightColumnWidth = 12 - leftColumnWidth; 
    const fontSizeLeftColumn = "h5";
    
    
  return (
    <>
    <Dialog 
        onClose={props.handleCloseLongG} 
        aria-labelledby="simple-dialog-title" 
        open={props.isOpenLongG}
        titel="Dialog"
        //TransitionComponent={Transition}
        keepMounted
        PaperProps={{elevation: "24", square: "true", classes: {root : {backgroundColor: "inherit"} }}}
        fullWidth
        maxWidth="md"
        >
      <DialogTitle id="simple-dialog-title">Long Generator</DialogTitle>
      <div  style={{overflow: "auto", margin: "auto", padding: "0px", background: "inherit"}}>
      
            <Grid direction="row" container item xs={12} style={{paddingLeft: "15px"}}>
                
                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Minimum:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth}>
                  <Input placeholder="Enter Minimum" className={classes.input}/>
                </Grid>

                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Maximum:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth}>
                  <Input placeholder="Enter Maximum" className={classes.input}/>
                </Grid>

                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Distinct Values:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth}>
                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                </Grid>


                <Grid container item xs={12}>
                    <DistributionInputElement/>
                </Grid>

                <Grid container item xs={12}>
                  <GeneratorFormNullValuesElement/>
                </Grid>  

              </Grid>       

              <Grid direction="column" container item xs={12}>
                  <GeneratorFormPaddingExpansion/> 
                  <GeneratorFormRepoExpansion/>
              </Grid> 
      
      
      </div>

      <DialogActions>
          <Button onClick={()=>console.log("Servus.")} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>console.log("Servus.")} color="primary">
            Save
          </Button>
      </DialogActions>  

    </Dialog>
    </>
  );
}

