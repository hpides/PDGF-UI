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
    //paddingLeft: "15px",
    //paddingRight: "30px",
    },
    innerContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignContent: "center",
    marginRight: 20,
    backgroundColor: "white",
    }, 
    }));


export default function DistributionInputElement(props){
    const classes = useStyles();
    const leftColumnWidth = 3;
    const rightColumnWidth = 8; 
    const fontSizeLeftColumn = "h5"

return (
    <>
        <Grid container className={classes.outerContainer}>      

            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                    <Typography  variant={fontSizeLeftColumn}>
                        Distribution*:
                    </Typography>
                </Grid>
            </Grid>

            <Grid item xs={rightColumnWidth}>
                <select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    className={classes.select}
                    style={{fontSize: "20px", 
                            width: "100%", 
                            height: "36px", 
                            outlineColor: "darkblue", 
                            borderStyle: "solid",
                            borderWidth: "1px",
                            borderColor: "black",
                            background: "white",
                            paddingLeft: "10px", 
                            borderRadius: "4px",
                            boxSizing: "border-box",
                            margin: "2px"}}

                    fullWidth
                    value={props.generatorObject.distributionVariables.type}
                    onChange={(event) => props.distributionTypeChangedHandler(event)}
                >
                    <option value="uniformDistribution">Uniform Distribution</option>
                    <option value="normalDistribution">Normal Distribution</option>
                    <option value="binomialDistribution">Binomial Distribution</option>
                    <option value="exponentialDistribution">Exponential Distribution</option>
                    <option value="logarithmicDistribution">Logarithmic Distribution</option>
                </select>
            </Grid>
        
            <Grid className={classes.innerContainer} container item xs={leftColumnWidth} >
                <Grid item >
                   <div/>
                </Grid>
            </Grid>
            


            <Grid item xs={rightColumnWidth}>
                <DistributionInputSubElement 
                    expDLambdaValueChangedHandler={props.expDLambdaValueChangedHandler}
                    logDPValueChangedHandler={props.logDPValueChangedHandler}
                    normalDStdDevValueChangedHandler={props.normalDStdDevValueChangedHandler}
                    normalDMeanValueChangedHandler={props.normalDMeanValueChangedHandler}
                    binomialDPValueChangedHandler={props.binomialDPValueChangedHandler}
                    binomialDNValueChangedHandler={props.binomialDNValueChangedHandler}
                    generatorObject={props.generatorObject}/>  
            </Grid>

        </Grid>    
    </>
                
    )

    }