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

export default function ExpansionPanelSimple() {
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
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}></Typography>
          <Checkbox
            checked = {checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'primary checkbox' }}
         />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid style={{display: "flex", justifycontent: "space-between"}} xs={5}>
          <TextField id="outlined-basic4" label="Enter some additional Data here!" variant="outlined" />
          <TextField id="outlined-basic5" label="And also here!" variant="outlined" />
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
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
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel disabled>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}>Disabled Expansion Panel</Typography>
        </ExpansionPanelSummary>
      </ExpansionPanel>
    </div>
  );
}