import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import DeleteIcon from "@material-ui/icons/Delete";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
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
    lineHeight: 1.1,
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
  icon : {
    width: 20,
    height: 20,
  },
  iconButton: {
    width: 25,
    height: 25
  },
});

export default function GeneratorSelectionCard(props) {
const classes = useStyles();
  
const deleteGeneratorFromRepo = (uid) => {
  
  const newGeneratorRepository = JSON.parse(localStorage.getItem("generatorRepository"));
  let index = newGeneratorRepository.findIndex(x => x.uid === uid);
  newGeneratorRepository.splice(index, 1);
  localStorage.setItem("generatorRepository", JSON.stringify(newGeneratorRepository));
}


  return (
      <Paper className={classes.root} onClick={()=>{props.selectGeneratorHandler(props.generatorInRepo.uid); props.handleCloseGeneratorSelectionDialog()}}>
        <Grid container classeName={classes.container} direction="column" xs={12} style={{background: "inherit", padding: "4px",}}>
            <Grid container  className={classes.inner_container_top} xs={12} direction="row" justify="space-between" style={{background: "inherit"}}>
                <Grid  item xs={9} style={{background: "inherit", flexGrow: 1,}}>
                    <Typography className={classes.name} color="textSecondary">
                        {props.generatorInRepo.repoVariables.name}
                    </Typography >
                </Grid>
                <Grid item className={classes.inner_container_middle}  style={{background: "inherit"}}>
                    <IconButton className={classes.iconButton} onClick={(event) => {event.stopPropagation(); deleteGeneratorFromRepo(props.generatorInRepo.uid); props.triggerReload()}}>
                        <DeleteIcon className={classes.icon}/>
                    </IconButton>   
                </Grid>
            </Grid>
            <Grid item style={{background: "inherit"}}>
                <Typography className={classes.description} color="textSecondary" variant="h5" component="h2" >
                {props.generatorInRepo.repoVariables.description}
                </Typography >
            </Grid>
            <Grid item className={classes.inner_container_bottom}>
                <Typography className={classes.examples}>
                {props.generatorInRepo.repoVariables.examples}
                </Typography>
            </Grid>
        </Grid>
      </Paper>
  );
}
