import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/fr';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useNavigate } from 'react-router-dom';

moment.locale('fr');
const localizer = momentLocalizer(moment);

const SPORTS_MAP = {
    "1": "Football",
    "2": "Basketball",
    "3": "Tennis"
};

const CalendarView = ({ eventService, BackendApilink, headers }) => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState(new Date());
    const navigate = useNavigate();

    useEffect(() => {
        get_events();
    }, []);

    async function get_events() {
        setIsLoading(true);
        try {
            const response = await eventService.getEvents(BackendApilink, headers);
            const formatted = response.map(event => {
                const isAllDay = !event.start_time || !event.end_time || event.start_time === "None" || event.end_time === "None";
                const start = isAllDay ? new Date(event.event_date) : new Date(`${event.event_date}T${event.start_time}`);
                const end = isAllDay ? new Date(event.event_date) : new Date(`${event.event_date}T${event.end_time}`);
                return {
                    id: event.id,
                    title: event.event_name,
                    start,
                    end,
                    allDay: isAllDay,
                    sport: event.id_sport,
                    sportName: SPORTS_MAP[event.id_sport] || `Sport ${event.id_sport}`,
                    isPaid: event.is_paid === "True",
                    isPrivate: event.is_private === "True",
                    ville: event.event_ville,
                    original: event
                };
            }).filter(e => !isNaN(e.start.getTime()) && !isNaN(e.end.getTime()));
            setEvents(formatted);
        } catch (e) {
            console.error('Erreur lors de la récupération des événements:', e);
        } finally {
            setIsLoading(false);
        }
    }

    const eventStyleGetter = (event) => {
        let backgroundColor = '#3174ad';
        if (event.sport === "1") backgroundColor = '#4CAF50';
        else if (event.sport === "2") backgroundColor = '#FF5722';
        else if (event.sport === "3") backgroundColor = '#2196F3';
        if (event.isPaid) backgroundColor = '#009688';
        if (event.isPrivate) backgroundColor = '#E91E63';
        return {
            style: {
                backgroundColor,
                color: 'white',
                borderRadius: '4px',
                opacity: 0.9,
                fontWeight: 'bold'
            }
        };
    };

    const showDetailClick = (myEvent) => {
        navigate(`/details/${myEvent.id}`, { state: myEvent.original });
    };

    const CustomEvent = ({ event }) => (
        <div>
            <div>{event.title}</div>
            <div>{event.ville}</div>
            <button
                onClick={(e) => {
                    e.stopPropagation(); // éviter que le clic change la vue
                    showDetailClick(event);
                }}
                className="mt-1 text-xs text-white underline"
            >
                Voir détails
            </button>
        </div>
    );

    const messages = {
        today: "Aujourd'hui",
        previous: 'Précédent',
        next: 'Suivant',
        month: 'Mois',
        week: 'Semaine',
        day: 'Jour',
        agenda: 'Agenda',
        noEventsInRange: 'Aucun événement dans cette plage.'
    };

    const formats = {
        timeGutterFormat: 'HH:mm',
        eventTimeRangeFormat: ({ start, end }) => `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`
    };

    const renderLegend = () => (
        <div className="flex flex-wrap gap-3 mt-4 mb-2">
            <div className="flex items-center"><div className="w-4 h-4 mr-1 bg-green-600 rounded"></div><span>Football</span></div>
            <div className="flex items-center"><div className="w-4 h-4 mr-1 bg-orange-600 rounded"></div><span>Basketball</span></div>
            <div className="flex items-center"><div className="w-4 h-4 mr-1 bg-blue-500 rounded"></div><span>Tennis</span></div>
            <div className="flex items-center"><div className="w-4 h-4 mr-1 bg-teal-600 rounded"></div><span>Payant</span></div>
            <div className="flex items-center"><div className="w-4 h-4 mr-1 bg-pink-600 rounded"></div><span>Privé</span></div>
        </div>
    );

    return (
        <div className="h-screen p-5">
            <h1 className="mb-3 text-2xl font-bold">Calendrier des Événements</h1>
            {renderLegend()}
            {isLoading ? (
                <p>Chargement...</p>
            ) : (
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView="week"
                    views={['month', 'week', 'day', 'agenda']}
                    messages={messages}
                    formats={formats}
                    eventPropGetter={eventStyleGetter}
                    components={{ event: CustomEvent }}
                    popup
                    date={currentDate}
                    onNavigate={setCurrentDate}
                />
            )}
        </div>
    );
};

export default CalendarView;
