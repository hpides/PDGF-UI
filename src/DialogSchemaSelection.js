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

import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import SchemaSelectionCard from "./SchemaSelectionCard";
import BuildIcon from "@material-ui/icons/Build";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from '@material-ui/icons/Info';
import Collapse from "@material-ui/core/Collapse";



const useStyles = makeStyles({
  infoTextBox: {
    backgroundColor: "rgb(204, 255, 204)",
    color: "white",
    borderRadius: 5,
    marginTop: 10,
    marginRigt: 20,
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

export default function DialogSchemaSelection(props) {
  const classes = useStyles();
  const [lastSchemaDeletedAt, setLastSchemaDeletedAt] = useState(0);
  const [infoTextVisible, setInfoTextVisible]  = useState(false);
  const textType = /text.*/;

  const toggleInfoTextVisible = () =>{
    setInfoTextVisible(!infoTextVisible);
  };

  const showInfoText = () => {
      setInfoTextVisible(true);
  };

  const hideInfoText = () => {
    setInfoTextVisible(false);
  };

  const triggerReload = () => {
    setLastSchemaDeletedAt(Date.now);
  }

  const onFileAddedHandler = (event) => {
    const fileInput = event.target;
    const file = fileInput.files[0];
    if (file.type.match(textType)){
       var reader = new FileReader();
       reader.onload = (e) => {
          let schemaRaw = reader.result;
          let schemaJson = JSON.parse(schemaRaw);
          props.setCurrentSchemaLocal(schemaJson);
          alert("setcurrentschema");
          props.handleCloseDialogSchemaSelection();
          alert("handleCloseDialog");}
       reader.readAsText(file);
       
   } else {
        alert("File not supported");
   }
}

  return (
    <Dialog 
        onClose={props.handleCloseDialogSchemaSelection} 
        aria-labelledby="simple-dialog-title" 
        open={props.isOpenDialogSchemaSelection}
        maxWidth="md"
        fullWidth
        >


      <DialogTitle id="simple-dialog-title">
          <Grid container display="flex" direction="row" justify="space-between">
                <Grid container xs={9} item justify="flex-start">
                    <Grid item style={{fontSize: "30px"}}>
                        Select Schema 
                    </Grid>
                    <Grid item>
                        <IconButton onClick={showInfoText}>
                            <InfoIcon/>
                        </IconButton>
                    </Grid>

                </Grid>
                <Grid item xs={3} >
                    <input
                        type="file"
                        color="white"
                        onChange={onFileAddedHandler}
                   />
                   
                </Grid>
                <Grid item xs={12} >
                    <Collapse in={infoTextVisible}>
                      <div className={classes.infoTextBox} onClick={hideInfoText}>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                      </div>
                    </Collapse>
                </Grid>
          </Grid>
      </DialogTitle>    
        
      <DialogContent>
          <div style={{display: "flex", flexDirection: "column", justifycontent: "flex-start"}}>    
          
          
          {(localStorage.getItem("schemaRepository")!== null)? 
            JSON.parse(localStorage.getItem("schemaRepository")).map(element => {
              return <Grid  
                      key={element.uids.schemaUid} item> 
                        <SchemaSelectionCard 
                            input = {element} 
                            loadSelectedSchema={props.loadSelectedSchema} 
                            deleteSchemaFromRepo={props.deleteSchemaFromRepo}
                            triggerReload = {triggerReload}
                            handleCloseDialogSchemaSelection={props.handleCloseDialogSchemaSelection}/> </Grid>}): 
            <div> There are currently no Schemata in the Repository </div>}  
          
          </div>
      </DialogContent>
      <DialogActions>
          <div>
              <Button className={classes.buttonBottom} onClick={()=>props.handleCloseDialogSchemaSelection()} color="primary">
                  Cancel
              </Button>
          </div>
      </DialogActions>
    </Dialog>
  );
}
