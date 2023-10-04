import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import Smcard from '../components/Smcards'
import { getquiz } from '../config/firebasemethod'
import Quiz from './Quiz'

export default function UserDashboard() {
  document.body.style.backgroundColor="white"
  const {username}=useParams()
  const [allquiz,setallquiz]=useState<any>([])

  const fbget = () => {
    getquiz().then((res) => {
      setallquiz(res); // Update the allquiz state with the data from Firebase
      // console.log(res)
    }).catch((error) => {
      alert(error);
    });
  }

  useEffect(() => {
    fbget();
  }, []);

const navigate=useNavigate()

const handleStartQuizClick = (quizindex:any) => {
  console.log(quizindex);
  navigate(`/Quiz/${quizindex}`);
};



  return (
    <div>
      <nav className="navbar" style={{ backgroundColor: "#7C7C7C" }}>
        <div className="container-fluid">
          <h1 className='text-white'>Quizzes</h1>
        </div>
      </nav>

      <div className="username container mt-5 mb-5">
        <h1>All Quizes</h1>
      </div>

      <div className="myquiz container w-100">
        <div className="row">
        {
          allquiz? allquiz.length > 0 && allquiz.map((obj:any,index:any)=>{
            return(
              <div className="col-md-6 col-lg-4 mb-4  col-sm-12" style={{boxShadow:"2px 2px 2px green;"}} key={index}>
                  <Smcard quizname={obj.quizname} click={() => handleStartQuizClick(index)} />
              </div>
            )
          })
          : <p>Loading quiz</p>
        }
        </div>
      </div>
     
     </div>
  )
}

