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
import MenuItem from '@material-ui/core/MenuItem';

const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function FormDictListGenerator() {
  const classes = useStyles();
  const [currency, setCurrency] = React.useState('EUR');
  const leftColumnWidth = 3;
  const rightColumnWidth = 12 - leftColumnWidth; 
  const fontSizeLeftColumn = "h5"
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };


  return (
      <>
              <Grid direction="row" container item xs={12}>
                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Dictionary:</Typography>
                </Grid>
                <Grid container item xs={8}>
                <TextField
                    id="standard-select-currency-native"
                    select
                    label="Native select"
                    value={currency}
                    onChange={handleChange}
                    SelectProps={{
                        native: true,
                    }}
                    helperText="Please select your currency"
                    >
                {currencies.map((option) => (
                    <option key={option.value} value={option.value}>
                    {option.label}
                    </option>
                ))}
                </TextField>
                </Grid>
                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Maximum:</Typography>
                </Grid>
                <Grid container item xs={rightColumnWidth}>
                  <Input placeholder="Enter Maximum"/>
                </Grid>
                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Decimal Places:</Typography>
                </Grid>
                <Grid container item xs={rightColumnWidth}>
                  <Input placeholder="Enter Number of Decimalplaces"/>
                </Grid>
                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Locale:</Typography>
                </Grid>
                <Grid container item xs={rightColumnWidth}>
                  <Input placeholder="Enter Locale (Country whose formats to apply)"/>
                </Grid>
                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Distinct Values:</Typography>
                </Grid>
                <Grid container item xs={rightColumnWidth}>
                  <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                </Grid>
                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Fixed Step Size:</Typography>
                </Grid>
                <Grid container item xs={rightColumnWidth}>
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