import React, { useState } from 'react';
import { useRequest } from '../common/RequestContext';
import { apiUrls, fetchApi } from '../lib/fetchApi';

const ChatInput = ({ onSend }) => {
    const [message, setMessage] = useState('');
    const { request } = useRequest();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const trimmedMessage = message.trim();

        if (!trimmedMessage) {
            return;
        }

        if (onSend) {
            onSend(trimmedMessage);
        }

        try {
            const payload = {
                userQuestion: trimmedMessage,
                tbl_name: request?.tbl_name || '',
                div: request?.div || '',
                plant: request?.plant || '',
                hq: request?.hq || '',
            };

            const response = await fetchApi(apiUrls.GetChatBotReq, payload);

            let botReply = response?.data?.[0];

            if (typeof botReply === "object" && botReply !== null) {
                botReply = Object.entries(botReply)
                    .map(([key, value]) => `${key}: ${Number(value).toFixed(2)}`)
                    .join(", ");
            }

            botReply = botReply || 'Sorry, I could not generate a reply right now.';

            if (onSend) {
                onSend(botReply, { isBotReply: true });
            }
        } catch (error) {
            console.error('Chatbot request failed', error);
            if (onSend) {
                onSend('Sorry, I could not reach the chatbot service right now.', { isBotReply: true });
            }
        } finally {
            setMessage('');
        }
    };

    return (
        <form className="chatbot-form" onSubmit={handleSubmit}>
            <input
                className="chatbot-input"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Ask about sales or reports"
                aria-label="Chat message"
            />
            <button type="submit" className="chatbot-send">
                Send
            </button>
        </form>
    );
};

export default ChatInput;
