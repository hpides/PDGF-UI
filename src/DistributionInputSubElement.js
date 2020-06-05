import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";

const leftSideColumnWidth = 4;
const rightSideColumnWidth = 12- leftSideColumnWidth;



export default function DistributionInputSubElement(props){

    
        switch (props.generatorObject.distributionVariables.type) {

         

            case 'exponentialDistribution':
                return (
                        <>
                        <Grid item xs={leftSideColumnWidth}>
                            <Typography>lambda Value:</Typography>
                        </Grid>
                        <Grid item xs={rightSideColumnWidth}>
                            <Input
                                placeholder="Enter lambda Value"
                                fullWidth
                                value={props.generatorObject.distributionVariables.exponentialDistribution.lambda}
                                onChange={(event)=>{props.expDLambdaValueChangedHandler(event)}}/>
                        </Grid>
    
                        </>);
           
         
         
          case 'logarithmicDistribution':
            return (
                    <>
                    <Grid item xs={leftSideColumnWidth}>
                        <Typography>p-Value:</Typography>
                    </Grid>
                    <Grid item xs={rightSideColumnWidth}>
                        <Input 
                        placeholder="Enter p-Value"
                        fullWidth
                        value={props.generatorObject.distributionVariables.logarithmicDistribution.p}
                        onChange={(event)=>{props.logDPValueChangedHandler(event)}}/>
                    </Grid>

                    </>);

          case 'normalDistribution':
            return (<>
                    <Grid item xs={leftSideColumnWidth}>
                        <Typography>Standard Deviation:</Typography>
                    </Grid>
                    <Grid item xs={rightSideColumnWidth}>
                        <Input
                            placeholder="Enter Standard Deviation"
                            fullWidth
                            value={props.generatorObject.distributionVariables.normalDistribution.standardDeviation}
                            onChange={(event)=>{props.normalDStdDevValueChangedHandler(event)}}/>
                    </Grid>
                    <Grid item xs={leftSideColumnWidth}>
                        <Typography>Mean</Typography>
                    </Grid>
                    <Grid item xs={rightSideColumnWidth}>
                        <Input
                            placeholder="Enter Mean Value"
                            fullWidth
                            value={props.generatorObject.distributionVariables.normalDistribution.mean}
                            onChange={(event)=>{props.normalDMeanValueChangedHandler(event)}}/>
                    </Grid>
                    </>);

          case 'binomialDistribution':
            return (
                    <>
                    <Grid item xs={leftSideColumnWidth}>
                        <Typography>p Value:</Typography>
                    </Grid>
                    <Grid item xs={rightSideColumnWidth}>
                        <Input 
                            placeholder="Enter p-Value"
                            fullWidth
                            value={props.generatorObject.distributionVariables.binomialDistribution.p}
                            onChange={(event)=>{props.binomialDPValueChangedHandler(event)}}/>
                    </Grid>
                    <Grid item xs={leftSideColumnWidth}>
                        <Typography>n Value:</Typography>
                    </Grid>
                    <Grid item xs={rightSideColumnWidth}>
                        <Input
                            placeholder="Enter n-Value"
                            fullWidth
                            value={props.generatorObject.distributionVariables.binomialDistribution.n}
                            onChange={(event)=>{props.binomialDNValueChangedHandler(event)}}/>
                    </Grid>
                    </>);

          default:
            return null;
        }}      
