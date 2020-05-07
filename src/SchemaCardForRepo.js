import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: 3,
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
    background: "lightgreen",
    padding: "5px"
  },
  inner_container_right: {
    background: "lightblue",
    padding: "5px"
  },
});

export default function SchemaCardForRepo(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container classeName={classes.container} xs={12}>
          <Grid container item className={classes.inner_container_left} xs={3} flexDirection="row" justify="flex-start">
            <Grid container item>
            <Typography className={classes.title} color="textSecondary" gutterBottom >
              {props.input.name}
            </Typography >
            </Grid>
            <Grid container item>
            <Typography className={classes.author} color="textSecondary" variant="h5" component="h2" >
            {props.input.author}
            </Typography >
            </Grid>
            <Grid container item>
            <Typography className={classes.date} color="textSecondary" variant="h5" component="h2" >
            {props.input.date}
            </Typography >
            </Grid>
          </Grid>
          <Grid container item className={classes.inner_container_right}  variant="body2" component="p" xs={9}>
            <Typography>
            {props.input.description}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      {/*<CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
      */}
    </Card>
  );
}

