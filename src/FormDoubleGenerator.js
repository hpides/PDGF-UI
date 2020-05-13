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
import FormGeneratorDetailsRepoElement_deprecated from "./FormGeneratorDetailsRepoElement_deprecated";
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
                  <Typography>Minimum:</Typography>
                </Grid>
                <Grid container item xs={8}>
                  <Input placeholder="Enter Minimum"/>
                </Grid>
                <Grid container item xs={4}>
                  <Typography>Maximum:</Typography>
                </Grid>
                <Grid container item xs={8}>
                  <Input placeholder="Enter Maximum"/>
                </Grid>
                <Grid container item xs={4}>
                  <Typography>Decimal Places:</Typography>
                </Grid>
                <Grid container item xs={8}>
                  <Input placeholder="Enter Number of Decimalplaces"/>
                </Grid>
                <Grid container item xs={4}>
                  <Typography>Locale:</Typography>
                </Grid>
                <Grid container item xs={8}>
                  <Input placeholder="Enter Locale (Country whose formats to apply)"/>
                </Grid>
                <Grid container item xs={4}>
                  <Typography>Distinct Values:</Typography>
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
                  <FormGeneratorDetailsRepoElement_deprecated/>
                  <PaddingDropDownElement/> 
              </Grid> 
      </>
  );
}