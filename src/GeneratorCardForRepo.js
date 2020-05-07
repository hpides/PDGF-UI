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

const useStyles = makeStyles({
  root: {
    width: 275,
    height: 175,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  name: {
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
    background: "white",
    
  },
  inner_container_top: {
    background: "white",
    padding: "5px"
  },
  inner_container_middle: {
    background: "white",
    padding: "5px"
  },
  inner_container_bottom: {
    background: "white",
    padding: "5px"
  },
});

export default function GeneratorCardForRepo(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container classeName={classes.container} direction="column" xs={12} style={{background: "lightgrey", padding: "4px",}}>
            <Grid container item className={classes.inner_container_top} xs={12} direction="row" justify="space-between" style={{background: "white"}}>
                <Grid container item xs={9} style={{background: "white"}}>
                    <Typography className={classes.name} color="textSecondary"  >
                        {props.data.name}
                    </Typography >
                </Grid>
                <Grid container item className={classes.inner_container_middle} xs={3} style={{background: "white"}} display="flex" direction="row" justify="flex-end">
                    <SearchIcon/>
              {/*}     <DeleteIcon/> */}
                </Grid>
            </Grid>
            <Grid container item style={{background: "white"}}>
                <Typography className={classes.date} color="textSecondary" variant="h5" component="h2" >
                {props.data.description}
                </Typography >
            </Grid>
            <Grid container item className={classes.inner_container_bottom}>
                <Typography>
                {props.data.examples}
                </Typography>
            </Grid>
        </Grid>
      </CardContent>
      {/*<CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
