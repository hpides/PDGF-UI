import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import BuildIcon from "@material-ui/icons/Build";
import GeneratorSelectionCard from "./GeneratorSelectionCard";
//import cloneDeep from 'lodash/cloneDeep';


const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export default function DialogGeneratorSelection(props) {
  const classes = useStyles();
  //const { onClose, selectedValue, isOpenSchemaDialog, schemaDescriptions } = props;

  //const handleClose = () => {
    //onClose();
  //};

  //const handleListItemClick = (value) => {
  //  onClose(value);
  //};

  const [lastGeneratorDeletedAt, setLastGeneratorDeletedAt] = useState(0);

  const triggerReload = () => {
    setLastGeneratorDeletedAt(Date.now);
  }

  return (
    <Dialog 
        onClose={props.handleCloseGeneratorDialog} 
        aria-labelledby="simple-dialog-title" 
        open={props.isOpenGeneratorDialog}
        maxWidth="md"
        fullWidth>


        <DialogTitle id="simple-dialog-title">
            <Grid container display="flex" direction="row" justify="space-between">
                <Grid item xs={8} style={{fontSize: "30px"}}>
                    Select Generator 
                </Grid>
                <Grid item xs={4}>
                    <Button
                        variant="contained"
                        color="white"
                        onClick={()=>{props.handleClickOpenRawGeneratorDialog()}}
                        className={classes.button}
                        endIcon={<BuildIcon />}
                    >
                        <p> or <span style={{color: "blue"}}> Create your own!</span></p>
                    </Button>
                </Grid>
            </Grid>
        </DialogTitle>
        <DialogContent>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>    
                <Grid container display="flex" justify="flex-start" flexWrap="wrap">

                {(localStorage.getItem("generatorRepository")!== null)? 
                  JSON.parse(localStorage.getItem("generatorRepository")).map(element => {
                    return <Grid item xs={4}> 
                              <GeneratorSelectionCard 
                                  key={element.uid}
                                  generatorInRepo = {element} 
                                  loadSelectedSchema={props.loadSelectedGenerator}
                                  selectGeneratorHandler={props.selectGeneratorHandler}
                                  handleCloseGeneratorDialog={props.handleCloseGeneratorDialog}
                                  triggerReload={triggerReload}/> 
                            </Grid>}): 
                    <div> There are currently no Generator in the Repository </div>}  
                
                 </Grid>
            </div>
        </DialogContent>

      <DialogActions>
        <div>
            <Button onClick={()=>props.handleCloseDialogGeneratorSelection()} color="primary">
                Cancel
            </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
