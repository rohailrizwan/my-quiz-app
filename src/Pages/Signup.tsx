import React from 'react'
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import { FbSignup } from '../config/firebasemethod';
// import { fbSignUp } from '../config/Firebasemethod';
// import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [id, setid] = useState<any>({})
    const [SelectRole, SetSelectRole] = useState<string>("user")

    document.body.style.backgroundColor = "rgb(68 12 92)"

    let logindiv: any = {
        textAlign: "center",
        backgroundColor: "white",
        border: "2px solid none",
        borderRadius: "10px",
        boxShadow: "4px 7px 10px #cab3b3b5",
        padding: "50px"
    }

    let fillmodel = (key: string, value: any) => {
        id[key] = value;
        setid({ ...id });
    }

    let signup = () => {
        const user = {
            username: id.username,
            email: id.email,
            password: id.password,
            fullName: id.fullName,
            role: SelectRole, // Set the role based on the selected radio button
        };
        // console.log(user)
        FbSignup(user).then((res)=>{
                console.log(res)
                setid({})
        }).catch((err)=>{
            alert(err)
        })
    }

    return (
        <div>
            <Box style={{ width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", }}>

                <Box style={logindiv}>
                    <Box className='py-3'>
                        <Typography className='fs-3' style={{ color: "rgb(68 12 92)" }}>
                            Sign up
                        </Typography>
                    </Box>
                    <Box className="p-3 username">
                        <TextField
                            variant="outlined"
                            type="text"
                            label="user Name"
                            style={{ color: "gray" }}
                            onChange={(e: any) => fillmodel("username", e.target.value)}
                            value={id.username || ''}
                        />
                    </Box>
                    <Box className="p-3 email">
                        <TextField
                            variant="outlined"
                            type="email"
                            label="Email"
                            style={{ color: "gray" }}
                            onChange={(e: any) => fillmodel("email", e.target.value)}
                            value={id.email || ''}
                        />
                    </Box>
                    <Box className="p-3 password">
                        <TextField
                            variant="outlined"
                            type="password"
                            label="Password"
                            style={{ color: "gray" }}
                            onChange={(e: any) => fillmodel("password", e.target.value)}
                            value={id.password || ''}
                        />
                    </Box>
                    <Box className="p-3 full name">
                        <TextField
                            variant="outlined"
                            type="full name"
                            label="full name"
                            style={{ color: "gray" }}
                            onChange={(e: any) => fillmodel("fullName", e.target.value)}
                            value={id.fullName || ''}
                        />
                    </Box>
                    
                    <Box className="p-3">
                        <button className='text-white btn-success btn py-2 px-3 my-2' onClick={signup}>Signup</button>
                        <Typography className='fs-6' style={{ color: "rgb(68 12 92)" }}>
                            <NavLink to="/Login" > back to login</NavLink>
                        </Typography>
                    </Box>
                </Box>

            </Box>
        </div>
    )
}