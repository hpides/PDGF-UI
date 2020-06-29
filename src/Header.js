/*
 * WALT - A realistic load generator for web applications.
 *
 * Copyright 2020 Eric Ackermann <eric.ackermann@student.hpi.de>, Hendrik Bomhardt
 * <hendrik.bomhardt@student.hpi.de>, Benito Buchheim
 * <benito.buchheim@student.hpi.de>, Juergen Schlossbauer
 * <juergen.schlossbauer@student.hpi.de>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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



