import React from 'react';
import { AccountCircle, Description } from '@mui/icons-material';
import { Typography } from '@mui/material';

const Dash = () => {
  return (
    <div className="container">
      <style>
        {`
          .container {
            display: flex;
            margin-left: 15px;
          }
          
           .square1 {
            width: 200px;
            height: 130px;
            background-color: #C2DEDC;
            display: flex;
            flex-direction: column;
            padding: 25px;
            margin-right: 30px;
            border-radius: 7px;
            padding-bottom: 40px;
          }
          
          .square2 {
            width: 200px;
            height: 130px;
            background-color: #CDC2AE;
            display: flex;
            flex-direction: column;
            padding: 25px;
            border-radius: 7px;
            padding-bottom: 40px;
          }
          
          .icon {
            font-size: 48px;
            margin-bottom: 10px;
          }
          
          .word {
            font-size: 20px;
            font-weight: bold;
          }

           .number {
            font-size: 40px;
            font-weight: bold;
            padding: 15px;
          }
        `}
      </style>
      <div className="square1">
        <AccountCircle className="icon" />
        <Typography className="word">Users</Typography>
        <div className="number">5</div>
      </div>
      <div className="square2">
        <Description className="icon" />
        <Typography className="word">Reports</Typography>
        <div className="number">10</div>
      </div>
    </div>
  );
};

export default Dash;
