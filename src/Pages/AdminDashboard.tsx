import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useParams } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import MYInput from '../components/SMinput';
import { useState } from "react"
import AddIcon from '@mui/icons-material/Add';
import { addquiz, getquiz } from '../config/firebasemethod';
import { useEffect } from 'react'
import { Console, log } from 'console';
import { signOut } from 'firebase/auth';
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


export default function AdminDashboard() {
  document.body.style.backgroundColor = "white"
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const param = useParams()
  const [allquiz, setallquiz] = useState<any>([])
  const [islock, setlock] = useState(false)
  const [quiz, setquiz] = useState<any>({})
  const [allquestion, setallquestion] = useState<any>([])
  const [myquestion, setmyquestion] = useState('')
  const [correctoption, setcorrectoption] = useState<any>()
  const [options, setoptions] = useState<any>([])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const fillmodel = (key: string, value: any) => {
    const updatedQuiz = { ...quiz, [key]: value };
    setquiz(updatedQuiz);
  };

  const lockquiz = () => {
    setlock(!islock)
    console.log(quiz)
  }

  const addquestions = () => {
    let newquestion = {
      questiontext: myquestion,
      c_opt: correctoption,
      myoptions: [...options]
    };
    allquestion.push(newquestion)
    setmyquestion('')
    setcorrectoption('')
    setoptions([])
  }

  let addOption = () => {
    if (options.length < 4) {
      setoptions([...options, ''])
    }
  }

  const savequiz = () => {
    // Create a new quiz object with the questions and update the quiz state
    const newQuiz = { ...quiz, ques: allquestion };
    setquiz(newQuiz);
    allquiz.push(newQuiz)
    console.log(allquiz);
    
    addquiz(allquiz)
    setallquestion([])
    setlock(false); // Unlock the quiz
  };

  const fbget = () => {
    getquiz().then((res) => {
      setallquiz(res); // Update the allquiz state with the data from Firebase
    }).catch((error) => {
      console.error("Error fetching quiz data:", error);
    });
  }
  // const logout=()=>{
  //   signOut()
  // }
  useEffect(() => {
    // Call fbget when the component mounts or when allquiz changes
    fbget();
  }, []);


  const handleOptionChange = (value: any, index: any) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setoptions(newOptions);
  };



  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ backgroundColor: "#D9D9D9", color: "black" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" className='text-dark'>
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: "#7C7C7C",
            display: "flex",
            justifyContent: "space-between !important"
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader >
          <PersonIcon className='text-white' />
          <h5 className='text-white fs-4 my-3 me-4 ms-2'>{param.id}</h5>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>

        </DrawerHeader>
        <Divider />
        {allquiz.length > 0 ? (
          allquiz.map((obj: any, index: any) => {
            return (
              <div key={index}>
                <button className='btn ms-2 ' style={{ backgroundColor: "#D9D9D9", width: "150px" }}>{obj.quizname}</button>
              </div>
            )
          })
        ) : (
          <p>Loader</p>
        )}
          <button className='btn btn-danger ms-3' style={{width:"100px"}}>Logout</button>
        <Divider />
      </Drawer>
      <Main open={open} >
        <DrawerHeader />
        {/* <button onClick={get}>get quiz</button> */}
        <div>
          <div className='d-flex justify-content-between mt-3 mb-5'>
            <Box> <h2>Quiz App Admin</h2></Box>
            <Box className='d-flex'>
              <Box><button className='btn px-4 py-2 btn-primary rounded-2 me-2' onClick={savequiz}>Save quiz</button></Box>   
            </Box>
          </div>

          <div className="inputfield mb-5">
            <div className="row">
              <div className="col-md-4 col-sm-6 mb-3">
                <MYInput label='quiz name' placeholder='Quiz name' classname="quizname" disabled={islock} change={(e: any) => fillmodel("quizname", e.target.value)} />
              </div>
              <div className="col-md-4 col-sm-6 mb-3">
                <MYInput label='quiz min' placeholder='Quiz time' classname="quizmin" disabled={islock} change={(e: any) => fillmodel("quizmin", e.target.value)} />
              </div>
              <div className="col-md-4 col-sm-6 mb-3">
                <MYInput label='secret key' placeholder='secret key' classname="secretkey" disabled={islock} change={(e: any) => fillmodel("quizkey", e.target.value)} />
              </div>
              <div className="col-md-8 col-sm-6 mb-3 ">
                <MYInput label='description' placeholder='Description' classname="description" disabled={islock} change={(e: any) => fillmodel("quizdescription", e.target.value)} />
              </div>
              <div className="col-md-8 col-sm-6 mb-3 ">
                <button className='btn btn-primary' onClick={lockquiz}>{islock ? 'lock' : 'unlock'}</button>
              </div>
            </div>
          </div>

          <div className="questionbank mb-4">
            <div className="container">
              <div className="row">
                <div className="col-md-8">
                  <div className="question">
                    <h5 className='mb-4'>Your Question</h5>
                    <input type="text" placeholder='Enter Question' className='rounded-2 w-100 mb-2 myquestion' value={myquestion} onChange={(e: any) => setmyquestion(e.target.value)} />
                  </div>

                  <div className="correct-option">
                    <input type="text" placeholder="Correct option" className="rounded-2 w-100 mb-2 myoption" value={correctoption} onChange={(e: any) => setcorrectoption(e.target.value)} />
                  </div>
                  <div className="question">
                    <h3 className='mb-3'>Options</h3>
                    {options.map((option: any, index: any) => (
                      <input
                        type="text"
                        placeholder="Enter option"
                        className="rounded-2 w-100 mb-2 myoption"
                        value={option}
                        onChange={(e) => handleOptionChange(e.target.value, index)}
                        key={index}
                      />
                    ))}
                    {options.length < 4 && (
                      <div className="addicon bg-primary d-flex align-items-center text-white ms-4" onClick={addOption}>
                        <AddIcon className='fs-2' />
                      </div>
                    )}
                    <div className="addquestion">
                      <button className='btn btn-primary my-3 p-2' onClick={addquestions}>Add question</button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </Main>
    </Box>
  );
}