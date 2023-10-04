import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { click } from '@testing-library/user-event/dist/click';

type def={
    quizname:string,
    click?:any,
    // quizobj:any
}
export default function Smcard(props:def) {
  return (
    <Card style={{boxShadow:"2px 2px 3px darkmagenta"}}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <h4 className='text-bold py-2 px-3'>Web Development Quizzes</h4>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <h6 className='text-bold py-2 px-3'>{props.quizname}</h6>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" className='mb-4 mx-3' variant='outlined' onClick={props.click}>
          Start quiz
        </Button>
         {/* <button onClick={() => click(props.quizobj)}>Start Quiz</button> */}
      </CardActions>
    </Card>
  );
}