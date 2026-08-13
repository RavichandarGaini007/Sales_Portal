import React from 'react';

const ChatMessage = ({ message, sender }) => {
    const isUser = sender === 'user';

    return (
        <div className={`chat-bubble ${isUser ? 'user' : 'bot'}`} role="log">
            {message}
        </div>
    );
};

export default ChatMessage;
