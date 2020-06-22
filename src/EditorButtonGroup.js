import React, {useContext} from 'react';
import {TooltipContext} from "./App";
import CustomTooltip from "./CustomTooltip";
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
    position: "relative",
    zIndex: 50000,
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
    height: "20px",
    width: "20px",
    color: "rgba(0,0,0,0.6)",
  },
}));

export default function EditorButtonGroup(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const tooltipVisible = useContext(TooltipContext);

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
        
      <CustomTooltip title={tooltipVisible? "Press here if you want to add an empty table to the working space": ""}>
        <Button
            classes={{ root: classes.button, label: classes.label }}
            className={classes.button}
            variant="contained"
            color="default"
            startIcon={<AddCircleIcon className={classes.iconButton}/>}
            onClick={props.addNewTableHandler}>
            Add Table
        </Button>
      </CustomTooltip>


        <CustomTooltip title={tooltipVisible? "Press here if you want to save your current schema, the schema repository, the generator repository or the xml-specification for the current schema.": ""}>
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
        </CustomTooltip>
        <Menu
            id="save-and-export-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            > 
                <MenuItem onClick={() => {handleCloseMenu(); props.handleClickOpenDialogSaveSchema()}}>Save Current Schema in Repo </MenuItem>
                <MenuItem onClick={() => {props.exportCurrentSchemaAsJSON(); handleCloseMenu()}}>Save Current Schema on Disc</MenuItem>
                <MenuItem onClick={() => {props.createXmlForPDGF(); handleCloseMenu()}}>Save PDGF-Schema Specification File</MenuItem> 
                <MenuItem onClick={() => {props.exportSchemaRepoAsJSON(); handleCloseMenu()}}>Save Schema Repo on Disc</MenuItem>
                <MenuItem onClick={() => {props.exportGeneratorRepoAsJSON(); handleCloseMenu()}}>Save Generator Repo on Disc</MenuItem>
                <MenuItem onClick={() => {props.exportCompleteAppStateAsJSON(); handleCloseMenu()}}>Save complete App State on Disc</MenuItem>
                             
        </Menu>
        


        <CustomTooltip title={tooltipVisible? "Press here if you want to load a schema from the repository or you need to load externally saved schemas, generators or complete App States (schema repository, generator repository and current schema).": ""}>
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
        </CustomTooltip>

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
                <MenuItem onClick={handleCloseMenu2}>Load Complete App State from Disc</MenuItem>

        </Menu>


        <CustomTooltip title={tooltipVisible? "Press here if you want to clear the working space. But be aware, once you reset, the current schema will be lost, unless you saved it to the repository or on disk.": ""}>
        <Button
            classes={{}}classes={{ root: classes.button, label: classes.label }}
            className={classes.button}
            variant="contained"
            color="default"
            startIcon={<DeleteIcon className={classes.iconButton}/>}
            onClick={()=>{props.resetEditor()}}>
                Reset
        </Button>
        </CustomTooltip>
        <div className={classes.dragHandle}> <PanToolIcon className={classes.handle}/> </div>

    </div>
  );
}

