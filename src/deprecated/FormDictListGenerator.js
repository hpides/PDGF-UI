import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import GeneratorFormNullValuesElement from "../GeneratorFormNullValuesElement";
import GeneratorFormPaddingExpansion from "../GeneratorFormPaddingExpansion";
import MenuItem from '@material-ui/core/MenuItem';
import GeneratorFormRepoExpansion from "../GeneratorFormRepoExpansion";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  input: {
    fontSize: 22,
  },
  inputSelect: {
    fontSize: 22,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function FormDictListGenerator(props) {
  const classes = useStyles();
  const [dictList, setDictList] = useState('start');
  const leftColumnWidth = 5;
  const rightColumnWidth = 12 - leftColumnWidth; 
  const fontSizeLeftColumn = "h5"
  const handleChange = (event) => {
    setDictList(event.target.value);
  };

const dictData2 = [
  {value: "Vornamen", label: "Vornamen"},
  {value: "Nachnamen", label: "Nachnamen"},
  {value: "Strassennamen", label: "Strassennamen"},
  {value: "Ort", label: "Ort"},
  {value: "PLZ", label: "PLZ"},
  {value: "Telefon-Nummern", label: "Telefon-Nummern"},
  {value: "IBAN", label: "IBAN"},
  {value: "Länder", label: "Länder"},
  {value: "Sozialversicherungs-Nummern", label: "Sozialversicherungs-Nummern"},
  {value: "Steuer-Nummern", label: "Steuer-Nummern"},
  {value: "Bankunternehmen", label: "Bankunternehmen"},
]



  return (
      <>
              <Grid direction="row" container item xs={12} style={{paddingLeft: "20px"}}>
                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Dictionary:</Typography>
                </Grid>
                <Grid container item xs={8}>
                <TextField
                    id="standard-select-currency-native"
                    select
                    label="Native select"
                    value={dictList}
                    onChange={handleChange}
                    InputProps={{ classes: { root: classes.inputSelect } }}
                    SelectProps={{
                        native: true,
                    }}
                    helperText="Please select your currency"
                    >
                {dictData2.map((option) => (
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
                  <Input placeholder="Enter Maximum" className={classes.input}/>
                </Grid>
                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Decimal Places:</Typography>
                </Grid>
                <Grid container item xs={rightColumnWidth}>
                  <Input placeholder="Enter Number of Decimalplaces" className={classes.input}/>
                </Grid>
                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Locale:</Typography>
                </Grid>
                <Grid container item xs={rightColumnWidth}>
                  <Input placeholder="Enter Locale (Country whose formats to apply)" className={classes.input}/>
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

              <Grid direction="column" container item xs={12}>
                  <div></div>
                  
              
               
              </Grid> 
      </>
  );
}

