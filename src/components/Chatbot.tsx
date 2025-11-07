'use client'

import React, { useState } from 'react';
import axiosInstance from '@/context/axiosInstance';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{from: 'user' | 'bot', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false); 

  const toggleChat = () => setIsOpen(!isOpen);

const sendMessage = async () => {
  if (!input.trim()) return;

  // Ajouter le message utilisateur à la conversation
  setMessages(prev => [...prev, { from: 'user', text: input }]);
  setLoading(true);
  setTyping(true);
  const userMessage = input;
  setInput('');

  try {
    // Appel sécurisé avec cookies (plus besoin du token)
    const res = await axiosInstance.post('/chatbot', { message: userMessage });

    // Délai avant affichage (effet "typing")
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'bot', text: res.data.reply }]);
      setTyping(false);
      setLoading(false);
    }, 1500);

  } catch (error) {
    console.error('Erreur chatbot:', error);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { from: 'bot', text: "Désolé, je n'ai pas compris votre message." },
      ]);
      setTyping(false);
      setLoading(false);
    }, 1500);
  }
};

  return (
    <>
      <button
        onClick={toggleChat}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: '50%',
          backgroundColor: '#f33',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          fontSize: 24,
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          zIndex: 1000,
        }}
      >
        💬
      </button>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: 90,
            right: 20,
            width: 300,
            height: 400,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: 8,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
          }}
        >
          <div style={{ flex: 1, padding: 10, overflowY: 'auto' }}>
            {messages.length === 0 && <p>Bonjour, comment puis-je vous aider ?</p>}
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  textAlign: msg.from === 'user' ? 'right' : 'left',
                  margin: '8px 0',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    padding: '8px 12px',
                    borderRadius: 16,
                    backgroundColor: msg.from === 'user' ? '#f33' : '#eee',
                    color: msg.from === 'user' ? 'white' : 'black',
                    maxWidth: '80%',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}

            {/* Animation "typing" */}
            {typing && (
              <div style={{ textAlign: 'left', margin: '8px 0' }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '8px 12px',
                    borderRadius: 16,
                    backgroundColor: '#eee',
                    color: 'black',
                    maxWidth: '80%',
                    fontStyle: 'italic',
                    fontSize: 14,
                  }}
                >
                  en train d'écrire...
                </span>
              </div>
            )}

            {loading && !typing && <p>... en cours de réponse</p>}
          </div>

          <div style={{ display: 'flex', borderTop: '1px solid #ccc', height: 50 }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
              placeholder="Écrire un message..."
              disabled={loading}
              style={{
                flex: 1,
                border: 'none',
                padding: '0 10px',
                borderRadius: '0 0 0 8px',
                fontSize: 14,
                outline: 'none',
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              style={{
                border: 'none',
                backgroundColor: '#f33',
                color: 'white',
                padding: '0 16px',
                cursor: 'pointer',
                borderRadius: '0 0 8px 0',
                fontSize: 14,
              }}
            >
              Envoyer
            </button>
          </div>

        </div>
      )}
    </>
  );
}
