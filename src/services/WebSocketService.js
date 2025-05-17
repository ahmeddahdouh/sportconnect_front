import { io } from 'socket.io-client';

let socket = null;

const WebSocketService = {
    connect: (eventId, token, onMessage) => {
        socket = io("http://localhost:5000", {
            transports: ["websocket"],
            timeout: 10000,
            reconnectionAttempts: 5,
        });

        socket.on("connect", () => {
            console.log("✅ WebSocket connecté !");
            socket.emit("join", { eventId, token });
        });

        socket.on("connect_error", (error) => {
            console.error("❌ Erreur de connexion WebSocket :", error);
        });

        socket.on("message", (msg) => {
            console.log("📥 Message reçu :", msg);
            onMessage(msg);
        });

        socket.on("disconnect", (reason) => {
            console.warn("🔌 Déconnecté du WebSocket :", reason);
        });
    },

    disconnect: () => {
        if (socket) {
            socket.disconnect();
            socket = null;
        }
    },

    sendMessage: (eventId, token, message) => {
        if (!socket || !socket.connected) {
            console.warn("❌ WebSocket non connecté.");
            return;
        }

        console.log("📤 Envoi du message :", message);
        socket.emit("send_message", { eventId, token, message });
    },

    getMessagesByEventId: async () => {
        return []; // temporairement désactivé
    }
};

export default WebSocketService;
