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
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AlarmIcon from "@material-ui/icons/Alarm";
import AppleIcon from "@material-ui/icons/Apple";
import AllInboxIcon from "@material-ui/icons/AllInbox";



const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(3),
      padding: "auto"
    },
    outerContainer: {
        width: "1000px",
        height: "700px",
    },
  }));

export default function CentralButtonGroup(){
    const classes = makeStyles();

    return(
        <div style={{background: "green", height: "90vh", display: "flex", justify: "center"}}>
            <Grid  style={{background: "red", height: "90vh", margin: "auto"}} container  direction="column" justify="center">
                
                <Grid item style={{background: "yellow", height: "200px", width: "500px", padding: "30px"}}>
                    <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<AppleIcon />}
                    >
                        Load Schema from Repo
                    </Button>
                </Grid>
                <Grid item style={{background: "orange", height: "200px", width: "500px", padding: "30px"}}>
                    <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<AllInboxIcon />}
                    >
                        Load Schema from Disc
                    </Button>
                </Grid>
                <Grid item style={{background: "brown",  height: "200px", width: "500px", padding: "30px"}}>
                    <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<AlarmIcon />}
                    >
                        Create Schema with Editor
                    </Button>
                </Grid>
            </Grid>
         </div>   
    )
    
};