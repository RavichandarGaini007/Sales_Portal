import React, { useState } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import './chatbot.css';

const initialMessages = [
    { id: 1, sender: 'bot', text: 'Hello! I can help with sales summaries, reports, and portal navigation.' },
    { id: 2, sender: 'bot', text: 'Try asking: “Show me today’s sales trend” or “Open reports”.' },
];

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState(initialMessages);

    const handleSend = (text, options = {}) => {
        if (options.isBotReply) {
            setMessages((prev) => [...prev, { id: Date.now(), sender: 'bot', text }]);
            return;
        }

        setMessages((prev) => [...prev, { id: Date.now(), sender: 'user', text }]);
    };

    return (
        <div className="chatbot-shell">
            {isOpen ? (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <div>
                            <div className="chatbot-title">Sales Assistant</div>
                            <div className="chatbot-subtitle">Ask anything about the portal</div>
                        </div>
                        <button className="chatbot-close" onClick={() => setIsOpen(false)} aria-label="Close assistant">×</button>
                    </div>

                    <div className="chatbot-body">
                        {messages.map((message) => (
                            <ChatMessage key={message.id} message={message.text} sender={message.sender} />
                        ))}
                    </div>

                    <div className="chatbot-footer">
                        <ChatInput onSend={handleSend} />
                    </div>
                </div>
            ) : null}

            <button className="chatbot-toggle" onClick={() => setIsOpen((prev) => !prev)}>
                <span>{isOpen ? 'Close' : '💬 Chat with us'}</span>
            </button>
        </div>
    );
};

export default ChatBot;
