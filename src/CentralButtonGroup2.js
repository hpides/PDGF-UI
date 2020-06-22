import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    icon: {
        width: 30,
        height: 30,
    },
    boxElement: {
        background: "inherit",
        
    },
    button: {
      margin: theme.spacing(1),
      width: "300px",
      height: "95px",
      fontSize: 22,
    },
    container: {       
        backgroundColor: "inherit",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        marginTop: 40,
    },
    
  }));


export default function CentralButtonGroup2(props){
    const classes = useStyles();
    return(
            <Grid className={classes.container} >
                
                <Grid className={classes.boxElement}>
                    <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    onClick={()=> props.handleCloseDialogStartPage()}
                    startIcon={<EditIcon className={classes.icon}/>}
                    >
                        Create Schema with Editor
                    </Button>
                </Grid>
                
                <Grid item  className={classes.boxElement}>
                    <Button
                        variant="contained"
                        color="default"
                        onClick ={()=> {props.handleClickOpenDialogSchemaSelection(); props.handleCloseDialogStartPage()}}
                        className={classes.button}
                        startIcon={<BusinessCenterIcon className={classes.icon}/>}
                        >
                            Use Schema <br/> from Repo
                    </Button>
                </Grid>
                
                <Grid item className={classes.boxElement}>
                    <Button
                        variant="contained"
                        color="default"
                        className={classes.button}
                        startIcon={<FolderOpenIcon className={classes.icon}/>}
                        >
                            Use Schema <br/> from Disc
                    </Button>
                </Grid>
                
            </Grid> 
    )
    
};