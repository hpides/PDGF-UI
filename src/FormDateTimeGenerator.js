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
import FormGeneratorDetailsRepoElement from "./FormGeneratorDetailsRepoElement";
import FormNullValuesElement from "./FormNullValuesElement";
import PaddingDropDownElement from "./PaddingDropDownElement";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function FormLongGenerator() {
  const classes = useStyles();
  

  return (
      <>
              <Grid direction="row" container item xs={12}>
                <Grid container item xs={4}>
                  <Typography>Start Date:</Typography>
                </Grid>
                <Grid container item xs={8}>
                  <Input placeholder="Enter earliest Date"/>
                </Grid>
                <Grid container item xs={4}>
                  <Typography>End Date:</Typography>
                </Grid>
                <Grid container item xs={8}>
                  <Input placeholder="Enter latest Date"/>
                </Grid>
                <Grid container item xs={4}>
                  <Typography>Disable RNG:</Typography>
                </Grid>
                <Grid container item xs={8}>
                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                </Grid>
                <Grid container item xs={4}>
                  <Typography>Fixed Step Size:</Typography>
                </Grid>
                <Grid container item xs={8}>
                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                </Grid>
              </Grid>       

              <Grid direction="row" container item xs={12}>
                  <FormNullValuesElement/>
                  <FormGeneratorDetailsRepoElement/>
                  <PaddingDropDownElement/> 
              </Grid> 
      </>
  );
}