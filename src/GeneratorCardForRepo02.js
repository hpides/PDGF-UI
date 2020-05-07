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
    minWidth: 275,
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
  inner_container_top: {
    background: "lightgreen",
    padding: "5px"
  },
  inner_container_middle: {
    background: "lightyellow",
    padding: "5px"
  },
  inner_container_bottom: {
    background: "lightblue",
    padding: "5px"
  },
});

export default function GeneratorCardForRepo02() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container classeName={classes.container} direction="column" xs={2} style={{background: "black", padding: "10px",}}>
            <Grid container item className={classes.inner_container_top} xs={12} direction="row" justify="space-between" style={{background: "green"}}>
                <Grid container item xs={10} style={{background: "pink"}}>
                    <Typography className={classes.title} color="textSecondary"  >
                        Generator-Title
                    </Typography >
                </Grid>
                <Grid container item className={classes.inner_container_middle} xs={2} style={{background: "violet"}} display="flex" direction="row" justify="flex-end">
                    <SearchIcon/>
                </Grid>
            </Grid>
            <Grid container item style={{background: "blue"}}>
                <Typography className={classes.date} color="textSecondary" variant="h5" component="h2" >
                    Description
                </Typography >
            </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
