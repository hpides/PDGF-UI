import React from "react";

import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
   
    outerContainer: {
      flexGrow: 1,
    },
    pageName: {
      paddingLeft: 50,
    },
    helpLink: {
      paddingRight: 40,
    }
    
  }));

export default function Header(){
    const classes = useStyles();

    return(
        <div  className={classes.outerContainer} 
              style={{backgroundColor: "#198f56", 
                      width: "100%", 
                      height: 60, 
                      display: "flex", 
                      flexDirection: "row", 
                      justifyContent: "space-between",
                      alignItems: "center",
                      alignContent: "center",
                      }}>
           
                
                      <Typography className={classes.pageName} variant="h4" style={{flex: "1", color: "white"}}>
                          PDGF-GUI
                      </Typography>
                      <Typography className={classes.helpLink}variant="h6" style={{color: "white"}} >
                      Help 
                      </Typography>
                 


        </div>
    )
}



