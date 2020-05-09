import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";





export default function ConditionalDistributionInputElement(props){
    
        switch (props.distribution) {

          case 'zDistribution':
            return (
                    <>
                    <Grid item xs={3}>
                        <Typography>Value 1</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Input placeholder="Enter Value"/>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>Value 2</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Input placeholder="Enter Value"/>
                    </Grid>
                    </>);

          case 'normalDistribution':
            return (<>
                    <Grid item xs={3}>
                        <Typography>Value A</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Input placeholder="Enter Value A"/>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>Value B</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Input placeholder="Enter Value B"/>
                    </Grid>
                    </>);

          case 'binomialDistribution':
            return (
                    <>
                    <Grid item xs={3}>
                        <Typography>Value X</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Input placeholder="Enter Value X"/>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>Value Y</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Input placeholder="Enter Value Y"/>
                    </Grid>
                    </>);

          default:
            return null;
        }}      
