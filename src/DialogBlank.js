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
                  <Typography variant="h5">You are here because some lazy, good for nothing bastard did not manage to </Typography>
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

