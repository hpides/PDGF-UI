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

import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import Typography from '@material-ui/core/Typography';

import DialogActions from "@material-ui/core/DialogActions";

import Input from "@material-ui/core/Input";



const useStyles = makeStyles({
    input: {
    fontSize: 22,
  },
  inputSelect: {
    fontSize: 22,
  },
});

export default function DialogSaveSchema(props) {
    const classes = useStyles();
    const leftColumnWidth = 5;
    const rightColumnWidth = 12 - leftColumnWidth; 
    const fontSizeLeftColumn = "h5";
    const [currentDate, setCurrentDate] = useState("");

    const getDateTime = () => {
      let tempDate = new Date();
      let date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds(); 
      setCurrentDate(date);
    }
       
    useEffect(()=> {
      getDateTime();
    });


  return (
    <>
    <Dialog 
        onClose={props.handleCloseDialogSaveSchema} 
        aria-labelledby="simple-dialog-title" 
        open={props.isOpenDialogSaveSchema}
        titel="Dialog"
        //TransitionComponent={Transition}
        keepMounted
        PaperProps={{elevation: 24 }}
        fullWidth
        maxWidth="md"
        >
      <DialogTitle id="simple-dialog-title">Vor dem Speichern können Sie hier weitere Informationen zum Schema eingeben.</DialogTitle>
     
      <Grid container className={classes.outerContainer}>

                <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                    <Grid item >
                        <Typography variant={fontSizeLeftColumn}>
                        Schema Name:
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item xs={rightColumnWidth}>
                    <Input 
                        className={classes.input} 
                        type="text" 
                        placeholder="Enter_Schema_Name" 
                        value={props.schemaInfoObject.schemaName} 
                        onChange={(event) => props.schemaNameChangedHandler(event)}/>
                </Grid>

                <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                    <Grid item >
                        <Typography variant={fontSizeLeftColumn}>
                            Description:
                        </Typography>
                    </Grid>    
                </Grid>

                <Grid item xs={rightColumnWidth}>
                    <Input 
                        className={classes.input} 
                        type="number" 
                        placeholder="Enter Description" 
                        multiline
                        value={props.schemaInfoObject.description} 
                        onChange={(event) => props.descriptionChangedHandler(event)}/>
                </Grid>

                <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                    <Grid item >
                        <Typography variant={fontSizeLeftColumn}>
                            Author:
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item xs={rightColumnWidth}>
                    <Input 
                        className={classes.input} 
                        type="text" 
                        placeholder="Enter Author" 
                        value={props.schemaInfoObject.author} 
                        onChange={(event) => props.authorChangedHandler(event)}/>
                </Grid>


                <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                    <Grid item >
                        <Typography variant={fontSizeLeftColumn}>
                            Last Edited:
                        </Typography>
                    </Grid>
                </Grid>

                <Grid  item xs={rightColumnWidth}>
                <Input 
                    className={classes.input}  
                    readOnly = {true}
                    value={currentDate} 
                />
                </Grid>


      </Grid>       

               
      

      <DialogActions>
          <Button onClick={()=>{props.handleCloseDialogSaveSchema()}} color="primary">
              Cancel
          </Button>
          <Button onClick={()=>{ 
                      props.saveSchemaOnClickHandler();
                      props.handleCloseDialogSaveSchema();}} 
                  color="primary">
              Save
          </Button>
      </DialogActions>  

    </Dialog>
    </>
  );
}

