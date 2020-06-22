import React, {useState} from 'react';
import {ThemeProvider} from "@material-ui/styles";
import EditorPage from "./pages/EditorPage";
import theme from './ui/Theme';


export const TooltipContext = React.createContext();

function App() {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const tooltipVisibleHandler = (value) => {
    setTooltipVisible(value);
  }

  return (
    
    <ThemeProvider theme={theme}>
        <TooltipContext.Provider value={tooltipVisible}>
            <EditorPage tooltipVisibleHandler={tooltipVisibleHandler} />
        </TooltipContext.Provider>
    </ThemeProvider>
  );
}

export default App;
