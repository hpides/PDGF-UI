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
import Box from "@material-ui/core/Box";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 5,
    background: "lightgrey",
    '&:hover': {
      background: "grey",
    }
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 20,
  },
  author: {
    fontSize: 12,
    fontStyle: "italic",
  },
  date: {
    fontSize: 12,
    fontStyle: "italic",
  },

  container: {
    background: "lightgrey",
    
  },
  inner_container_left: {
    background: "inherit",
    padding: "5px"
  },
  inner_container_right: {
    background: "inherit",
    padding: "5px"
  },
});

export default function SchemaSelectionCard(props) {
  const classes = useStyles();
  
  return (
    <Box 
      className={classes.root} 
      onClick={()=>{ props.loadSelectedSchema(props.input.uids.schemaUid)}}
    >
        <Grid container classeName={classes.container}>
          <Grid container item className={classes.inner_container_left} xs={3} flexDirection="row" justify="flex-start">
           
            <Grid item>
            <Typography className={classes.title} color="textSecondary" gutterBottom >
              {props.input.info.schemaName}
            </Typography >
            </Grid>
            <Grid item>
            <Typography className={classes.author} color="textSecondary" variant="h5" component="h2" >
            {props.input.info.author}
            </Typography >
            </Grid>
            <Grid item>
            <Typography className={classes.date} color="textSecondary" variant="h5" component="h2" >
            {props.input.info.lastEdited}
            </Typography >
            </Grid>
          </Grid>
          
          <Grid item className={classes.inner_container_middle}  variant="body2" component="p" xs={8}>
            <Typography>
            {props.input.info.description}
            </Typography>
          </Grid>

          <Grid item className={classes.inner_container_middle} xs={1} style={{background: "inherit"}} display="flex" direction="row" >
                    <IconButton onClick={(event) => {event.stopPropagation(); props.deleteSchemaFromRepo(props.input.uids.schemaUid); props.triggerReload()}}>
                        <DeleteIcon />
                    </IconButton>   
          </Grid>

        </Grid>
    </Box>
  );
}

