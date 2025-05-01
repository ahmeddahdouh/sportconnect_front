import Box from "@mui/material/Box";
import {Alert, Button, TextField, Typography} from "@mui/material";
import React from "react";
import { Link } from 'react-router-dom';


const startPage = ()=>{
    return (
        <div className="w-full grid grid-cols-2 -mt-16 h-screen">
            <div className=" flex  justify-center items-center ">
                <img className="w-6/12" src="/freepik__background__5447.png" alt=""/>
            </div>
            <Box className="flex flex-col gap-5 w-3/4 m-auto justify-center items-center ">
                <Typography
                    sx={{fontSize: '30px', fontWeight: '900'}}

                >
                    SportConnect
                </Typography>

                <p
                    className=" border-t-2 border-b-2 py-3 w-3/4  text-sm font-semibold text-gray-800 "
                >
                    Faite votre plaisir sans réflichir
                </p>

                {/* Afficher une alerte si un message est défini */}
                {alert.message && (
                    <Alert severity={alert.severity} sx={{marginBottom: 2}}>
                        {alert.message}
                    </Alert>
                )}
                <div className="flex flex-col gap-5 w-4/5" >
                    <Button
                        variant="contained"
                        color="primary"
                        className="text-white "
                        fullWidth
                        component={Link}
                        to="/register"

                    >
                        <p className="text-white font-bold " >Get Started</p>
                    </Button>
                    <Button
                    variant="contained"
                    color="primary"
                    className="text-white"
                    fullWidth
                    component={Link}
                    to="/login"
                >
                    <p className="text-white font-bold " >Acces</p>
                </Button>
                </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            marginTop: '10px'
                        }}
                    >
                    </div>
            </Box>
        </div>

    )
}

export default startPage;