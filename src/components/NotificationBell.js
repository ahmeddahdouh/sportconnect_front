import React, { useState, useEffect, useRef } from 'react';
import { FaBell } from 'react-icons/fa';
import NotificationService from '../services/NotificationService';
import './NotificationBell.css';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const NotificationBell = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const popupRef = useRef(null);
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();

    useEffect(() => {
        fetchNotifications();
        // Set up polling for new notifications every 30 seconds
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchNotifications = async () => {
        try {
            const data = await NotificationService.getNotifications();
            setNotifications(data);
            setUnreadCount(data.filter(n => !n.is_read).length);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const handleNotificationClick = async (notification) => {
        if (!notification.is_read) {
            try {
                await NotificationService.markAsRead(notification.id);
                setNotifications(notifications.map(n => 
                    n.id === notification.id ? { ...n, is_read: true } : n
                ));
                setUnreadCount(prev => Math.max(0, prev - 1));
            } catch (error) {
                console.error('Error marking notification as read:', error);
            }
        }

        if (notification.type === 'event_invitation') {
            setSelectedNotification(notification);
            setIsDialogOpen(true);
        }
    };

    const handleAcceptInvitation = async () => {
        try {
            // TODO: Add API call to accept invitation
            await NotificationService.acceptInvitation(selectedNotification.content.invitation_id);
            setIsDialogOpen(false);
            // Optionally refresh notifications
            fetchNotifications();
            // Navigate to event details
            navigate(`/details/${selectedNotification.content.event_id}`);
        } catch (error) {
            console.error('Error accepting invitation:', error);
        }
    };

    const handleRejectInvitation = async () => {
        try {
            // TODO: Add API call to reject invitation
            await NotificationService.rejectInvitation(selectedNotification.content.invitation_id);
            setIsDialogOpen(false);
            // Optionally refresh notifications
            fetchNotifications();
        } catch (error) {
            console.error('Error rejecting invitation:', error);
        }
    };

    const getProfileImageUrl = (profileImage) => {
        return `${BASE_URL}/auth/uploads/${profileImage}`;
    };

    const renderNotificationContent = (notification) => {
        if (notification.type === 'event_invitation') {
            const { event_name } = notification.content;
            const { name: sender_name, profile_image: sender_image } = notification.sender;
            return (
                <div className="notification-content">
                    <div className="flex items-center space-x-3">
                        <Avatar 
                            src={sender_image ? getProfileImageUrl(sender_image) : null}
                            alt={sender_name}
                            sx={{ width: 40, height: 40 }}
                        >
                            {!sender_image && sender_name?.charAt(0)}
                        </Avatar>
                        <div>
                            <p className="font-medium">{sender_name} vous a invité à</p>
                            <p className="text-primary">{event_name}</p>
                        </div>
                    </div>
                    <small>{new Date(notification.created_at).toLocaleString()}</small>
                </div>
            );
        }
        
        return (
            <div className="notification-content">
                <p>{notification.message}</p>
                <small>{new Date(notification.created_at).toLocaleString()}</small>
            </div>
        );
    };

    return (
        <div className="notification-bell-container">
            <div className="notification-bell" onClick={() => setIsOpen(!isOpen)}>
                <FaBell />
                {unreadCount > 0 && (
                    <span className="notification-badge">{unreadCount}</span>
                )}
            </div>
            
            {isOpen && (
                <div className="notification-popup" ref={popupRef}>
                    <div className="notification-header">
                        <h3>Notifications</h3>
                    </div>
                    <div className="notification-list">
                        {notifications.length === 0 ? (
                            <div className="no-notifications">No notifications</div>
                        ) : (
                            notifications.map(notification => (
                                <div
                                    key={notification.id}
                                    className={`notification-item ${!notification.is_read ? 'unread' : ''}`}
                                    onClick={() => handleNotificationClick(notification)}
                                >
                                    {renderNotificationContent(notification)}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            <Dialog 
                open={isDialogOpen} 
                onClose={() => setIsDialogOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                {selectedNotification && (
                    <>
                        <DialogTitle>
                            Invitation à l'événement
                        </DialogTitle>
                        <DialogContent>
                            <div className="py-4">
                                <div className="flex items-center space-x-3 mb-4">
                                    <Avatar 
                                        src={selectedNotification.sender.profile_image ? 
                                            getProfileImageUrl(selectedNotification.sender.profile_image) : null}
                                        alt={selectedNotification.sender.name}
                                        sx={{ width: 50, height: 50 }}
                                    >
                                        {!selectedNotification.sender.profile_image && 
                                            selectedNotification.sender.name?.charAt(0)}
                                    </Avatar>
                                    <div>
                                        <p className="font-medium text-lg">
                                            {selectedNotification.sender.name}
                                        </p>
                                        <p className="text-gray-600">
                                            vous a invité à rejoindre
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-xl font-semibold text-primary mb-2">
                                        {selectedNotification.content.event_name}
                                    </h3>
                                    <p className="text-gray-600">
                                        Voulez-vous accepter cette invitation ?
                                    </p>
                                </div>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button 
                                onClick={handleRejectInvitation}
                                color="error"
                            >
                                Refuser
                            </Button>
                            <Button 
                                onClick={handleAcceptInvitation}
                                color="primary"
                                variant="contained"
                            >
                                Accepter
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </div>
    );
};

export default NotificationBell; 