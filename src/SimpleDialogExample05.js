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

import Slide from '@material-ui/core/Slide';
import DialogActions from "@material-ui/core/DialogActions";
import FormAggregationTest01 from "./FormAggregationTest01";
import FormLongGenerator from "./FormLongGenerator";
import FormDoubleGenerator from "./FormDoubleGenerator";
import FormRandomStringGenerator from "./FormRandomStringGenerator";
import FormDictListGenerator from "./FormDictListGenerator";

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

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


  return (
    <Dialog 
        onClose={handleClose} 
        aria-labelledby="simple-dialog-title" 
        open={open}
        titel="Dialog"
        TransitionComponent={Transition}
        keepMounted
        PaperProps={{elevation: "24", square: "true", classes: {root : {backgroundColor: "red"} }}}
        fullWidth
        maxWidth="md"
        >
      <DialogTitle id="simple-dialog-title">Test Form 01</DialogTitle>
      <div  style={{overflow: "auto", margin: "auto", padding: "0px", background: "yellow"}}>
      <FormDictListGenerator/>
      </div>
      <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>  
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogExample05(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Form Aggregation Test
      </Button>
      <SimpleDialog  open={open} onClose={handleClose} data={props.data} />
    </div>
  );
}