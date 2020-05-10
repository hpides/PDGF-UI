import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import AddCircleIcon from "@material-ui/icons/AddCircle";
import SaveIcon from "@material-ui/icons/Save";
import BuildIcon from "@material-ui/icons/Build";
import HelpIcon from "@material-ui/icons/Help";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    //display: 'flex',
    //flexDirection: 'column',
    //alignItems: 'center',
    //padding: "10px",
    //'& > *': {
    //  margin: theme.spacing(1),
    //},
  },
  button: {
    height: "80px",
    width: "80px",
  },
  icon: {
      height: "50px",
      width: "50px",
  },
}));


const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

export default function EditorButtonGroup(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };    


  return (
    <div className={classes.root}>
      <ButtonGroup color="primary" aria-label="outlined primary button group" size="large">
        
      <LightTooltip title="Add new table">
        <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<AddCircleIcon className={classes.icon}/>}
            onClick={props.addNewTableHandler}
        />
      </LightTooltip>

      <LightTooltip title="Edit system variables">
        <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<BuildIcon className={classes.icon}/>}
        />
        </LightTooltip>

        <LightTooltip title="Save or export file">
        <Button
            aria-controls="save-and-export-menu" 
            aria-haspopup="true" 
            onClick={handleClick}
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<SaveIcon className={classes.icon}/>}
        />
        </LightTooltip>
        <Menu
            id="save-and-export-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Save on Disc</MenuItem>
                <MenuItem onClick={handleClose}>Export PDGF-XML</MenuItem>
                <MenuItem onClick={handleClose}>Export JSON</MenuItem>
        </Menu>
        
        <LightTooltip title="Show help">
        <Button
            variant="contained"
            color="default"
            onClick={()=>{props.fairy()}}
            className={classes.button}
            startIcon={<HelpIcon className={classes.icon}/>}
        />
        </LightTooltip>

        <LightTooltip title="Reset Editor">
        <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<DeleteIcon className={classes.icon}/>}
            onClick={()=>{props.resetEditor()}}
        />
        </LightTooltip>

      </ButtonGroup>
    </div>
  );
}