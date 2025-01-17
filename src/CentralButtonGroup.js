import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import AlarmIcon from "@material-ui/icons/Alarm";
import AppleIcon from "@material-ui/icons/Apple";
import AllInboxIcon from "@material-ui/icons/AllInbox";



const useStyles = makeStyles((theme) => ({
    outerBox: {
        display:"flex", 
        flexDirection: "row", 
        //justifycontent:"center",
        background: "white", 
        height: "70vh", 
        margin: "30px", 
        padding: "30px",

    },
    innerBox: {
        display:"flex", 
        flexDirection: "column", 
        //justifycontent: "center", 
        alignItems: "flex-start", 
        background: "white",
        height: "60vh",
    },
    boxElement: {
        background: "yellow",
        padding: "20px", 
        marginLeft:  "auto", 
        marginRight:  "auto", 
        marginTop: "10px"
    },
    button: {
      margin: theme.spacing(1),
      width: "300px",
      height: "95px",
      background: "white",
    },
    outerContainer: {
        width: "1000px",
        height: "700px",
    },
    
  }));


export default function CentralButtonGroup2(props){
    const classes = useStyles();
    return(
        <Box className={classes.outerBox}>
            <Box className={classes.innerBox} >
                
                <Box className={classes.boxElement}>
                    <Button
                    variant="contained"
                    color="default"
                    onClick ={props.handleClickOpenDialogSchemaSelection}
                    className={classes.button}
                    startIcon={<AppleIcon />}
                    >
                        Load Schema from Repo
                    </Button>
                </Box>
                
                <Box className={classes.boxElement}>
                    <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<AllInboxIcon />}
                    >
                        Load Schema from Disc
                    </Button>
                </Box>
                <Box className={classes.boxElement}>
                    <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<AlarmIcon />}
                    >
                        Create Schema with Editor
                    </Button>
                </Box>
                
            </Box>
         </Box>   
    )
    
};