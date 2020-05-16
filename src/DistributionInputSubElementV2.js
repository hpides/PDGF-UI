import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";





export default function DistributionInputSubElementV2(props){

    
        switch (props.generatorObject.distributionVariables.type) {

         

            case 'exponentialDistribution':
                return (
                        <>
                        <Grid item xs={3}>
                            <Typography>lambda Value:</Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Input 
                                placeholder="Enter lambda Value"
                                value={props.generatorObject.distributionVariables.exponentialDistribution.lambda}
                                onChange={(event)=>{props.expDLambdaValueChangedHandler(event)}}/>
                        </Grid>
    
                        </>);
           
         
         
          case 'logarithmicDistribution':
            return (
                    <>
                    <Grid item xs={3}>
                        <Typography>p-Value:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Input 
                        placeholder="Enter p-Value"
                        value={props.generatorObject.distributionVariables.logarithmicDistribution.p}
                        onChange={(event)=>{props.logDPValueChangedHandler(event)}}/>
                    </Grid>

                    </>);

          case 'normalDistribution':
            return (<>
                    <Grid item xs={3}>
                        <Typography>Standard Deviation:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Input 
                            placeholder="Enter Standard Deviation"
                            value={props.generatorObject.distributionVariables.normalDistribution.standardDeviation}
                            onChange={(event)=>{props.normalDStdDevValueChangedHandler(event)}}/>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>Mean</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Input 
                            placeholder="Enter Mean Value"
                            value={props.generatorObject.distributionVariables.normalDistribution.mean}
                            onChange={(event)=>{props.normalDMeanValueChangedHandler(event)}}/>
                    </Grid>
                    </>);

          case 'binomialDistribution':
            return (
                    <>
                    <Grid item xs={3}>
                        <Typography>p Value:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Input 
                            placeholder="Enter p-Value"
                            value={props.generatorObject.distributionVariables.binomialDistribution.p}
                            onChange={(event)=>{props.binomialDPValueChangedHandler(event)}}/>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>n Value:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Input 
                            placeholder="Enter n-Value"
                            value={props.generatorObject.distributionVariables.binomialDistribution.p}
                            onChange={(event)=>{props.binomialDPValueChangedHandler(event)}}/>
                    </Grid>
                    </>);

          default:
            return null;
        }}      
