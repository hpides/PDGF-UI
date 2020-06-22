import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    input: {
    fontSize: 22,
  },
  inputSelect: {
    fontSize: 22,
  },
  outerContainer: {
    //paddingLeft: "15px",
    //paddingRight: "30px",
    display: "flex",
    flexDirection: "row",
  },
  innerContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignContent: "center",
    marginRight: 20,
    backgroundColor: "white",
  }, 
});

export default function DistributionInputSubElement(props){
    const classes = useStyles();
    const leftColumnWidth = 3;
    const rightColumnWidth = 8; 
    const fontSizeLeftColumn = "h5"

        switch (props.generatorObject.distributionVariables.type) {

         

            case 'exponentialDistribution':
                return (
                    <>
                        <Grid container className={classes.outerContainer}>  
                            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                                <Grid item >
                                    <Typography>
                                        lambda Value:
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid item xs={rightColumnWidth}>
                                <Input
                                    placeholder="Enter lambda Value"
                                    fullWidth
                                    value={props.generatorObject.distributionVariables.exponentialDistribution.lambda}
                                    onChange={(event)=>{props.expDLambdaValueChangedHandler(event)}}/>
                            </Grid>
                        </Grid>
                    </>);
           
       
         
          case 'logarithmicDistribution':
                return (
                    <>
                        <Grid container className={classes.outerContainer}>
                            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                                <Grid item >
                                    <Typography>
                                        p-Value:
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid item xs={rightColumnWidth}>
                                <Input 
                                placeholder="Enter p-Value"
                                fullWidth
                                value={props.generatorObject.distributionVariables.logarithmicDistribution.p}
                                onChange={(event)=>{props.logDPValueChangedHandler(event)}}/>
                            </Grid>
                        </Grid>
                    </>);

          case 'normalDistribution':
                return (
                    <>
                        <Grid container className={classes.outerContainer}>
                            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                                <Grid item >
                                    <Typography>
                                        Std. Deviation:
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid item xs={rightColumnWidth}>
                                <Input
                                    placeholder="Enter Standard Deviation"
                                    fullWidth
                                    value={props.generatorObject.distributionVariables.normalDistribution.standardDeviation}
                                    onChange={(event)=>{props.normalDStdDevValueChangedHandler(event)}}/>
                            </Grid>

                            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                                <Grid item >
                                    <Typography>
                                        Mean:
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid item xs={rightColumnWidth}>
                                <Input
                                    placeholder="Enter Mean Value"
                                    fullWidth
                                    value={props.generatorObject.distributionVariables.normalDistribution.mean}
                                    onChange={(event)=>{props.normalDMeanValueChangedHandler(event)}}/>
                            </Grid>
                        </Grid>
                    </>);

          case 'binomialDistribution':
                return (
                    <>
                        <Grid container className={classes.outerContainer}>
                            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                                <Grid item >
                                    <Typography>
                                        p-Value:
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid item xs={rightColumnWidth}>
                                <Input 
                                    placeholder="Enter p-Value"
                                    fullWidth
                                    value={props.generatorObject.distributionVariables.binomialDistribution.p}
                                    onChange={(event)=>{props.binomialDPValueChangedHandler(event)}}/>
                            </Grid>

                            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                                <Grid item >
                                    <Typography>
                                        n-Value:
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid item xs={rightColumnWidth}>
                                <Input
                                    placeholder="Enter n-Value"
                                    fullWidth
                                    value={props.generatorObject.distributionVariables.binomialDistribution.n}
                                    onChange={(event)=>{props.binomialDNValueChangedHandler(event)}}/>
                            </Grid>
                        </Grid>
                </>);

          default:
            return null;
        }}      
