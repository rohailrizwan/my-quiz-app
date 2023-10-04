import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { fbgetquiz } from '../config/firebasemethod';

export default function Quiz() {
    document.body.style.backgroundColor = "white";
    const { quizindex } = useParams();
    const [quiz, setquiz] = useState<any>([])
    const [startquiz, setstartquiz] = useState(false)
    // const [lockOptions, setLockOptions] = useState<boolean[][]>([]);
    const [key, setkey] = useState<string>('')

    useEffect(() => {
        fbgetquiz(quizindex).then((res) => {
            setquiz(res)
        }).catch((err) => {
            console.log(err)
        })

    }, []);

    const verifykey = () => {
        if (key === quiz.quizkey) {
            // console.log("successfully")
            setstartquiz(true)
        }
        else {
            alert("wrong key")
        }
    }

    let marks = 0
    const checkans = (questionIndex: number, selectedOptionIndex: number, correctOptionIndex: number) => {
        if (selectedOptionIndex === correctOptionIndex) {
            marks++;
            // console.log(marks);
        } else {
            // console.log(marks);
        }


    }



    const submitquiz = () => {
        alert(marks)
    }

    let i = 0
    return (
        <div>
            <h2> <NavLink className='text-success my-3 mx-4' to="/" style={{textDecoration:"none"}}>My Quiz </NavLink></h2>
            <div className="container">
                <div className="d-flex flex-column " style={{ marginTop: "70px", marginBottom: "50px" }}>
                    <h1 className='mb-5 mt-5'>Enter Secret key</h1>
                    <input type="text" placeholder='Secret key' className='w-75 secretkeyinput' onChange={(e) => (setkey(e.target.value))} />
                    <button className='btn btn-danger rounded-2' style={{ width: "100px" }} onClick={verifykey}>Submit</button>
                </div>
                <div className="render-ques mb-5">
                    {

                        startquiz ? quiz.ques.map((obj: any, quesindex: any) => {
                            i++
                            return (
                                <>
                                    <h4 className='mb-4' style={{ color: "blue" }}>{i} {obj.questiontext}</h4>
                                    {
                                        obj.myoptions.map((opt: any, index: any) => {
                                            return (
                                                <div>
                                                    <button className='mb-4 px-3 py-2 optionbtn' key={index} onClick={() => checkans(quesindex, opt, obj.c_opt)}>{opt}</button>
                                                </div>
                                            )
                                        })
                                    }

                                </>
                            )

                        })
                            :
                            <p>Loading ques</p>

                    }
                </div>
                {
                    startquiz ? <div className="submitbutton mb-5">
                        <button className='btn btn-primary' onClick={submitquiz}>Submit  quiz</button>
                    </div>
                        :
                        ('')
                }
            </div>
        </div>
    );
}


