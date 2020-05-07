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
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function GeneratorDetailsRepoElement() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  }






  return (
    <div className={classes.root}>
    
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <FormControlLabel
          value="start"
          control={<Checkbox color="primary" />}
          label="Save Generator in Repo"
          labelPlacement="start"
            />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <Grid direction="column" justify="flex-start" xs={12}>
              <Grid direction="row" container item>
                <Grid container item xs={4}>
                  <Typography>Name:</Typography>
                </Grid>
                <Grid container item xs={8}>
                  <Input placeholder="Enter Name"/>
                </Grid>
              </Grid>
              <Grid direction="row" container item>
                <Grid container item xs={4}>
                  <Typography>Description:</Typography>
                </Grid>
                <Grid container item xs={8}>
                  <Input placeholder="Enter Description" multiline/>
                </Grid>
              </Grid>
              <Grid direction="row" container item>
                <Grid container item xs={4}>
                  <Typography>Examples:</Typography>
                </Grid>
                <Grid container item xs={8}>
                  <Input placeholder="Enter Examples" multiline/>
                </Grid>
              </Grid>
            </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
     
    </div>
  );
}