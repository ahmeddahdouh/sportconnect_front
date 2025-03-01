import ButtonAppBar from "../components/navBarComponent";
import { Stack, Typography } from "@mui/material";
import CustomizedInputBase from "../components/SearchComponent";
import TemporaryDrawer from "../components/SideBare";
import Grid from "@mui/material/Grid";
import BasicCard from "../components/card";
import { useEffect, useState } from "react";
import apiService from "../services/AuthService";

export default function HomePage({ events }) {
    const [decoded, setDecoded] = useState(null);

    useEffect(() => {
        console.log(events);
        setDecoded(apiService.get_current_user());
    }, []);

    return (
        <div
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 50%, #80deea 100%)',
                animation: 'fadeIn 1s ease-in-out',
            }}
        >
            {/* Navbar */}
            {decoded && (
                <ButtonAppBar
                    username={decoded?.sub}
                    sx={{
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    }}
                />
            )}

            {/* Header Section */}
            <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
                paddingTop="40px"
                paddingBottom="20px"
                sx={{
                    animation: 'slideInDown 0.8s ease-out',
                }}
            >
                <CustomizedInputBase
                    sx={{
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.02)',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                        },
                    }}
                />
                <TemporaryDrawer
                    sx={{
                        '& .MuiDrawer-paper': {
                            borderRadius: '0 10px 10px 0',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                        },
                    }}
                />
            </Stack>

            {/* Welcome Message */}
            <Typography
                variant="h4"
                align="center"
                sx={{
                    fontWeight: 'bold',
                    color: '#0277bd',
                    textShadow: '1px 1px 3px rgba(0,0,0,0.1)',
                    paddingY: '20px',
                    animation: 'fadeInUp 1s ease-out',
                }}
            >
                Bienvenue sur SportConnect
            </Typography>

            {/* Events Grid */}
            <Grid
                container
                spacing={4}
                justifyContent="center"
                paddingX={{ xs: '20px', sm: '50px', md: '100px' }}
                paddingY="40px"
                sx={{
                    animation: 'fadeIn 1.2s ease-in-out',
                }}
            >
                {events.map((event, index) => (
                    <Grid
                        item
                        xs={12}
                        sm={10}
                        md={6}
                        lg={4}
                        key={index}
                        sx={{
                            animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                        }}
                    >
                        <BasicCard
                            event={event}
                            sx={{
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                },
                            }}
                        />
                    </Grid>
                ))}
            </Grid>

            {/* CSS Animations */}
            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeInUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes slideInDown {
                    from { transform: translateY(-20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}