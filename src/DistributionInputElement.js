import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import DistributionInputSubElement from "./DistributionInputSubElement";

const useStyles = makeStyles((theme) => ({
    input: {
    fontSize: 22,
    },
    inputSelect: {
    fontSize: 22,
    },
    outerContainer: {
    paddingLeft: "15px",
    paddingRight: "30px",
    },
    innerContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignContent: "center",
    backgroundColor: "yellow",
    }, 
    }));


export default function DistributionInputElement(props){
    const classes = useStyles();
    const leftColumnWidth = 5;
    const rightColumnWidth = 12 - leftColumnWidth; 
    const fontSizeLeftColumn = "h5"

return (
    <>
        <Grid container className={classes.outerContainer}>      

            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography  variant={fontSizeLeftColumn}>
                        Distribution
                    </Typography>
                </Grid>
            </Grid>

            <Grid item xs={rightColumnWidth}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    className={classes.select}
                    fullWidth
                    value={props.generatorObject.distributionVariables.type}
                    onChange={(event) => props.distributionTypeChangedHandler(event)}
                >
                    <MenuItem value="uniformDistribution">Uniform Distribution</MenuItem>
                    <MenuItem value="normalDistribution">Normal Distribution</MenuItem>
                    <MenuItem value="binomialDistribution">Binomial Distribution</MenuItem>
                    <MenuItem value="exponentialDistribution">Exponential Distribution</MenuItem>
                    <MenuItem value="logarithmicDistribution">Logarithmic Distribution</MenuItem>
                </Select>
            </Grid>
        
            
            
            <DistributionInputSubElement 
                expDLambdaValueChangedHandler={props.expDLambdaValueChangedHandler}
                logDPValueChangedHandler={props.logDPValueChangedHandler}
                normalDStdDevValueChangedHandler={props.normalDStdDevValueChangedHandler}
                normalDMeanValueChangedHandler={props.normalDMeanValueChangedHandler}
                binomialDPValueChangedHandler={props.binomialDPValueChangedHandler}
                binomialDNValueChangedHandler={props.binomialDNValueChangedHandler}
                generatorObject={props.generatorObject}/>  
        

        </Grid>    
    </>
                
    )

    }