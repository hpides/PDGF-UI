import React, {useState, useContext} from 'react';
import {TooltipContext} from "./App";
import CustomTooltip from "./CustomTooltip";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from '@material-ui/core/Dialog';
//import { blue } from '@material-ui/core/colors';
import {infoBlue} from "./styles";
import BuildIcon from "@material-ui/icons/Build";
import RawGeneratorSelectionCard from "./RawGeneratorSelectionCard";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from '@material-ui/icons/Info';
import Collapse from "@material-ui/core/Collapse";
import {infoTexts} from "./data";
import {infoTextStyles} from "./styles";

const useStyles = makeStyles({
  infoTextBox: {
    ...infoTextStyles
  },
  buttonTop: {
    fontSize: 16,
    width: 250,
    height: 48,
    marginRight: 20,
  },
  buttonBottom: {
    fontSize: 16,
    width: 200,
    height: 48,
    marginRight: 20,
  },
});

export default function DialogRawGeneratorSelection(props) {
  const classes = useStyles();
  const [infoTextVisible, setInfoTextVisible]  = useState(false);
  const tooltipVisible = useContext(TooltipContext);


  const toggleInfoTextVisible = () => {
    setInfoTextVisible(!infoTextVisible);
  };

  const showInfoText = () => {
      setInfoTextVisible(true);
  };

  const hideInfoText = () => {
    setInfoTextVisible(false);
  };



  return (
    <Dialog 
        onClose={props.handleCloseRawGeneratorSelectionDialog} 
        aria-labelledby="simple-dialog-title" 
        open={props.isOpenRawGeneratorDialog}
        maxWidth="lg"
        fullWidth>


        <DialogTitle id="simple-dialog-title">
            <Grid container display="flex" direction="row" justify="space-between">
                <Grid container xs={9} item justify="flex-start">
                    <CustomTooltip   placement="top" arrow="true" title={tooltipVisible? "If you click here, you will get to the base generator selection dialog. Base generators are blueprint of generators that you can customize by specifiying some attributes.":""} >  
                        <Grid item style={{fontSize: "30px"}}>
                            Use our Generator Blueprints to build your customized Generator
                        </Grid>
                    </CustomTooltip>
                    <Grid item>
                            <IconButton 
                                onClick={toggleInfoTextVisible}>
                                    <InfoIcon style={{color: "#385fe0"}}/>
                            </IconButton>
                    </Grid>
                </Grid>

                <Grid container justify="flex-end" item xs={3}>
                    <Button
                        variant="contained"
                        color="inherit"
                        onClick={()=>{props.handleClickOpenGeneratorSelectionDialog()}}
                        className={classes.buttonTop}
                        endIcon={<BuildIcon />}
                    >   

                        <p> or <span style={{color: "#198f56"}}> Use a prefab</span></p>
                    </Button>
                </Grid>
                <Grid item xs={12} >
                    <Collapse in={infoTextVisible}>
                      <div className={classes.infoTextBox} onClick={hideInfoText}>
                        {infoTexts.dialogRawGeneratorSelection}
                      </div>
                    </Collapse>
                </Grid>
            </Grid>
        </DialogTitle>
        <DialogContent>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>    
                <Grid container display="flex" justify="flex-start" flexWrap="wrap">
                 {props.data.map(element => { return <Grid key={element.uid} item xs={4}> <RawGeneratorSelectionCard 
                                                                              data = {element} 
                                                                              handleCloseRawGeneratorSelectionDialog = {props.handleCloseRawGeneratorSelectionDialog}
                                                                              openInputMaskForSelectedGenerator={props.openInputMaskForSelectedGenerator}
                                                                              /> 
                                                      </Grid>})}
                </Grid>
            </div>
        </DialogContent>

      <DialogActions>
        <div> 
            <Button className={classes.buttonBottom} onClick={()=>props.handleCloseRawGeneratorSelectionDialog()} color="primary">
                Cancel
            </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
