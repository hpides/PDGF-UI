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