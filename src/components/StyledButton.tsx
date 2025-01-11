import React from 'react';
import { ButtonType } from '../types/types';

interface StyledButtonProps {
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent) => void;
    disabled?: boolean;
    className?: string;
    type?: ButtonType;
}

const StyledButton: React.FC<StyledButtonProps> = ({
    children,
    onClick,
    disabled = false,
    className = '',
    type = 'primary',
}) => {
    const typeStyle =
        type === 'primary'
            ? 'focus:ring-primary bg-primary-dark text-white hover:bg-primary-mid'
            : 'focus:ring-gray-400 bg-gray-200 text-gray-700 hover:bg-gray-300';

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-1 text-sm font-medium rounded-md transition shadow focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${typeStyle} ${className}`}
        >
            {children}
        </button>
    );
};

export default StyledButton;
