import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import FormControlLabel from "@material-ui/core/FormControlLabel";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  input: {
    fontSize: 20,
  },  
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function PaddingDropDownElement2() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);
  const leftColumnWidth = 3;
  const rightColumnWidth = 12 - leftColumnWidth; 
  const fontSizeLeftColumn = "h5"
  const handleChange = (event) => {
    setChecked(event.target.checked);
  }

  return (
    <Grid container xs={12} style={{background: "inherit"}}>
    
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Grid container item xs={leftColumnWidth} style={{background: "inherit"}}>
            <Typography variant={fontSizeLeftColumn}>
              Save in Repo:
            </Typography>
          </Grid>
          <Grid container item xs={rightColumnWidth} style={{background: "inherit", paddingLeft: 10}}>
              <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
          </Grid>  

{/*
          <FormControlLabel
          value="start"
          control={<Checkbox color="primary" />}
          label="Padding"
          labelPlacement="start"
            />

*/}

        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
              <Grid  container item xs={12} style={{background: "inherit"}}>
                <Grid container item xs={leftColumnWidth} style={{background: "inherit"}}>
                  <Typography variant={fontSizeLeftColumn}>Name:</Typography>
                </Grid>
                <Grid container item xs={rightColumnWidth} style={{background: "inherit"}}>
                  <Input placeholder="Enter Name" className={classes.input}/>
                </Grid>
                <Grid container item xs={leftColumnWidth} style={{background: "inherit"}}>
                  <Typography variant={fontSizeLeftColumn}>Description:</Typography>
                </Grid>
                <Grid container item xs={rightColumnWidth} style={{background: "inherit"}}>
                  <Input placeholder="Enter Description" multiline className={classes.input}/>
                </Grid>
                <Grid container item xs={leftColumnWidth} style={{background: "inherit"}}>
                  <Typography variant={fontSizeLeftColumn}>Examples:</Typography>
                </Grid>
                <Grid container item xs={rightColumnWidth} style={{background: "inherit"}}>
                    <Grid item xs={7}>
                        <Input placeholder="Enter Examples" multiline className={classes.input}/>
                    </Grid>
                </Grid>
               
              </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
     
    </Grid>
  );
}