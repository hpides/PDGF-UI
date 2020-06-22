import { createMuiTheme } from '@material-ui/core/styles';

export const infoBlue = "#2e38e8";
const bmGreen ="#0d5c2b";


export default createMuiTheme({
    palette: {
        common: {
            infoBlue: `${infoBlue}`,
            bmGreen: `${bmGreen}`
        },
       
       /* primary: {
        main: `${arcBlue}`
        }, 
        secondary: {
        main: `${arcOrange}`
        }, */
    }
})