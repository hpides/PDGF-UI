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