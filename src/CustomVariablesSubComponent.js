import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme) => ({
   container: {
      background: "lightgrey",display: "flex",
      flexDirection: "column",
      width: " 220px",
      padding: "5px",
      margin: "10px",
  },
  textField: {
      width: "240px",
      height: "40px",
      margin: "0px",
  },
  input: {
    height: "40px",
  },
  inputName: {
    fontSize: 18,
  },
  inputRoot: {
    fontSize: 20,
    height: "40px",

  },
  labelRoot: {
    fontSize: 20,
  },
  labelFocused: {
  },
}));

export default function CustomVariablesSubComponent(props) {
  const classes = useStyles();

  return (
      <>
 <div>

<Grid container display="flex" flexDirection="column" justify="flex-start" style={{marginBottom: "20px"}}>
        <Grid container display="flex" justify="flex-start" style={{alignItems: "center"}} item xs={12}>
            <Grid item > 
                <input 
                                style={{fontSize: "24px", 
                                        width: "200px", 
                                        height: "38px", 
                                        outlineColor: "darkblue", 
                                        border: "none", 
                                        background: "white",
                                        boxShadow: "inset 2px 2px 3px rgba(0,0,0,0.2)", 
                                        paddingLeft: "10px",
                                        borderRadius: "4px",
                                        margin: "2px"}}
                                placeholder = "Enter Name"
                                value={props.customVariable.name}
                                onChange={(event)=> {props.customSystemVariableNameChangedHandler(event, props.customVariable.variableId)}}
                            /> 
            </Grid>
                      
            <Grid item>
                <div style={{display: "flex", width: "30px", paddingLeft: "30px"}}>  
                    <IconButton aria-label="delete table" onClick={() => {props.deleteCustomSystemVariableHandler(props.customVariable.variableId)}}> 
                      <DeleteIcon style={{width: "36px", height: "36px"}}/>
                    </IconButton> 
                </div>
            </Grid>

        </Grid>

        <Grid container display="flex" flexDirection="row" justify="space-between" item xs={12}>
               
              <Grid item xs={4}>
                  <Typography variant="h6">
                       Value:
                  </Typography>
              </Grid>
               
              <Grid item xs={8}>
                  <input 
                          style={{fontSize: "16px", 
                                  width: "140px", 
                                  height: "22px", 
                                  outlineColor: "darkblue", 
                                  border: "none", 
                                  background: "white",
                                  boxShadow: "inset 2px 2px 3px rgba(0,0,0,0.2)", 
                                  paddingLeft: "10px",
                                  borderRadius: "4px",
                                  margin: "2px"}}
                          placeholder = "Enter Variable Value"
                          value={props.customVariable.value}
                          onChange={(event)=> {props.customSystemVariableValueChangedHandler(event, props.customVariable.variableId)}}
                      /> 
              </Grid>    
        </Grid>

        <Grid container display="flex" flexDirection="row" justify="space-between" item xs={12}>
               
               <Grid item xs={4}>
                   <Typography variant="h6">
                       Type:
                   </Typography>
              </Grid>
               
              <Grid item xs={8}>
                  <input 
                          style={{fontSize: "16px", 
                                  width: "140px", 
                                  height: "22px", 
                                  outlineColor: "darkblue", 
                                  border: "none", 
                                  background: "white",
                                  boxShadow: "inset 2px 2px 3px rgba(0,0,0,0.2)", 
                                  paddingLeft: "10px",
                                  borderRadius: "4px",
                                  margin: "2px"}}
                          placeholder = "Enter Variable Type"
                          value={props.customVariable.type}
                          onChange={(event)=> {props.customSystomVariableTypeChangedHandler(event, props.customVariable.variableId)}}
                      /> 
              </Grid>    
        </Grid>
</Grid>

</div>



</>
  );
}














      {/*}
      <div className={classes.container}>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center",}}>
      <div style={{width: "200px", padding: "0", margin: "0"}}>
        <TextField 
        className={classes.textFieldName} 
        id="name" 
        //defaultValue = "Variabe Name"
        value={props.input.name}  
        onChange = {(event) => {props.customSystemVariableNameChangedHandler(event, props.input.variableId)}}
        //variant="filled" 
        InputProps={{ 
          className: classes.inputName
        }}/>
      </div>
      <div style={{display: "flex", width: "30px", }}>  
      <IconButton aria-label="delete table" onClick={() => {props.deleteCustomSystemVariableHandler(props.input.variableId)}}> 
        <CloseIcon />
      </IconButton> 
      </div>
      </div>  
      <TextField 
        className={classes.textField} 
        id="value" 
        //defaultValue = "Variable Value" 
        value = {props.input.value}
        onChange = {(event) => {props.customSystemVariableValueChangedHandler(event, props.input.variableId)}}
        //variant="filled" 
        InputProps={{ 
          className: classes.input
        }}/>
      <TextField 
        className={classes.textField} 
        id="type" 
        //defaultValue = "Variable Type" 
        value = {props.input.type}
        onChange = {(event) => {props.customSystemVariableTypeChangedHandler(event, props.input.variableId)}}
        //variant="filled" 
        InputProps={{ 
          className: classes.input
        }}/>
      </div>
      </>
  );
}


*/}