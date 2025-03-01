import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function EventCard({ event }) {
    if (!event) {
        return null;
    }

    return (
        <Card
            sx={{
                minWidth: 275,
                minHeight: 340, // Hauteur minimale ajustée pour éviter la coupure
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                background: 'linear-gradient(145deg, #ffffff 0%, #f9f9f9 100%)',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                },
                animation: 'fadeInUp 0.5s ease-out',
            }}
        >
            <CardContent
                sx={{
                    flex: 1,
                    padding: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between', // Optimise l'espace vertical
                }}
            >
                <Box>
                    <Typography
                        gutterBottom
                        sx={{
                            color: 'text.secondary',
                            fontSize: 14,
                            fontWeight: 'medium',
                            letterSpacing: '0.5px',
                            animation: 'fadeIn 0.6s ease-in',
                        }}
                    >
                        {event.category}
                    </Typography>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{
                            fontWeight: 'bold',
                            color: 'primary.main',
                            mb: 1,
                            animation: 'slideInLeft 0.6s ease-out',
                        }}
                    >
                        {event.name}
                    </Typography>
                    <Typography
                        sx={{
                            color: 'text.secondary',
                            mb: 1.5,
                            fontStyle: 'italic',
                            animation: 'fadeIn 0.7s ease-in',
                        }}
                    >
                        {event.date}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'text.primary',
                            lineHeight: 1.6,
                            animation: 'fadeIn 0.8s ease-in',
                            overflow: 'hidden', // Évite le débordement
                            textOverflow: 'ellipsis', // Ajoute "..." si le texte est trop long
                            display: '-webkit-box',
                            WebkitLineClamp: 3, // Limite à 3 lignes
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {event.description}
                        <br />
                        <span style={{ color: 'text.secondary' }}>
                            {"\"Détails supplémentaires ici\""}
                        </span>
                    </Typography>
                </Box>
            </CardContent>
            <CardActions
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 2,
                    padding: 2,
                    borderTop: '1px solid rgba(0,0,0,0.1)', // Séparation visuelle
                    backgroundColor: 'rgba(245, 245, 245, 0.8)', // Fond léger pour les boutons
                }}
            >
                <Button
                    size="small"
                    sx={{
                        color: 'primary.main',
                        fontWeight: 'medium',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'primary.light',
                            color: 'white',
                            transform: 'scale(1.05)',
                        },
                    }}
                >
                    Voir les détails
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    sx={{
                        py: 1,
                        px: 3,
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                        },
                    }}
                >
                    Participer
                </Button>
            </CardActions>

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
                @keyframes slideInLeft {
                    from { transform: translateX(-20px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `}</style>
        </Card>
    );
}