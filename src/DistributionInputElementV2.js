import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import DistributionInputSubElementV2 from "./DistributionInputSubElementV2";



export default function DistributionInputElementV2(props){


return (
    <>
            <Grid container item xs={12}>
                <Grid item xs={3}>
                    <Typography>
                        Distribution
                    </Typography>
                </Grid>
                <Grid item xs={9}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={props.generatorObject.distributionVariables.type}
                        onChange={(event) => props.distributionTypeChangedHandler(event)}
                    >
                        <MenuItem value="equalDistribution">Equal Distribution</MenuItem>
                        <MenuItem value="normalDistribution">Normal Distribution</MenuItem>
                        <MenuItem value="binomialDistribution">Binomial Distribution</MenuItem>
                        <MenuItem value="exponentialDistribution">Exponential Distribution</MenuItem>
                        <MenuItem value="logarithmicDistribution">Logarithmic Distribution</MenuItem>
                    </Select>
                </Grid>
            </Grid>
        
        <Grid container item xs={12}>

        <DistributionInputSubElementV2 
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