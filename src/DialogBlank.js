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

import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import Typography from '@material-ui/core/Typography';

import DialogActions from "@material-ui/core/DialogActions";





//const useStyles = makeStyles({ });

export default function DialogBlank(props) {
    //const classes = useStyles();
  return (
    <>
    <Dialog 
        onClose={props.handleCloseBlank} 
        aria-labelledby="simple-dialog-title" 
        open={props.isOpenBlank}
        titel="Dialog"
        //TransitionComponent={Transition}
        keepMounted
        PaperProps={{elevation: 24 }}
        fullWidth
        maxWidth="md"
        >
      <DialogTitle id="simple-dialog-title">Blank</DialogTitle>
      <div  style={{overflow: "auto", margin: "auto", padding: "0px", background: "inherit"}}>
      
            <Grid container direction="row" style={{paddingLeft: "15px"}}>

                <Grid  item xs={12}>
                  <Typography variant="h5"> </Typography>
                </Grid>

                

            </Grid>       

               
      
      </div>

      <DialogActions>
          
          <Button style={{ color:"red"}} onClick={() => {console.log("bye")}}>
            Bye
          </Button>
      </DialogActions>  

    </Dialog>
    </>
  );
}

