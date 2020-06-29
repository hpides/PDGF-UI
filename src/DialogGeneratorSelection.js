/*
 * WALT - A realistic load generator for web applications.
 *
 * Copyright 2020 Eric Ackermann <eric.ackermann@student.hpi.de>, Hendrik Bomhardt
 * <hendrik.bomhardt@student.hpi.de>, Benito Buchheim
 * <benito.buchheim@student.hpi.de>, Juergen Schlossbauer
 * <juergen.schlossbauer@student.hpi.de>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
import BuildIcon from "@material-ui/icons/Build";
import GeneratorSelectionCard from "./GeneratorSelectionCard";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from '@material-ui/icons/Info';
import Collapse from "@material-ui/core/Collapse";
import {infoTexts} from "./data";
import {infoTextStyles} from "./styles";
//import cloneDeep from 'lodash/cloneDeep';


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
    width: 250,
    height: 48,
    marginRight: 20,
  },
});

export default function DialogGeneratorSelection(props) {
  const classes = useStyles();
  const tooltipVisible = useContext(TooltipContext);
  //const { onClose, selectedValue, isOpenSchemaDialog, schemaDescriptions } = props;

  //const handleClose = () => {
    //onClose();
  //};

  //const handleListItemClick = (value) => {
  //  onClose(value);
  //};

  const [lastGeneratorDeletedAt, setLastGeneratorDeletedAt] = useState(0);
  const [infoTextVisible, setInfoTextVisible]  = useState(false);

  const triggerReload = () => {
      setLastGeneratorDeletedAt(Date.now);
  };


  const toggleInfoTextVisible = () =>{
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
        onClose={props.handleCloseGeneratorSelectionDialog} 
        aria-labelledby="simple-dialog-title" 
        open={props.isOpenGeneratorDialog}
        maxWidth="lg"
        fullWidth>


        <DialogTitle id="simple-dialog-title">
            <Grid container display="flex" direction="row" justify="space-between">
                <Grid container xs={9} item justify="flex-start">
                    <CustomTooltip   placement="top" arrow="true" title={tooltipVisible? "In the following Dialog you will find a selection of readily configured generators for immediate use. If you need to tweak them a little bit, you can do so in the edit mode. You can have your own generators in that selection, when you fill out the 'save-in-rep' attribute and save them in the schema repository.":""} >  
                        <Grid item style={{fontSize: "30px"}}>
                            Select a prefabricated Generator 
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
                        onClick={()=>{props.handleClickOpenRawGeneratorSelectionDialog()}}
                        className={classes.buttonTop}
                        endIcon={<BuildIcon />}
                    >
                        <p> or <span style={{color: "#198f56"}}> Create your own!</span></p>
                    </Button>
                </Grid>
                <Grid item xs={12} >
                    <Collapse in={infoTextVisible}>
                        <div className={classes.infoTextBox} onClick={hideInfoText}>
                            {infoTexts.dialogGeneratorSelection}
                        </div>
                    </Collapse>
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
                                  handleCloseGeneratorSelectionDialog={props.handleCloseGeneratorSelectionDialog}
                                  triggerReload={triggerReload}/> 
                            </Grid>}): 
                    <div> There are currently no Generator in the Repository </div>}  
                
                 </Grid>
            </div>
        </DialogContent>

      <DialogActions>
        <div>
            <Button className={classes.buttonBottom} onClick={()=>props.handleCloseGeneratorSelectionDialog()} color="primary">
                Cancel
            </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
