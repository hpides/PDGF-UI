import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import ConditionalDistributionInputElement from "./ConditionalDistributionInputElement";



export default function DistributionInputElement(){

    const [distribution, setDistribution] = useState('normalDistribution');

    const handleChange = (event) => {
      setDistribution(event.target.value);    
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
                        value={distribution}
                        onChange={handleChange}
                    >
                        <MenuItem value="equalDistribution">Equal Distribution</MenuItem>
                        <MenuItem value="normalDistribution">Normal Distribution</MenuItem>
                        <MenuItem value="binomialDistribution">Binomial DistributionThirty</MenuItem>
                        <MenuItem value="zDistribution">Z-DistributionThirty</MenuItem>
                    </Select>
                </Grid>
            </Grid>
        
        <Grid container item xs={12}>

        <ConditionalDistributionInputElement distribution = {distribution}/>    
            
        </Grid>    
    </>
                
    )

    }