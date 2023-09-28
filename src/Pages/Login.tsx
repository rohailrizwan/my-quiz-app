import React from 'react'
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom'
import { FbLogin } from '../config/firebasemethod';



export default function Login() {


    let logindiv: any = {
        textAlign: "center",
        backgroundColor: "white",
        border: "2px solid none",
        borderRadius: "10px",
        boxShadow: "4px 7px 10px #cab3b3b5",
        padding: "50px"
    }

    document.body.style.backgroundColor = "rgb(68 12 92)"

    const [model, setModel] = useState<any>({});

    const fillModel = (key: string, val: any) => {
        model[key] = val;
        setModel({ ...model });
    };
    let navigate = useNavigate()
    let LoginUser = () => {
        FbLogin(model)
            .then((res) => {
                let userdata: any = res
                if(userdata.role === "user"){
                    alert("successfully")
                    navigate(`/user-dashboard/${userdata.username}`)
                }
                else if (userdata.role === "admin"){
                    alert("successfully")
                    navigate(`/admin-dashboard/${userdata.username}`)
                }  
            })
            .catch((err) => {
                alert(err);
            });
    };

    return (
        <div>
            <Box style={{ width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", }}>

                <Box style={logindiv}>
                    <Box className='py-3'>
                        <Typography className='fs-3'>
                            Login
                        </Typography>
                    </Box>
                    <Box className="p-3">
                        <TextField
                            variant="outlined"
                            type="email"
                            label="Email"
                            style={{ color: "gray" }}
                            onChange={(e: any) => fillModel("email", e.target.value)}

                        />
                    </Box>
                    <Box className="p-3">
                        <TextField
                            variant="outlined"
                            type="password"
                            label="Password"
                            style={{ color: "gray" }}
                            onChange={(e: any) => fillModel("password", e.target.value)}

                        />
                    </Box>
                    <Box className="p-3">
                        <Button variant="contained" onClick={LoginUser}>Login</Button>
                    </Box>
                    <Box className='py-3'>
                        <Typography className='fs-6'>
                            <NavLink to='/signup' style={{ color: "blueviolet", textDecoration: "none" }}>Create an Account</NavLink>
                        </Typography>
                    </Box>
                </Box>

            </Box>
        </div>
    )
}

