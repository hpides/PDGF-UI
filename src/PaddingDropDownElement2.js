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
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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
    <Grid container xs={12} style={{background: "black"}}>
    
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Grid container item xs={leftColumnWidth} style={{background: "lightgreen"}}>
            <Typography variant={fontSizeLeftColumn}>
              Save in Repo:
            </Typography>
          </Grid>
          <Grid container item xs={rightColumnWidth} style={{background: "lightblue"}}>
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
              <Grid  container item xs={12} style={{background: "orange"}}>
                <Grid container item xs={leftColumnWidth} style={{background: "violet"}}>
                  <Typography variant={fontSizeLeftColumn}>Size:</Typography>
                </Grid>
                <Grid container item xs={rightColumnWidth} style={{background: "lightred"}}>
                  <Input placeholder="Enter Name"/>
                </Grid>
                <Grid container item xs={leftColumnWidth}style={{background: "violet"}}>
                  <Typography variant={fontSizeLeftColumn}>Character:</Typography>
                </Grid>
                <Grid container item xs={rightColumnWidth} style={{background: "lightred"}}>
                  <Input placeholder="Enter Description" multiline/>
                </Grid>
                <Grid container item xs={leftColumnWidth} style={{background: "violet"}}>
                  <Typography variant={fontSizeLeftColumn}>Direction:</Typography>
                </Grid>
                <Grid container item xs={rightColumnWidth}style={{background: "lightred"}}>
                    <Grid item xs={3}>
                    <Typography variant={fontSizeLeftColumn}>From Left </Typography>
                    </Grid>
                    <Grid item xs={6}>
                    <Switch
                        defaultChecked
                        color="default"
                        inputProps={{ 'aria-label': 'checkbox with default color' }}
                    />
                    </Grid>
                    <Grid item xs={3}>
                    <Typography variant={fontSizeLeftColumn}>From Right </Typography>
                    </Grid>
                    
                </Grid>
              </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
     
    </Grid>
  );
}