import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";





export default function DistributionInputSubElement(props){

    const [values, setValues] = useState({exp: {lambda: ""},log: {p: ""}, normal: {stdDev: "", mean: ""}, bin: {p: "", n:""}  });


    const expDLambdaValueChangedHandler = (event) => {
        const valuesNew = {...values};
        valuesNew.exp.lambda = event.target.value;
        setValues(valuesNew);
        props.distributionValuesChangedHandler(values);
    }

    const logDPValueChangedHandler = (event) => {
        const valuesNew = {...values};
        valuesNew.log.p = event.target.value;
        setValues(valuesNew);
        props.distributionValuesChangedHandler(values);
    }

    const normalDStdDevValueChangedHandler = (event) => {
        const valuesNew = {...values};
        valuesNew.normal.stdDev = event.target.value;
        setValues(valuesNew);
        props.distributionValuesChangedHandler(values);
    }

    const normalDMeanValueChangedHandler = (event) => {
        const valuesNew = {...values};
        valuesNew.normal.mean = event.target.value;
        setValues(valuesNew);
        props.distributionValuesChangedHandler(values);
    }

    const binomialDPValueChangedHandler = (event) => {
        const valuesNew = {...values};
        valuesNew.binomial.p = event.target.value;
        setValues(valuesNew);
        props.distributionValuesChangedHandler(values);
    }

    const binomialDNValueChangedHandler = (event) => {
        const valuesNew = {...values};
        valuesNew.binomial.n = event.target.value;
        setValues(valuesNew);
        props.distributionValuesChangedHandler(values);
    }
    
    
        switch (props.distribution) {

         

            case 'exponentialDistribution':
                return (
                        <>
                        <Grid item xs={3}>
                            <Typography>lambda Value:</Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Input 
                                placeholder="Enter lambda Value"
                                value={values.exp.lambda}
                                onChange={(event)=>{expDLambdaValueChangedHandler(event)}}/>
                        </Grid>
    
                        </>);
           
         
         
          case 'logarithmicDistribution':
            return (
                    <>
                    <Grid item xs={3}>
                        <Typography>p Value:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Input 
                        placeholder="Enter p Value"
                        value={values.log.p}
                        onChange={(event)=>{logDPValueChangedHandler(event)}}/>
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
                            value={values.normal.stdDev}
                            onChange={(event)=>{normalDStdDevValueChangedHandler(event)}}/>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>Mean</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Input 
                            placeholder="Enter Mean Value"
                            value={values.normal.mean}
                            onChange={(event)=>{normalDMeanValueChangedHandler(event)}}/>
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
                            placeholder="Enter p Value"
                            value={values.bin.p}
                            onChange={(event)=>{binomialDPValueChangedHandler(event)}}/>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>n Value:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Input 
                            placeholder="Enter n Value"
                            value={values.exp.lambda}
                            onChange={(event)=>{binomialDPValueChangedHandler(event)}}/>
                    </Grid>
                    </>);

          default:
            return null;
        }}      
