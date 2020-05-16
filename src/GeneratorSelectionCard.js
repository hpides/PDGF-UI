import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: 5,
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
  },
  description: {
    fontSize: 12,
    fontStyle: "italic",
  },
  examples: {
    fontSize: 12,
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

export default function GeneratorSelectionCard(props) {
  const classes = useStyles();

  return (
      <Box className={classes.root} onClick={()=>{props.selectRawGeneratorHandler(props.data.uid)}} style={{height: "170px", width: "200px", margin: "3px"}}>
        <Grid container classeName={classes.container} direction="column" xs={12} style={{background: "inherit", padding: "4px",}}>
            <Grid container item className={classes.inner_container_top} xs={12} direction="row" justify="space-between" style={{background: "inherit"}}>
                <Grid container item xs={9} style={{background: "inherit"}}>
                    <Typography className={classes.name} color="textSecondary"  >
                        {props.data.name}
                    </Typography >
                </Grid>
                <Grid container item className={classes.inner_container_middle} xs={3} style={{background: "inherit"}} display="flex" direction="row" justify="flex-end">
                    <SearchIcon/>
              {/*}     <DeleteIcon/> */}
                </Grid>
            </Grid>
            <Grid container item style={{background: "inherit"}}>
                <Typography className={classes.description} color="textSecondary" variant="h5" component="h2" >
                {props.data.description}
                </Typography >
            </Grid>
            <Grid container item className={classes.inner_container_bottom}>
                <Typography className={classes.examples}>
                {props.data.examples}
                </Typography>
            </Grid>
        </Grid>
      </Box>
  );
}