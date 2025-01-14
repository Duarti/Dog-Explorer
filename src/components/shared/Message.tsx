import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

interface MessageProps {
    content: string;
    type: 'success' | 'error' | 'info' | 'warning';
    duration?: number; // Duration in seconds
}

const messageContainerId = 'custom-message-container';

const createMessageContainer = () => {
    let container = document.getElementById(messageContainerId);
    if (!container) {
        container = document.createElement('div');
        container.id = messageContainerId;
        container.style.position = 'fixed';
        container.style.top = '20px';
        container.style.right = '50%';
        container.style.transform = 'translateX(50%)';
        container.style.zIndex = '1000';
        document.body.appendChild(container);
    }
    return container;
};

const Message: React.FC<MessageProps> = ({ content, type, duration = 2 }) => {
    const [visible, setVisible] = useState(true);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        const fadeOutTimer = setTimeout(
            () => setIsFading(true),
            duration * 1000 - 300
        );
        const cleanupTimer = setTimeout(
            () => setVisible(false),
            duration * 1000
        );

        return () => {
            clearTimeout(fadeOutTimer);
            clearTimeout(cleanupTimer);
        };
    }, [duration]);

    if (!visible) return null;

    const baseClasses =
        'mb-2 px-4 py-2 rounded-md shadow-lg text-white text-center transition-opacity duration-300 ease-in-out';
    const typeClasses = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
        warning: 'bg-yellow-500',
    }[type];

    return (
        <div
            className={`${baseClasses} ${typeClasses} ${
                isFading
                    ? 'opacity-0 translate-y-[-10px]'
                    : 'opacity-100 translate-y-0'
            }`}
        >
            {content}
        </div>
    );
};

/**
 * Utility for displaying messages of various types.
 * Provides methods to show success, error, info, and warning messages.
 * @example
 * message.success('Operation successful', 3);
 */
const message = {
    success: (content: string, duration?: number) =>
        showMessage(content, 'success', duration),
    error: (content: string, duration?: number) =>
        showMessage(content, 'error', duration),
    info: (content: string, duration?: number) =>
        showMessage(content, 'info', duration),
    warning: (content: string, duration?: number) =>
        showMessage(content, 'warning', duration),
};

const showMessage = (
    content: string,
    type: 'success' | 'error' | 'info' | 'warning',
    duration?: number
) => {
    const container = createMessageContainer();
    const div = document.createElement('div');
    container.appendChild(div);

    const root = ReactDOM.createRoot(div);

    const cleanup = () => {
        root.unmount();
        container.removeChild(div);
    };

    root.render(<Message content={content} type={type} duration={duration} />);

    setTimeout(cleanup, (duration || 3) * 1000 + 300);
};

export default message;
