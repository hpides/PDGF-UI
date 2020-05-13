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
import Slider from '@material-ui/core/Slider';

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
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  

  return (
      <>
              <Grid direction="row" container item xs={12}>
              <Grid container item xs={4}>
                  <Typography>Length Range:</Typography>
                </Grid>
                <Grid container item xs={8}>
                    <Slider
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                    
                    />
                </Grid>
                <Grid container item xs={4}>
                  <Typography>No. distinct characters:</Typography>
                </Grid>
                <Grid container item xs={8}>
                  <Input placeholder="Enter the minimal number of distinct characters in string."/>
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