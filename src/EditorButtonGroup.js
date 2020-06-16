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
import LoadIcon from '@material-ui/icons/SystemUpdateAlt';
import PanToolIcon from "@material-ui/icons/PanTool";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    //alignItems: 'center',
    //padding: "10px",
    //'& > *': {
    //  margin: theme.spacing(1),
    //},
  },
  button: {
    height: "80px",
    width: "120px",
  },
  label: {
    // Aligns the content of the button vertically.
    fontSize: "16px",
    flexDirection: 'column',
    alignContent: "center",
    justifyContent: "center",
  },
  iconButton: {
      height: "30px",
      width: "30px",
  },
  dragHandle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignContent: "flex-start",
    width: "20px",
  },
  handle: {
    height: "16px",
    width: "16px",
    color: "rgba(190,190,190,0.2)",
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
  const [anchorEl2, setAnchorEl2] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };    

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleCloseMenu2 = () => {
    setAnchorEl2(null);
  };    



  return (
    <div className={classes.root}>
     {/*} <ButtonGroup color="primary" aria-label="outlined primary button group" size="large">*/}
        
      <LightTooltip title="Add new table">
        <Button
            classes={{ root: classes.button, label: classes.label }}
            className={classes.button}
            variant="contained"
            color="default"
            startIcon={<AddCircleIcon className={classes.iconButton}/>}
            onClick={props.addNewTableHandler}>
            Add Table
        </Button>
      </LightTooltip>


        <LightTooltip title="Save or export file">
        <Button
            classes={{}}classes={{ root: classes.button, label: classes.label }}
            className={classes.button}
            aria-controls="save-and-export-menu" 
            aria-haspopup="true" 
            onClick={handleClick}
            variant="contained"
            color="default"
            startIcon={<SaveIcon className={classes.iconButton}/>}>
            Save 
        </Button>
        </LightTooltip>
        <Menu
            id="save-and-export-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            >
                <MenuItem onClick={() => {props.exportSchemaAsJSON(); handleCloseMenu()}}>Save Schema on Disc</MenuItem>
                <MenuItem 
                    onClick={() => {handleCloseMenu(); props.handleClickOpenDialogSaveSchema()}}>
                      Save Schema in LocalStorage 
                </MenuItem>
                <MenuItem onClick={handleCloseMenu}>Save complete State on Disc</MenuItem>
                <MenuItem onClick={() => {props.createXmlForPDGF(); handleCloseMenu()}}>Export PDGF-XML</MenuItem>
                <MenuItem onClick={handleCloseMenu}>Export JSON</MenuItem>

        </Menu>
        


        <LightTooltip title="Load Elements">
        <Button
            classes={{}}classes={{ root: classes.button, label: classes.label }}
            className={classes.button}
            aria-controls="load-elements-menu" 
            aria-haspopup="true" 
            onClick={handleClick2}
            variant="contained"
            color="default"
            startIcon={<LoadIcon className={classes.iconButton}/>}>
          Load
        </Button>
        </LightTooltip>

        <Menu
            id="load-elements-menu"
            anchorEl={anchorEl2}
            keepMounted
            open={Boolean(anchorEl2)}
            onClose={handleCloseMenu2}
            >
                <MenuItem onClick={() => {handleCloseMenu2(); props.openDialogSchemaSelection() }}>Load Schema from LocalStorage</MenuItem>
                <MenuItem 
                    onClick={handleCloseMenu2}>
                      Load Schema from Disc 
                </MenuItem>
                <MenuItem onClick={handleCloseMenu2}>Load Generators from Disc</MenuItem>

        </Menu>


        <LightTooltip title="Reset Editor">
        <Button
            classes={{}}classes={{ root: classes.button, label: classes.label }}
            className={classes.button}
            variant="contained"
            color="default"
            startIcon={<DeleteIcon className={classes.iconButton}/>}
            onClick={()=>{props.resetEditor()}}>
          Reset
        </Button>
    
        </LightTooltip>
        <div className={classes.dragHandle}> <PanToolIcon className={classes.handle}/> </div>

    </div>
  );
}

