import React, { useState, useRef, useEffect } from 'react';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Bienvenue sur Sport connect !' }
  ]);
  const [input, setInput] = useState('');
  const widgetRef = useRef(null);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  // Gérer le drag
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragging.current && widgetRef.current) {
        widgetRef.current.style.left = `${e.clientX - offset.current.x}px`;
        widgetRef.current.style.top = `${e.clientY - offset.current.y}px`;
        widgetRef.current.style.bottom = 'auto';
        widgetRef.current.style.right = 'auto';
        widgetRef.current.style.position = 'fixed';
      }
    };
    const handleMouseUp = () => {
      dragging.current = false;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const startDrag = (e) => {
    if (widgetRef.current) {
      dragging.current = true;
      const rect = widgetRef.current.getBoundingClientRect();
      offset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  // Gérer l’envoi de message
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input.trim() };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');

    // Appel backend (adapter l’URL et la structure selon ton API)
    try {
      const res = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMsg.text }),
      });
      const data = await res.json();
      const botMsg = { from: 'bot', text: data.category || 'Je ne sais pas.' };
      setMessages((msgs) => [...msgs, botMsg]);
    } catch {
      setMessages((msgs) => [...msgs, { from: 'bot', text: 'Erreur réseau.' }]);
    }
  };

  // Envoi sur Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          padding: '10px 15px',
          borderRadius: '50%',
          border: 'none',
          backgroundColor: '#007bff',
          color: 'white',
          cursor: 'pointer',
          zIndex: 1000,
        }}
        onClick={() => setIsOpen(true)}
      >
        💬
      </button>
    );
  }

  return (
    <div
      ref={widgetRef}
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        width: 320,
        height: 420,
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: 8,
        boxShadow: '0 0 10px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
      }}
    >
      <div
        onMouseDown={startDrag}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: 10,
          cursor: 'move',
          userSelect: 'none',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>Chat Support</span>
        <button
          onClick={() => setIsOpen(false)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: 18,
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>

      <div
        style={{
          flex: 1,
          padding: 10,
          overflowY: 'auto',
          fontFamily: 'Arial, sans-serif',
          fontSize: 14,
        }}
      >
        {messages.map((m, i) => (
          <p
            key={i}
            style={{
              textAlign: m.from === 'user' ? 'right' : 'left',
              margin: '5px 0',
              padding: '5px 10px',
              backgroundColor: m.from === 'user' ? '#DCF8C6' : '#F1F0F0',
              borderRadius: 10,
              maxWidth: '80%',
              marginLeft: m.from === 'bot' ? 0 : 'auto',
              marginRight: m.from === 'user' ? 0 : 'auto',
            }}
          >
            {m.text}
          </p>
        ))}
      </div>

      <input
        type="text"
        placeholder="Écris un message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          border: '1px solid #ccc',
          borderRadius: 4,
          margin: 10,
          padding: 8,
          fontSize: 14,
          width: 'calc(100% - 20px)',
        }}
      />
    </div>
  );
};

export default ChatWidget;
