import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';



const CustomTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: 'rgba(56, 95, 224, 0.9)',
      color: 'white',
      boxShadow: theme.shadows[1],
      fontSize: 17,
    },
  }))(Tooltip);


export default CustomTooltip;