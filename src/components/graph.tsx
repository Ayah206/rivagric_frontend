import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box, Typography } from '@mui/material';
const xLabels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
export default function Graph() {
  return (
    <Box sx = {{bgcolor: 'white', p: 2, borderRadius: '4px'}}>
        <Typography component = 'h6' sx = {{
          textTransform: 'uppercase',
          letterSpacing: 1.5,
          color: 'grey',
            
        }} >Sales chart</Typography>
        <LineChart
        xAxis={[{ scaleType: 'point', data: xLabels }]}
        series={[
            {
            data: [2, 5.5, 2, 8.5, 1.5, 5, 6, 2 , 3, 6, 7, 4],
            },
        ]}
        height={350}
        />
    </Box>
  );
}
