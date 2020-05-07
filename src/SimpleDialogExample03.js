import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import SchemaCardForRepo from "./SchemaCardForRepo";
import SchemaCardForRepoBox from "./SchemaCardForRepoBox";
import GeneratorCardForRepoDiv from "./GeneratorCardForRepoDiv";

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open, data } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog 
        onClose={handleClose} 
        aria-labelledby="simple-dialog-title" 
        open={open}
        title="Dialog"
        maxWidth="md" >
      <DialogTitle id="simple-dialog-title">Select Generator</DialogTitle>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "auto" }}>
      <Grid container display="flex" justify="flex-start" flexWrap="wrap" xs={12}>
      {data.map(element => { return <Grid item xs={4}> <GeneratorCardForRepoDiv data = {element}/> </Grid>})}
      </Grid>
      </div>
    </Dialog>
  );
} 

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogExample03(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Select Generator
      </Button>
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} data={props.data} />
    </div>
  );
}