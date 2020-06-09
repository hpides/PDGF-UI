import React, {useState} from 'react'
import Screen from "./Screen";
import NumberButton from "./NumberButton";

export default function InputComponent(props) {
    const [content, setContent] = useState("");


{/* // our method to handle all click events from our buttons
    handleClick(event){
      const value = event.target.value; // get the value from the target element (button)
      switch (value) {
        case '=': { // if it's an equal sign, use the eval module to evaluate the question
          // convert the answer (in number) to String
          const answer = eval(this.state.question).toString();
          // update answer in our state.
          this.setState({ answer });
          break;
        }
        case 'Cls': {
          // if it's the Cls sign, just clean our question and answer in the state
          this.setState({ question: '', answer: '' });
          break;
        }
        default: {
          // for every other commmand, update the answer in the state
          this.setState({ question: this.state.question += value})
          break;
        }
      }
    }
*/}
    return (
        <div className="title">
            Click-Configure your If-Statement:
        </div>
        <Screen content={content}/>
        <Grid container>
            <Grid className="numberPane" xs={4}>
                <Button label={'1'} handleClick={handleClick} type='input' />
                <Button label={'2'} handleClick={handleClick} type='input' />
                <Button label={'3'} handleClick={handleClick} type='input' />
                <Button label={'4'} handleClick={handleClick} type='input' />
                <Button label={'5'} handleClick={handleClick} type='input' />
                <Button label={'6'} handleClick={handleClick} type='input' />
                <Button label={'7'} handleClick={handleClick} type='input' />
                <Button label={'8'} handleClick={handleClick} type='input' />
                <Button label={'9'} handleClick={handleClick} type='input' />
                <Button label={'0'} handleClick={handleClick} type='input' />
                <Button label={'.'} handleClick={handleClick} type='input' />
            </Grid>
            <Grid className="operationPane" xs={4}>
                <Button label={"+"} handleClick={handleClick} type='operation' />
                <Button label={"-"} handleClick={handleClick} type='operation' />
                <Button label={"x"} handleClick={handleClick} type='operation' />
                <Button label={"/"} handleClick={handleClick} type='operation' />
                <Button label={&exp} handleClick={handleClick} type='operation' />
                <Button label={&radic} handleClick={handleClick} type='operation' />
                <Button label={"log"} handleClick={handleClick} type='operation' />
                <Button label={"mod"} handleClick={handleClick} type='operation' />
                <Button label={"="} handleClick={handleClick} type='operation' />
                <Button label={"!="} handleClick={handleClick} type='operation' />
                <Button label={"<"} handleClick={handleClick} type='operation' />
                <Button label={">"} handleClick={handleClick} type='operation' />
                <Button label={} handleClick={handleClick} type='operation' />
            </Grid>
            <Grid className="generatorPane" xs={4}>
                {props.generators.map(generator=>{return (<Button label={generator.name} handleClick={handleClick} type="generator"/>)})}
            </Grid>



        </Grid>
    )
}
