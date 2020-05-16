import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import DistributionInputSubElement from "./DistributionInputSubElement";



export default function DistributionInputElement(props){

    const [distributionType, setDistributionType] = useState('normalDistribution');
    const [distributionValues, setDistributionValues] = useState("");

    const distributionTypeChangedHandler = (event) => {
      setDistributionType(event.target.value);    
    }

    const distributionValuesChangedHandler = (distributionObject) => {
        setDistributionValues(distributionObject)
    }

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
                        value={distributionType}
                        onChange={(event) => distributionTypeChangedHandler(event)}
                    >
                        <MenuItem value="equalDistribution">Equal Distribution</MenuItem>
                        <MenuItem value="normalDistribution">Normal Distribution</MenuItem>
                        <MenuItem value="binomialDistribution">Binomial DistributionThirty</MenuItem>
                        <MenuItem value="zDistribution">Z-DistributionThirty</MenuItem>
                    </Select>
                </Grid>
            </Grid>
        
        <Grid container item xs={12}>

        <DistributionInputSubElement 
            distributionType = {distributionType} 
            distributionValuesChangedHandler={distributionValuesChangedHandler}/>    
            
        </Grid>    
    </>
                
    )

    }