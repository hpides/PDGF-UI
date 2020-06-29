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

import React, {useState} from "react";
import CentralButtonGroup from "./CentralButtonGroup";
import CentralButtonGroup2 from "./CentralButtonGroup2";
import {makeStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import DropzoneWrapper from "./DropzoneWrapper";
import DropzoneField from "./DropzoneField";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles({
    outerContainer: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    margin: 20,
  },
  innerContainer: {
    width: "1000px",
    display: "flex",
    flexDirection: "column",
    margin: 20,
    //backgroundColor: "lightgrey",

  },
  textBlock: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    //backgroundColor: "blue",
  },
  headingsContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    //backgroundColor: "pink",
    marginBottom: "30px",
  },
  heading: {
    fontSize:"38px",
  },
  subHeading: {
    fontSize:"24px",
    marginBottom: 30,
  },
  text: {
    width: "100%",
    //backgroundColor: "yellow",
    },
  paragraph: {
    marginBottom: "30px",
    fontSize: "20px",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 30,
  },
  deactivateScreen: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignContent: "center",
    alignItems: "center",
    marginTop: 100,
  }
})





export default function DialogStartPage(props){
  const classes = useStyles();
  const [deactivateScreenChecked, setDeactivateScreenChecked]=useState(false);

  const filesAddedHandler = (array) => {
    let file = array[0];
    let textType = /text.*/;
  
    if (file.type.match(textType)) {
      var reader = new FileReader();
      reader.onload = (e) => {
        let rawText = reader.result;
        console.log(rawText);
        let json = JSON.parse(rawText);
        console.log(json);
        props.setCurrentSchemaLocal(json)
        }    
      reader.readAsText(file);  
    } else {
      alert("File not supported!");
    }

    console.log(array);
  }
  
  const deactivateScreen = () => {
    const statosOnLocalStorage = localStorage.setItem("startPageDeactivated", true);
    setDeactivateScreenChecked(true);
  }


    return(
         <Dialog 
         onClose={props.handleCloseDialogStartPage} 
         aria-labelledby="simple-dialog-title" 
         open={props.isOpenDialogStartPage}
         titel="Dialog"
         keepMounted
         PaperProps={{elevation: 24 }}
         fullScreen    
         >
     <Grid container className={classes.outerContainer}>
        <Grid container className={classes.innerContainer}>
              <Grid container className={classes.textBlock} item xs={12}>
                  <Grid container item  xs={12} className={classes.headingsContainer}>
                      <Typography align="center" className={classes.heading}>
                          <span style={{color:"#198f56"}}> Welcome to PDGF-GUI</span>
                      </Typography>
                      <Typography align="center" className={classes.subHeading}>
                          The graphical user interface for the Parallal Data Generation Framework(PDGF).
                      </Typography>   
                  </Grid> 
              
                  <Grid container className={classes.text} item xs={12}>
                      <Typography className={classes.paragraph}>
                          PDGF is the fastest and most efficient generic data generator and basis for the data generator of the new industry standard ETL benchmark TPC_DI. It is  able to reproducibly generate Peta-Bytes of realistic Data for Testing large scale Database Systems and Cloud Applications.  
                      </Typography>
                      <Typography className={classes.paragraph}>
                          PDGF-GUI provides you with an easy and efficient way to to create your own schema-specifications to be run with PDGF.  
                      </Typography>
                      <Typography className={classes.paragraph}>
                      For your smooth start with PDGF you can watch our short <span style={{color: "blue"}}>tutorial</span>, have a look at our <span  style={{color: "blue"}}>example schemas</span> or just start exploring with the <span  style={{color: "blue"}}>editor</span>. - There are info-texts and tooltips everywhere to make sure you don`t get lost. 
                      </Typography>
                  </Grid>


                  <Grid container className={classes.buttonContainer} item xs={12}>
                      <CentralButtonGroup2 
                          schemaDescriptions={props.schemaDescriptions} 
                          stateSchemaSelectionDialog={props.stateSchemaSelectionDialog}
                          isOpenDialogSchemaSelection={props.isOpenDialogSchemaSelection}
                          handleCloseDialogSchemaSelection={props.handleCloseDialogSchemaSelection}
                          handleClickOpenDialogSchemaSelection ={props.handleClickOpenDialogSchemaSelection}
                          handleCloseDialogStartPage={props.handleCloseDialogStartPage}
                          loadSelectedSchema={props.loadSelectedSchema}
                          />
                    </Grid>

{/*
                    <Grid container className={classes.buttonContainer} item xs={12}>
                        <DropzoneWrapper filesAddedHandler={props.filesAddedHandler}>
                            <div style={{width: "100%", heigt: "95px"}}>Drop File Here!</div>
                        </DropzoneWrapper>
                    </Grid >
*/}

{/*}
                    <Grid container className={classes.buttonContainer} item xs={12}>
                        <DropzoneField 
                            filesAddedHandler={props.filesAddedHandler}/>
                    </Grid >
*/}
                    <Grid container className={classes.deactivateScreen} item xs={12}>
                        <Grid item>
                            <Checkbox 
                                checked={deactivateScreenChecked}
                                onChange={deactivateScreen}
                                />
                          </Grid>
                          
                          <Grid item>
                              <Typography>Check the box to get directly to the editor page next time.</Typography>
                          </Grid>
                    </Grid >

              </Grid>
          </Grid>
      </Grid>



       <DialogActions>
           
           <Button onClick={()=>props.handleCloseDialogStartPage()} color="primary">
             Close
           </Button>
       </DialogActions>  
 
     </Dialog>


    )
}