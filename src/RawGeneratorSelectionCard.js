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

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import SearchIcon from "@material-ui/icons/Search";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      height: "170px", 
      width: "380px", 
      margin: 10,
      marginBottom: 10,
      background: "white",
      '&:hover': {
        background: "lightgrey",
      }  
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  name: {
    fontSize: 20,
    fontWeight: 500,
  },
  description: {
    fontSize: 16,
    fontStyle: "italic",
  },
  examples: {
    fontSize: 16,
  },

  container: {
    background: "white",
    
  },
  inner_container_top: {
    background: "inherit",
    padding: "5px"
  },
  inner_container_middle: {
    background: "inherit",
    padding: "5px"
  },
  inner_container_bottom: {
    background: "inherit",
    padding: "5px"
  },
});

export default function RawGeneratorSelectionCard(props) {
  const classes = useStyles();

  return (
      <Paper className={classes.root} onClick={()=>{props.openInputMaskForSelectedGenerator(props.data.uid)}}>
        <Grid container classeName={classes.container} direction="column" style={{background: "inherit", padding: "4px",}}>
            <Grid container className={classes.inner_container_top} item xs={12} direction="row" justify="space-between" style={{background: "inherit"}}>
                <Grid item xs={9} style={{background: "inherit"}}>
                    <Typography className={classes.name} color="textSecondary"  >
                        {props.data.name}
                    </Typography >
                </Grid>
                
            </Grid>
            <Grid item style={{background: "inherit"}}>
                <Typography className={classes.description} color="textSecondary" variant="h5" component="h2" >
                {props.data.description}
                </Typography >
            </Grid>
        </Grid>
      </Paper>
  );
}
